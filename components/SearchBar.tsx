import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Call API with searchTerm
    console.log("Searching for:", searchTerm);
  };

  return (
    <form className="flex items-center justify-center">
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-2 pr-8 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="absolute top-0 right-0 px-3 py-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
          onClick={handleSearch}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M22 22L15.5 15.5M15.5 15.5C17.9853 12.6073 17.9853 8.3927 15.5 5.5C13.0147 2.60729 8.98528 2.60729 6.5 5.5C4.01472 8.3927 4.01472 12.6073 6.5 15.5C8.98528 18.3927 13.0147 18.3927 15.5 15.5L22 22Z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
