import ImageAnimation from '@/components/image-animation';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      <h1 className="z-20 text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg text-center mt-10 mb-2 tracking-tight select-none hidden">
        Simple Chat App
      </h1>
      <p className="z-20 text-lg md:text-2xl text-white/80 text-center mb-8 max-w-2xl select-none">
        Connection
      </p>

      <ImageAnimation />
    </main>
  );
}
