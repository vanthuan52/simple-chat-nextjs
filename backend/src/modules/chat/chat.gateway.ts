import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../message/message.service';

interface JoinPayload {
  roomId: string;
}
interface SendPayload {
  roomId: string;
  content: string;
}

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
  namespace: '/ws',
})
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private logger = new Logger(ChatGateway.name);
  private jwt = new JwtService({
    secret: process.env.JWT_SECRET || 'supersecret',
  });

  constructor(private messageService: MessageService) {}

  async handleConnection(client: Socket, ...args: any[]) {
    try {
      const token = (client.handshake.auth?.token as string) || '';
      const payload = await this.jwt.verifyAsync(token);
      (client.data as any).user = {
        userId: payload.sub,
        username: payload.username,
      };
      this.logger.log(
        `Client connected: ${client.id} user=${payload.username}`,
      );
    } catch (e) {
      this.logger.warn(`Unauthorized socket: ${client.id}`);
      client.disconnect(true);
    }
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  async onJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinPayload,
  ) {
    await client.join(data.roomId);
    client.emit('joined', { roomId: data.roomId });
  }

  @SubscribeMessage(`leaveRoom`)
  async onLeave(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinPayload,
  ) {
    await client.leave(data.roomId);
    client.emit('left', { roomId: data.roomId });
  }

  @SubscribeMessage('sendMessage')
  async onSend(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: SendPayload,
  ) {
    const user = (client.data as any).user as {
      userId: string;
      username: string;
    };
    this.logger.log(`${user.username} send: ${data.content}`);

    const msg = await this.messageService.create(
      user.userId,
      data.roomId,
      data.content,
    );
    this.server.to(data.roomId).emit('message', {
      id: msg.id,
      roomId: data.roomId,
      content: data.content,
      createdAt: msg.createdAt,
      user: { id: user.userId, username: user.username },
    });
  }
}
