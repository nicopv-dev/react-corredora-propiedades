import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Snackbar } from "@mui/material";
import { eliminarPropiedad, getPropiedad } from "../../api/requests";
import Loading from "../../components/Loading";
import { getImage } from "../../utils/methods";

export default function AdminPropiedad() {
  const [propiedad, setPropiedad] = useState(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await getPropiedad(id);
      if (response.status === 200) {
        setPropiedad(response.data.propImagen);
      }
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deletePropiedad = async () => {
    try {
      const response = await eliminarPropiedad(id);
      if (response.status === 200) {
        setOpenNotification(true);
        setMessage("Propiedad eliminada correctamente");
        navigate("/admin/propiedades");
      }
    } catch (err) {
      setOpenNotification(true);
      setMessage("Error al eliminar la propiedad");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setTimeout(() => {
      setOpenNotification(false);
    }, 2000);
  };

  return (
    <div className="pr-24 pl-8 my-4">
      {propiedad ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-black font-semibold text-2xl ">
              {propiedad?.nombreProp}
            </h1>
            <button
              type="button"
              onClick={deletePropiedad}
              className="bg-red-600 text-white py-2 px-8 font-normal text-md"
            >
              Eliminar Propiedad
            </button>
          </div>
          <div className="h-80 w-full">
            <img
              alt=""
              src={getImage(propiedad?.imagen)}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {/* description */}
          <div>
            <p>{propiedad?.description}</p>
          </div>
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
        </div>
      ) : (
        <Loading />
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openNotification}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}
