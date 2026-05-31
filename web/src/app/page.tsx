import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <h1 className="text-4xl font-bold mb-4 text-foreground">
        Welcome to the <span className="text-primary">Next.js</span> Starter Template!
      </h1>
    </div>
  );
}
