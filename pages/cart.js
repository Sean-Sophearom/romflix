import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Cross } from "../components/icons";
import Modal from "../components/Modal";
import MovieGrid from "../components/MovieGrid";
import { useGlobalContext } from "../lib/cartContext";
import { useToken } from "../lib/tokenContext";

const Cart = (props) => {
  const { cart, clearCart } = useGlobalContext();
  const { token } = useToken();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (!router.query.loginSuccess) return;
    setAlert(true);
    const timeout = setTimeout(() => setAlert(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  const total = cart.reduce((prev, cur) => {
    const price = ((cur.id % 1000) / 100) * cur.count;
    return prev + price;
  }, 0);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearCart();
    document.body.classList.remove("overflow-hidden");
  };

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

  const Alert = (
    <div
      className={
        "bg-transparent z-10 text-center py-4 lg:px-4 fixed whitespace-nowrap right-4 top-4 transition-all rounded " +
        (alert ? "translate-x-0 pointer-events-auto" : "translate-x-[150%] pointer-events-none")
      }
    >
      <div
        className="p-2 bg-blue-600 items-center text-blue-100 leading-none lg:rounded-full flex lg:inline-flex rounded"
        role="alert"
      >
        <span className="flex rounded-full bg-blue-500 uppercase px-[10px] py-1 text-xs font-bold mr-3"> ! </span>
        <span className="font-semibold mr-2 text-left flex-auto">You have logged in successfully</span>
        <div className="cursor-pointer" onClick={() => setAlert(false)}>
          <Cross />
        </div>
      </div>
    </div>
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
      <Modal isOpen={isModalOpen} close={handleCloseModal} />
      {Alert}
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
