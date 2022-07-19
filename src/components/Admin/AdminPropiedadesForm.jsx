import {
  FormControlLabel,
  Switch,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { selectSession } from "../../features/sessionSlice";
import axios from "../../utils/axios";

export default function AdminPropiedadesForm({ onChangeShowModal }) {
  const session = useSelector(selectSession);
  const [titulo, setTitulo] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [numBanios, setNumBanios] = useState("");
  const [numHabitaciones, setNumHabitaciones] = useState("");
  const [isEstacionamiento, setIsEstacionamiento] = useState(false);
  const [isAmueblado, setIsAmueblado] = useState(false);
  const [direccion, setDireccion] = useState("");
  const [tipoPropiedad, setTipoPropiedad] = useState(0);
  const [image, setImage] = useState({ file: null, preview: "" });

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImage({ file, preview: URL.createObjectURL(file) });
      // Do something with the files
    },
    [setImage]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    noKeyboard: true,
  });

  const createPropiedad = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("archivo", image.file);
    formData.append("nombreProp", titulo);
    formData.append("description", description);
    formData.append("estado", 0);
    formData.append("valor", parseInt(price));
    formData.append("habitaciones", parseInt(numHabitaciones));
    formData.append("bano", parseInt(numBanios));
    formData.append("estacionamiento", isEstacionamiento ? 1 : 0);
    formData.append("amoblado", isAmueblado ? 1 : 0);
    formData.append("direcciones", direccion);
    formData.append("usuarioId", session?.user?.id);
    formData.append("idTipoProp", tipoPropiedad);

    try {
      const response = await axios.post("/propiedades/crear", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      if (response.status === 200) {
        alert("Propiedad creada con exito");
        onChangeShowModal();
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleChangeIsAmueblado = (e) => {
    setIsAmueblado(!isAmueblado);
  };

  const handleChangeIsEstacionamiento = (e) => {
    setIsEstacionamiento(!isEstacionamiento);
  };

  return (
    <form onSubmit={createPropiedad} className="">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          {/* fields */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="flex flex-col text-xs">
              Titulo
              <input
                type="text"
                placeholder="Ingresar titulo de la Propiedad"
                name="title"
                id="title"
                className="focus:outline-none py-2 px-4 bg-black bg-opacity-10 rounded-md text-sm"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </label>
            <label htmlFor="description" className="flex flex-col text-xs">
              Descripcion
              <textarea
                type="text"
                placeholder="Ingresar descripcion de la Propiedad"
                name="description"
                id="description"
                rows={5}
                cols={30}
                className="focus:outline-none py-2 px-4 bg-black bg-opacity-10 rounded-md text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2">
          <div className="grid grid-cols-3 gap-2">
            <label htmlFor="precio" className="flex flex-col text-xs">
              Precio
              <input
                type="number"
                id="precio"
                className="focus:outline-none py-2 px-4 bg-black bg-opacity-10"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label htmlFor="estacionamiento" className="flex flex-col text-xs">
              N° De Baños
              <input
                type="number"
                id="estacionamiento"
                className="focus:outline-none py-2 px-4 bg-black bg-opacity-10"
                value={numBanios}
                onChange={(e) => setNumBanios(e.target.value)}
              />
            </label>
            <label htmlFor="habitaciones" className="flex flex-col text-xs">
              N° De Habitaciones
              <input
                type="number"
                id="habitaciones"
                className="focus:outline-none py-2 px-4 bg-black bg-opacity-10"
                value={numHabitaciones}
                onChange={(e) => setNumHabitaciones(e.target.value)}
              />
            </label>
          </div>
          <div className="flex justify-between">
            <FormControlLabel
              control={
                <Switch
                  checked={isEstacionamiento}
                  onChange={handleChangeIsEstacionamiento}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="¿Tiene Estacionamiento?"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isAmueblado}
                  onChange={handleChangeIsAmueblado}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="¿Amueblado?"
            />
          </div>
          <label htmlFor="direccion" className="flex flex-col text-xs">
            Direccion
            <input
              type="text"
              id="direccion"
              className="focus:outline-none py-2 px-4 bg-black bg-opacity-10"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </label>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">
              Seleccione Tipo de Propiedad
            </InputLabel>
            <Select
              value={tipoPropiedad}
              onChange={(e) => setTipoPropiedad(e.target.value)}
              displayEmpty
              label="Seleccione Tipo de Propiedad"
            >
              <MenuItem value={2}>Casa</MenuItem>
              <MenuItem value={1}>Departamento</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3>Subir Imagen</h3>
        <div className="hover:cursor-pointer" {...getRootProps()}>
          <input {...getInputProps()} />
          <p className="p-2 bg-rose-500 text-white transition duration-300 hover:bg-purple-500 hover:bg-opacity-10 hover:text-black">
            Drag and click to select files
          </p>
        </div>

        {image.file && (
          <div className="h-40">
            <img
              src={image?.preview}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-green-500 text-white mt-4"
      >
        Crear Propiedad
      </button>
    </form>
  );
}
