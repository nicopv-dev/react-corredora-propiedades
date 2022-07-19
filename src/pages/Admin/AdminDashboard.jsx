import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPropiedadesUsuario } from "../../api/requests";
import Loading from "../../components/Loading";
import { formatNumber, getImage } from "../../utils/methods";
import { selectSession } from "../../features/sessionSlice";

const CARDS_DATA = [
  {
    id: 1,
    title: "Propiedades por Alquilar",
    color: "bg-blue-500",
    number: "10",
  },
  {
    id: 2,
    title: "Propiedades por Alquilar",
    color: "bg-orange-500",
    number: "104",
  },
  { id: 3, title: "Horas en la agenda", color: "bg-rose-500", number: "10" },
  {
    id: 4,
    title: "Propiedades por Alquilar",
    color: "bg-green-500",
    number: "10",
  },
];

export default function AdminDashboard() {
  const [propiedades, setPropiedades] = useState([]);
  const session = useSelector(selectSession);

  const fechData = useCallback(async () => {
    try {
      const response = await getPropiedadesUsuario(session?.user?.id);

      if (response.status === 200) {
        setPropiedades(response.data);
      }
    } catch (err) {
      console.log(err.response);
    }
  }, []);

  useEffect(() => {
    fechData();
  }, [fechData]);

  return (
    <div className="py-4 flex flex-col mx-6 sm:ml-10 md:mr-10 lg:mr-24 gap-4">
      {/* title */}
      <h2 className="text-2xl font-bold text-left">Resumen</h2>

      {/* cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {CARDS_DATA.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            number={card.number}
            color={card.color}
          />
        ))}
      </div>

      {/* chart */}

      {/* lists */}
      <div className="py-4 px-6 bg-white rounded-md shadow-md">
        <h4 className="mb-2 text-lg font-medium">
          Ultimas Propiedades Agregadas
        </h4>
        {propiedades.length !== 0 ? (
          <div className="bg-white w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {propiedades.slice(0, 3).map((item) => (
              <div key={item?.idPropiedades} className="bg-white">
                {/* image */}
                <div className="h-40">
                  <img
                    alt={item?.nombreProp}
                    src={getImage(item?.imagen)}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                {/* info */}
                <div className="flex justify-between gap-2 py-4">
                  <div className="overflow-hidden">
                    <h3 className="text-sm font-medium truncate">
                      {item?.nombreProp}
                    </h3>
                    <p className="text-xs font-light">{item?.direcciones}</p>
                  </div>
                  <div>
                    <p className="bg-purple-100 text-black py-1 px-2 text-sm font-medium">
                      ${formatNumber(item?.valor)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

function Card({ title, number, color }) {
  return (
    <section className="w-full flex items-center justify-between bg-white px-4 py-6 rounded-lg shadow-md">
      <div>
        <h4 className="text-sm">{title}</h4>
        <p className="text-xl font-medium">{number}</p>
      </div>
      <div className={`h-8 w-8 ${color} rounded-full`} />
    </section>
  );
}
