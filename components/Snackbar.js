import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Cross = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="none" stroke="#fff" strokeWidth="2" d="M7,7 L17,17 M7,17 L17,7"></path>
  </svg>
);

const Snackbar = ({ isOpen, close }) => {
  const [sec, setSec] = useState(5);
  const router = useRouter();
  if (sec <= 0) {
    close();
    router.replace("/movies");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSec((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const className =
    "bg-transparent text-center py-4 lg:px-4 fixed whitespace-nowrap right-4 top-4 transition-all rounded " +
    (isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-[150%] pointer-events-none");
  return (
    <div className={className}>
      <div
        className="p-2 bg-yellow-600 items-center text-yellow-100 leading-none lg:rounded-full flex lg:inline-flex rounded"
        role="alert"
      >
        <span className="flex rounded-full bg-yellow-500 uppercase px-[10px] py-1 text-xs font-bold mr-3"> ! </span>
        <span className="font-semibold mr-2 text-left flex-auto">You will be redirected in {sec} seconds</span>
        <div className="cursor-pointer" onClick={close}>
          <Cross />
        </div>
      </div>
    </div>
  );
};

export default Snackbar;
