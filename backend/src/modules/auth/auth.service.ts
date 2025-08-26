import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(username: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { username, password: hashed },
    });
    return this.issueTokens(user.id, user.username);
  }

  async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.password);
    return ok ? user : null;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.issueTokens(user.id, user.username);
  }

  issueTokens(sub: string, username: string) {
    const accessToken = this.jwt.sign({ sub, username });
    const refreshToken = this.jwt.sign(
      { sub, username },
      {
        secret: process.env.REFRESH_SECRET || 'refreshsecret',
        expiresIn: process.env.REFRESH_EXPIRES_IN || '7d',
      },
    );
    return { accessToken, refreshToken, user: { id: sub, username } };
  }

  async refresh(token: string) {
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: process.env.REFRESH_SECRET || 'refreshsecret',
      });
      return this.issueTokens(payload.sub, payload.username);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
