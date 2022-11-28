import Link from "next/link";
import { useState } from "react";
import Snackbar from "../components/Snackbar";

export default function Home() {
  const [snackbar, setSnackbar] = useState(true);

  return (
    <div className="w-full">
      {/* <Snackbar isOpen={snackbar} close={() => setSnackbar(false)} /> */}
      Welcome to our website.{" "}
      <Link href="/movies" className="underline">
        View movies
      </Link>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  fetch("https://icefilms.tv/ajax/premiumzi.php?embed=170335", { headers: { referer: "https://icefilms.tv" } })
    .then((res) => res.text())
    .then(console.log);
  return {
    props: {
      data: null,
    },
  };
};
