import { SearchIcon } from "@heroicons/react/outline";

export default function SearchBar() {
  return (
    <div className="w-full flex items-center justify-center">
      <form className="max-w-md w-full flex items-center shadow-md p-2 rounded-full bg-white border border-slate-200">
        <input
          type="text"
          placeholder="Buscar lugar..."
          className="grow focus:outline-none px-4 bg-white"
        />
        <button type="button" className="p-2">
          <SearchIcon className="h-6 w-6 text-rose-600" />
        </button>
      </form>
    </div>
  );
}
