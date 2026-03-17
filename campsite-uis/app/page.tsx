import Link from "next/link";

export default function Home() {
  // Use V0 for the UI code
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/components/tab-group">Tab Group Component &#8594;</Link>
    </main>
  );
}
