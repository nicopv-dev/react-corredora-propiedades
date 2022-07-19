import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import Calendar from "../components/Calendar";
import { getPropiedad } from "../api/requests";
import Loading from "../components/Loading";
import { formatDate } from "../utils/moment";
import { formatNumber, getImage } from "../utils/methods";

export default function Propiedad() {
  const [propiedad, setPropiedad] = useState(null);
  const [selectedDate, setSelectedDate] = useState({
    date: new Date(),
    isSelectedDate: false,
  });
  const { id } = useParams();

  const fetchPropiedad = useCallback(async () => {
    try {
      const response = await getPropiedad(id);
      if (response.status === 200) {
        setPropiedad(response.data?.propImagen);
      }
    } catch (err) {
      console.log(err.response);
    }
  }, [id]);

  useEffect(() => {
    fetchPropiedad();
  }, [id, fetchPropiedad]);

  const onChangeSelectedDate = (e) => {
    setSelectedDate({ date: e, isSelectedDate: true });
  };

  return (
    <div className="m-auto min-h-screen pt-28">
      {propiedad ? (
        <div className="px-6 sm:px-10 md:px-16 lg:px-24 flex flex-col gap-4">
          {/* header */}
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold">{propiedad?.nombreProp}</h1>
            <span className="text-black opacity-70 text-sm font-light flex items-center gap-1">
              <LocationMarkerIcon className="w-4 h-4" />
              {propiedad?.direcciones}
            </span>
          </div>

          {/* gallery */}
          <div className="grid sm:grid-rows-3 sm:grid-cols-2 md:grid-rows-2 md:grid-cols-4 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`${
                  i === 0 ? "col-span-2 row-span-2" : "row-span-auto"
                }`}
              >
                <img
                  alt=""
                  src={getImage(propiedad?.imagen)}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* section */}
          <div className="mt-4 flex flex-col lg:flex-row gap-4">
            {/* left */}
            <div className="flex-1 lg:flex-[0.7_1_0%] mr-0 md:mr-6 flex flex-col gap-10">
              {/* description */}
              <div className="text-base">{propiedad?.description}</div>
              {/* user */}
              <div className="flex items-center gap-2">
                <div className="h-14 w-14">
                  <img
                    alt=""
                    src="https://cdn.pixabay.com/photo/2019/11/07/08/40/puppy-4608266_960_720.jpg"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="flex font-semibold">
                    {propiedad?.usuario?.nombre} {propiedad?.usuario?.apellido}
                  </p>
                  <span className="text-sm font-light">
                    {propiedad?.usuario?.email}
                  </span>
                </div>
              </div>
              {/* estado */}
              <h3>{propiedad?.estado === 0 ? "Sin arrendar" : "Arrendado"}</h3>
              {/* caracteristicas */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Caracteristicas</h3>
                <ul className="grid grid-cols-2 gap-4">
                  <li className="flex items-center gap-2">
                    <ion-icon name="storefront-outline" size="large" />
                    <p className="text-md">
                      N° Habitaciones <span>{propiedad?.habitaciones}</span>
                    </p>
                  </li>
                  <li className="flex items-center gap-2">
                    <ion-icon name="water-outline" size="large" />
                    <p className="text-md">
                      N° de Baños <span>{propiedad?.baño}</span>
                    </p>
                  </li>
                  <li className="flex items-center gap-2">
                    <ion-icon name="car-sport-outline" size="large" />
                    <p className="text-md">
                      {propiedad?.estacionamiento === 1 ? (
                        <span>Con estacionamiento</span>
                      ) : (
                        <span>Sin estacionamiento</span>
                      )}
                    </p>
                  </li>
                  <li className="flex items-center gap-2">
                    <ion-icon name="easel-outline" size="large" />
                    <p className="text-md">
                      {propiedad?.amobalado === 1 ? (
                        <span>Amueblado</span>
                      ) : (
                        <span>Sin muebles</span>
                      )}
                    </p>
                  </li>
                </ul>
              </div>
              {/* calendario */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Agendar Visita</h3>
                <p>
                  Para agendar y poder acceder a la propiedad, debes seleccionar
                  la fecha disponible que mas te acomode y agendaremos una
                  visita...
                </p>
                <div className="flex justify-center md:justify-start">
                  <Calendar
                    selectedDate={selectedDate}
                    onChangeSelectedDate={onChangeSelectedDate}
                  />
                </div>
              </div>
            </div>
            {/* right */}
            <div className="flex-1 lg:flex-[0.3_1_0%] flex justify-center md:block">
              <Solicitar valor={propiedad?.valor} selectedDate={selectedDate} />
            </div>
          </div>

          {/* map */}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

function Solicitar({ valor, selectedDate }) {
  return (
    <div className="sticky top-28 right-0 max-w-sm w-full shadow-lg rounded-lg flex flex-col gap-4 p-6 border border-slate-200">
      <h1 className="font-semibold text-xl">
        ${formatNumber(valor)}{" "}
        <span className="font-light text-black opacity-30">/ mes</span>
      </h1>
      <div className="flex flex-col p-4 border border-slate-200 rounded-lg">
        <span className="text-sm">Fecha Solicitada</span>
        <p className="font-light text-black opacity-80">
          {selectedDate?.isSelectedDate
            ? formatDate(selectedDate?.date)
            : "Seleccione una fecha"}
        </p>
      </div>
      <button type="button" className="bg-rose-500 py-2 text-white rounded-lg">
        SOLICITAR
      </button>
      <p className="text-xs font-light text-center">
        No se hará ningún cargo por el momento
      </p>
    </div>
  );
}
