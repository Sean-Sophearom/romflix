import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "../components/Modal";
import MovieGrid from "../components/MovieGrid";
import { useGlobalContext } from "../lib/cartContext";
import { useToken } from "../lib/tokenContext";

const Cart = () => {
  const { cart } = useGlobalContext();
  const { token } = useToken();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const total = cart.reduce((prev, cur) => {
    const price = ((cur.id % 1000) / 100) * cur.count;
    return prev + price;
  }, 0);

  const handleCheckout = () => {
    if (!token.username) router.replace("/login");
    else setIsModalOpen(true);
  };

  const pageTitle = token.username ? (
    <h1 className="text-center text-2xl font-semibold">Welcome {token.username}</h1>
  ) : (
    <h1>
      You have not logged in yet.{" "}
      <Link className="btn w-auto ml-2" href="/login">
        LOGIN NOW
      </Link>
    </h1>
  );

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
      <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)} />
      {pageTitle}
      <MovieGrid movies={cart} title="Your cart" />
      <div className="flex justify-between items-center border-t pt-2 pb-4 mt-8 border-gray-200">
        <p className="font-semibold text-lg sm:text-xl">Your total is: {total.toFixed(2)} $ </p>
        <button className="btn w-auto md:px-4 py-2" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
