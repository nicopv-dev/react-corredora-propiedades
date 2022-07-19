import { useNavigate } from "react-router-dom";
import { formatNumber } from "../utils/methods";

export default function PropiedadItem({
  idPropiedades,
  nombreProp,
  description,
  imagen,
  valor,
}) {
  const navigate = useNavigate();

  const gotoPropiedad = (idPro) => {
    navigate(`/propiedad/${idPro}`);
  };

  return (
    <div
      className="flex flex-col gap-2 hover:cursor-pointer"
      onClick={() => gotoPropiedad(idPropiedades)}
      aria-hidden="true"
    >
      <div className="h-80 overflow-hidden rounded-xl">
        <img
          src={`${import.meta.env.VITE_API_URL}/images/${imagen}`}
          alt={nombreProp}
          className="w-full h-full object-cover rounded-xl transition-all duration-300 ease-in-out scale-100 hover:cursor-pointer hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-between">
        <h2 className="text-black font-semibold text-base truncate">
          {nombreProp}
        </h2>
        <p className="font-normal opacity-60 line-clamp-2">{description}</p>
        <h4 className="font-medium mt-2">
          ${formatNumber(valor)}{" "}
          <span className="text-black opacity-60 font-light">/ mes</span>
        </h4>
      </div>
    </div>
  );
}
