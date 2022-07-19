import { FilterIcon } from "@heroicons/react/outline";
import { Slider } from "@mui/material";
import { useState } from "react";
import Modal from "./Modal";
import { formatNumber } from "../utils/methods";

export default function OrderFilter({
  rangePrice,
  onChangeOrderFilter,
  setRangePrice,
}) {
  const [showModal, setShowModal] = useState(false);

  const onChangeShowModal = () => {
    setShowModal(!showModal);
  };

  // activar filtro
  const activeOrderFilter = (type) => {
    // cerrar el modal de filtro
    onChangeOrderFilter(type);
  };

  return (
    <>
      <button
        type="button"
        className="hidden text-sm px-3 py-2 border border-gray-300 rounded-md sm:flex items-center gap-1"
        onClick={onChangeShowModal}
      >
        Ordenar Por
        <FilterIcon className="w-4 h-4" />
      </button>
      <Modal
        onChangeShowModal={onChangeShowModal}
        showModal={showModal}
        title="Filtro"
        size="max-w-2xl"
      >
        <Filter
          onChangeShowModal={onChangeShowModal}
          activeOrderFilter={activeOrderFilter}
          rangePrice={rangePrice}
          setRangePrice={setRangePrice}
        />
      </Modal>
    </>
  );
}

function Filter({
  rangePrice,
  onChangeShowModal,
  activeOrderFilter,
  setRangePrice,
}) {
  const handleChange = (e, newValue) => {
    setRangePrice(newValue);
  };

  const addFilter = () => {
    activeOrderFilter("price");
    // cerrar el modal de filtro
    onChangeShowModal();
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="px-6 flex flex-col gap-2">
          <h2 className="text-lg font-medium">Rango de precios</h2>
          <div className="flex items-center justify-between">
            <p className="px-4 py-2 text-lg font-medium border border-slate-200">
              <span className="font-light text-sm mr-1">min</span>$
              {formatNumber(rangePrice[0] * 10000)}
            </p>
            <p className="px-4 py-2 text-lg font-medium border border-slate-200">
              <span className="font-light text-sm">max</span> $
              {formatNumber(rangePrice[1] * 10000)}
            </p>
          </div>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={rangePrice}
            onChange={handleChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(targetValue) =>
              `$${formatNumber(targetValue * 10000)}`
            }
            getAriaValueText={() => "Precio"}
            color="secondary"
          />
        </div>
        <div className="px-6">
          <h2 className="text-lg font-medium">Nombre</h2>
        </div>
      </div>
      <div className="pt-4 px-6 flex justify-end">
        <button
          type="button"
          className="bg-black text-white font-medium py-2 px-8 rounded-lg"
          onClick={addFilter}
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}
