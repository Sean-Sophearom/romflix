import Link from "next/link";

const Contact = () => {
  return (
    <div>
      Welcome to my contact page.{" "}
      <Link href="/movies" className="underline">
        View movies
      </Link>
    </div>
  );
};

export default Contact;
