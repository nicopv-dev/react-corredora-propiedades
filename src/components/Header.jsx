import { UserIcon } from "@heroicons/react/outline";
import { UserIcon as UserIconSolid } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { fetchLogoutUser, selectSession } from "../features/sessionSlice";
import { getAccessToken } from "../utils/localStorage";

export default function Header() {
  const [isAuthRoute, setIsAuthRoute] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const session = useSelector(selectSession);
  const navigate = useNavigate();
  const location = useLocation();

  const onChangeDropdown = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setIsAuthRoute(true);
    } else {
      setIsAuthRoute(false);
    }
  }, [location, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full h-20 z-10 flex items-center ${
        isAuthRoute ? "justify-end" : "justify-between"
      } lg:grid lg:grid-cols-4 py-2 px-6 sm:px-10 md:px-16 lg:px-24 transition duration-300 ${
        !isAuthRoute && "shadow-sm"
      } ${isScrolled ? "bg-white" : "bg-transparent"}`}
    >
      <div className={`${isAuthRoute ? "hidden" : "block"}`}>
        <Link to="/" className={`${isAuthRoute ? "text-white" : "text-black"}`}>
          Corredora
        </Link>
      </div>
      <div className="col-span-2 hidden lg:block">
        {!isAuthRoute && <SearchBar />}
      </div>
      <div
        className={`flex justify-between sm:justify-end gap-3 ${
          isAuthRoute && "col-span-2"
        }`}
      >
        {!getAccessToken() ? (
          <NoAuthBar
            setIsDropdownActive={setIsDropdownActive}
            onChangeDropdown={onChangeDropdown}
            isDropdownActive={isDropdownActive}
          />
        ) : (
          <AuthBar
            setIsDropdownActive={setIsDropdownActive}
            onChangeDropdown={onChangeDropdown}
            isDropdownActive={isDropdownActive}
            session={session}
          />
        )}
      </div>
    </header>
  );
}

function NoAuthBar({
  setIsDropdownActive,
  onChangeDropdown,
  isDropdownActive,
}) {
  const navigate = useNavigate();

  const goTo = (link) => {
    navigate(link);
    setIsDropdownActive(false);
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      y: 0,
      display: "block",
    },
    exit: {
      y: -5,
      opacity: 0,
      transition: {
        duration: 0.1,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <>
      <button
        type="button"
        className="bg-rose-500 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-rose-300"
        onClick={() => navigate("/member")}
      >
        Hazte Miembro
      </button>
      <motion.div
        onClick={onChangeDropdown}
        className="relative flex items-center"
      >
        <button type="button">
          <UserIcon className="h-6 w-6 text-rose-600" />
        </button>
        <motion.div
          className="absolute top-8 right-0 w-60 mt-2 bg-white rounded-md shadow-lg z-20 py-4"
          initial="exit"
          animate={isDropdownActive ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div className="flex flex-col">
            <button
              className="py-2 px-4 hover:cursor-pointer flex justify-start bg-white transtion duration-200 hover:bg-gray-100"
              type="button"
              onClick={() => goTo("/login")}
            >
              Iniciar Sesion
            </button>
            <button
              className="py-2 px-4 hover:cursor-pointer flex justify-start bg-white transtion duration-200 hover:bg-gray-100"
              type="button"
              onClick={() => goTo("/register")}
            >
              Registrarse
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

function AuthBar({
  setIsDropdownActive,
  onChangeDropdown,
  isDropdownActive,
  session,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goTo = (link) => {
    navigate(link);
    setIsDropdownActive(false);
  };

  const logOut = () => {
    dispatch(fetchLogoutUser());
    window.location.href = "/";
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      y: 0,
      display: "block",
    },
    exit: {
      y: -5,
      opacity: 0,
      transition: {
        duration: 0.1,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <>
      {session?.user?.isAdmin && (
        <button
          type="button"
          className="bg-rose-500 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-rose-300"
          onClick={() => navigate("/admin")}
        >
          Dashboard
        </button>
      )}
      <motion.div
        onClick={onChangeDropdown}
        className="relative flex items-center"
      >
        <button type="button">
          <UserIconSolid className="h-6 w-6 text-rose-600" />
        </button>
        <motion.div
          className="absolute top-8 right-0 w-60 mt-2 bg-white rounded-md shadow-lg z-20 py-4"
          initial="exit"
          animate={isDropdownActive ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div className="flex flex-col">
            <button
              className="py-2 px-4 hover:cursor-pointer flex justify-start bg-white transtion duration-200 hover:bg-gray-100"
              type="button"
              onClick={() => goTo("/login")}
            >
              Profile
            </button>
            <button
              className="py-2 px-4 hover:cursor-pointer flex justify-start bg-white transtion duration-200 hover:bg-gray-100"
              type="button"
              onClick={logOut}
            >
              Cerrar Sesion
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
