import Link from "next/link";
import React from "react";
import MovieGrid from "../components/MovieGrid";
import { useGlobalContext } from "../lib/context";

const Cart = () => {
  const { cart } = useGlobalContext();

  const total = cart.reduce((prev, cur) => {
    const price = ((cur.id % 1000) / 100) * cur.count;
    return prev + price;
  }, 0);

  if (cart.length === 0)
    return (
      <h1>
        You have not added any movies to your cart.{" "}
        <Link href="/movies" className="underline">
          Browse Movie
        </Link>
      </h1>
    );
  return (
    <div>
      <MovieGrid movies={cart} />
      <p className="border-t pt-2 pb-4 mt-8 border-gray-200 text-end font-semibold text-lg sm:text-xl">
        Your total is: {total.toFixed(2)} ${" "}
      </p>
    </div>
  );
};

export default Cart;
