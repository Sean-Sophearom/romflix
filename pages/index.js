import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  return (
    <div className="w-full">
      Welcome to our website.{" "}
      <Link href="/movies" className="underline">
        View movies
      </Link>
    </div>
  );
}


