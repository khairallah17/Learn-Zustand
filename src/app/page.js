import Image from "next/image";
import Posts from "@/components/Posts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Posts/>
    </main>
  );
}
