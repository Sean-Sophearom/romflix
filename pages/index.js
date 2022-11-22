import Link from "next/link";

export default function Home() {
  return (
    <div>
      Welcome to our website.{" "}
      <Link href="/movies" className="underline">
        View movies
      </Link>
    </div>
  );
}
