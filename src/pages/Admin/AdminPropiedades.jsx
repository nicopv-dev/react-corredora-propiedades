import { PlusSmIcon as PlusSmIconSolid } from "@heroicons/react/solid";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPropiedadesUsuario } from "../../api/requests";
import AdminPropiedadesForm from "../../components/Admin/AdminPropiedadesForm";
import Modal from "../../components/Modal";
import { selectSession } from "../../features/sessionSlice";
import { getImage } from "../../utils/methods";

export default function AdminPropiedades() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const session = useSelector(selectSession);
  const [propiedades, setPropiedades] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await getPropiedadesUsuario(session?.user?.id);

      if (response.status === 200) {
        setPropiedades(response.data);
      }
    } catch (err) {
      console.log(err.response);
    }
  }, [session]);

  useEffect(() => {
    fetchData();
  }, [fetchData, session]);

  const onChangeShowModal = () => {
    setShowModal(!showModal);
  };

  const goTo = (link) => {
    navigate(link);
  };

  return (
    <>
      <div className="py-4 flex flex-col mx-6 sm:ml-10 md:mr-10 lg:mr-20 gap-4">
        {/* title */}
        <h2 className="text-2xl font-bold text-left">Propiedades</h2>

        {/* buttons */}
        <div className="flex justify-between items-center h-10">
          {/* search */}
          <div className="bg-white shadow rounded-lg h-full">
            <input
              placeholder="Buscar propiedad"
              type="text"
              className="h-full px-6 bg-white focus:outline-none rounded-lg"
            />
          </div>
          {/* addon */}
          <button
            type="button"
            className="h-full px-4 bg-purple-500 text-white shadow rounded-md flex items-center"
            onClick={() => setShowModal(true)}
          >
            <PlusSmIconSolid className="w-6 h-6 text-white" />
            <span className="hidden md:block">Nueva Propiedad</span>
          </button>
        </div>

        {/* propiedades list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {propiedades.slice(0, 12).map((item) => (
            <div
              key={item?.id}
              className="flex flex-col gap-2 bg-white p-4 rounded-md shadow-md hover:cursor-pointer"
              onClick={() => goTo(`/admin/propiedades/${item?.idPropiedades}`)}
              aria-hidden="true"
            >
              {/* image */}
              <div className="h-24">
                <img
                  alt={item?.nombreProp}
                  src={getImage(item?.imagen)}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              {/* title */}
              <div className="overflow-hidden">
                <h4 className="truncate text-sm font-medium">
                  {item.nombreProp}
                </h4>
                <p className="text-xs font-light line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        showModal={showModal}
        onChangeShowModal={onChangeShowModal}
        title="Nueva Propiedad"
        size="max-w-4xl"
      >
        <AdminPropiedadesForm onChangeShowModal={onChangeShowModal} />
      </Modal>
    </>
  );
}
