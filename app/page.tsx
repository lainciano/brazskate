import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-zinc-50 px-6 py-24 text-center dark:bg-black">
      <Image
        src="/logo.png"
        alt="Braz Skate — ASB"
        width={160}
        height={160}
        priority
        className="rounded-full"
      />
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Braz Skate
        </h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          Campeonato de skate da ASB — Associação Skate Brazlândia.
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          Site em construção — data e mais detalhes em breve.
        </p>
      </div>
    </div>
  );
}
