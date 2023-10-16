import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
      <h1 className="text-5xl">Respect</h1>
      <h1 className="text-5xl">Integrity</h1>
      <h1 className="text-5xl">Responsibility</h1>
      <h1 className="text-5xl">Professionalism</h1>
      <h1 className="text-5xl">Honesty</h1>
      </div>
    </div>
  );
}
