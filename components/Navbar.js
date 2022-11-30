import Link from "next/link";
import { useGlobalContext } from "../lib/cartContext";

const Navbar = () => {
  const { cart } = useGlobalContext();

  const movieCount = cart.reduce((prev, cur) => cur.count + prev, 0);
  return (
    <nav className="box flex items-center justify-between border-b border-gray-200">
      <Link href="/" className="text-lg font-medium">
        Romflix
      </Link>
      <ul className="flex gap-4 text-sm xs:text-base xs:gap-6 sm:gap-8">
        <li className="hover:underline hover:text-gray-500">
          <Link href="/movies">movies</Link>
        </li>
        <li className="hover:underline hover:text-gray-500">
          <Link href="/search">search</Link>
        </li>
        <li className="hover:underline hover:text-gray-500 relative">
          <Link href="/cart">cart</Link>
          <span className="absolute px-1.5 py-0.5 -right-[18px] -top-2 sm:-right-6 sm:-top-[6px] border-2 rounded-full text-xs font-semibold leading-4 bg-red-500 text-white  scale-[.6] xs:scale-75">
            {movieCount}
          </span>
        </li>

        <li className="hover:underline hover:text-gray-500">
          <Link href="/contact">contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
