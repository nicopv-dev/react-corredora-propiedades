import { useState } from "react";
import axios from "../utils/axios";
import { setAccessToken } from "../utils/localStorage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      const response = await axios.post("/usuario/iniciar-sesion", data);
      const { token } = response.data;
      setAccessToken(token);
      window.location.href = "/";
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="flex items-center min-h-screen z-30">
      <div className="hidden sm:block h-screen flex-[6_1_0%]">
        <img
          alt=""
          src="https://cdn.pixabay.com/photo/2022/07/06/18/34/florence-7305768_960_720.jpg"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 sm:flex-[4_1_0%] flex justify-center">
        {/* login form */}
        <form className="max-w-xs w-full flex flex-col gap-4" onSubmit={login}>
          <h1 className="text-3xl font-semibold text-center">Iniciar Sesion</h1>
          <div>
            <span>Correo Electronico</span>
            <input
              type="text"
              placeholder="Ingrese su correo electronico"
              className="px-4 py-2 bg-gray-100 rounded-md focus:outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <span>Contraseña</span>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              className="px-4 py-2 bg-gray-100 rounded-md focus:outline-none w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-rose-500 text-white uppercase py-2 rounded-md"
          >
            Iniciar Sesion
          </button>
        </form>
      </div>
    </div>
  );
}
