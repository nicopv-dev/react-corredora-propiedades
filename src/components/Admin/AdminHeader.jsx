import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/sessionSlice";

export default function AdminHeader() {
  const user = useSelector(selectUser);

  return (
    <header className="h-20 flex items-center justify-between px-6 sm:px-16 lg:px-24 shadow-sm border-b border-b-slate-200">
      {/* logo */}
      <div>
        <Link className="font-medium hover:cursor-pointer" to="/">
          Corredore Propiedades
        </Link>
      </div>
      {/* user */}
      <div className="flex items-center gap-1">
        <div className="w-10 h-10">
          <img
            alt=""
            src="https://cdn.pixabay.com/photo/2022/07/12/15/36/tree-7317683_960_720.jpg"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="hidden sm:flex flex-col">
          <h3>{user?.name}</h3>
          <p className="text-xs font-light">{user?.email}</p>
        </div>
      </div>
    </header>
  );
}
