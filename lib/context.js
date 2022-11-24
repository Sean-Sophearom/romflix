import { useState, useContext, createContext, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addMovie = (movie) => {
    const alreadyInCart = cart.find((m) => m.id === movie.id);
    if (alreadyInCart) {
      setCart(
        cart.map((m) => {
          if (m.id !== movie.id) return m;
          return { ...m, count: m.count + 1 };
        })
      );
    } else {
      setCart([{ ...movie, count: 1 }, ...cart]);
    }
  };

  const removeMovie = (movie) => {
    setCart(
      cart
        .filter((m) => {
          if (m.count === 1 && m.id === movie.id) return false;
          return true;
        })
        .map((m) => {
          if (m.id !== movie.id) return m;
          return { ...m, count: m.count - 1 };
        })
    );
  };

  const getCount = (id) => {
    const movie = cart.find((m) => m.id === id);
    return movie ? movie.count : 0;
  };

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    if (localCart) setCart(localCart);
  }, [setCart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return <AppContext.Provider value={{ cart, addMovie, removeMovie, getCount }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => useContext(AppContext);
