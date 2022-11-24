import { useRouter } from "next/router";
import { useState } from "react";
import { SearchIcon } from "../components/icons";

const Search = () => {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    if (!input) return;
    e.preventDefault();
    const route = `/movies?q=${input}`;
    router.replace(route);
  };
  return (
    <form className="relative flex items-center mx-auto max-w-[500px]" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your keywords..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="rounded-full border border-gray-400 w-full outline-none px-4 py-1 sm:px-6 sm:py-2 transition-all focus:ring-2 ring-purple-500"
      />
      <SearchIcon className="absolute right-2 sm:right-4 scale-110 sm:scale-125" type="submit" />
    </form>
  );
};

export default Search;
