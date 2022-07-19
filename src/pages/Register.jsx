import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center min-h-screen z-30">
      <div className="hidden sm:block h-screen flex-[6_1_0%]">
        <img
          alt=""
          src="https://cdn.pixabay.com/photo/2018/01/31/12/16/architecture-3121009_960_720.jpg"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 sm:flex-[4_1_0%] flex justify-center">
        {/* login form */}
        <form className="max-w-xs w-full flex flex-col gap-4" onSubmit={login}>
          <h1 className="text-3xl font-semibold text-center">Registrarse</h1>
          <div>
            <span>Nombre</span>
            <input
              type="text"
              placeholder="Ingrese su nombre"
              className="px-4 py-2 bg-gray-100 rounded-md focus:outline-none w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              type="text"
              placeholder="Ingrese su contraseña"
              className="px-4 py-2 bg-gray-100 rounded-md focus:outline-none w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-rose-500 text-white font-medium uppercase py-2 rounded-md"
          >
            Iniciar Sesion
          </button>
        </form>
      </div>
    </div>
  );
}
