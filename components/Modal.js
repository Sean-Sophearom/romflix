import React, { useEffect } from "react";
import { useGlobalContext } from "../lib/cartContext";
import { Cross } from "./icons";

const Modal = ({ isOpen, close }) => {
  const { cart } = useGlobalContext();

  const total = cart.reduce((prev, cur) => {
    const price = (cur.id % 1000) / 100;
    const itemTotal = (price * cur.count).toFixed(2);
    return itemTotal + prev;
  }, 0);

  useEffect(() => {
    isOpen ? document.body.classList.add("overflow-hidden") : document.body.classList.remove("overflow-hidden");
  }, [isOpen]);
  return (
    <div className={`transition-all ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <div className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-60 grid place-items-center">
        <div className={`bg-white rounded-md p-8 transition-all ${isOpen ? "scale-100" : "scale-0"}`}>
          <div className="flex py-2 justify-end border-b border-gray-200">
            <button onClick={close}>
              <Cross color="#000" />
            </button>
          </div>

          <div>
            <h1 className="text-2xl font-medium mt-1">Purchase Successful</h1>
            <p className="mb-1 text-sm text-gray-500">Your order is being processed.</p>
            <div className="flex py-2 gap-1">
              {cart.map((item) => {
                const price = (item.id % 1000) / 100;
                const total = (price * item.count).toFixed(2);
                return (
                  <p key={item.id} className="flex">
                    {item.title} <Cross color="#000" className="mx-1 translate-y-[6px]" /> {item.count} = {price}$
                  </p>
                );
              })}
            </div>
          </div>

          <div className="text-end py-1 mt-4 border-t border-gray-200 font-medium">
            <p>Total: {total}$</p>
          </div>

          <div className="flex py-1 justify-end border-t border-gray-200">
            <button onClick={close} className="btn">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
