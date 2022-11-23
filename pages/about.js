import Link from "next/link";

const About = () => {
  return (
    <div>
      Welcome to my about page{" "}
      <Link href="/movies" className="underline">
        View movies
      </Link>
    </div>
  );
};

export default About;
