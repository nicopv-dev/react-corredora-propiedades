import axios from "../utils/axios";

export const DATA = [
  {
    id: 1,
    title: "Bastimento, Bocas del Toro, Panamá",
    description:
      "¡Bienvenido al paraíso! Round Cay le ofrece una isla privada para usted solo! Esta isla privada cuenta con 3 cabañas con dos habitaciones cada una, un muelle, una zona común con amenidades de entretenimiento, una cocina completa y servicio de limpieza, cocina y mantenimiento junto con el transporte desde La Ceiba. ¡Siéntete como en casa en esta isla exclusiva y privada y relájate en este hermoso pedazo de tierra!",
    price: 310000,
    image:
      "https://cdn.pixabay.com/photo/2017/04/10/22/28/residence-2219972_960_720.jpg",
    category: "Departamento",
    direccion: "Las Quilas 1067, Temuco",
  },
  {
    id: 2,
    title: "Propiedad 2",
    description:
      "¡Bienvenido al paraíso! Round Cay le ofrece una isla privada para usted solo! Esta isla privada cuenta con 3 cabañas con dos habitaciones cada una, un muelle, una zona común con amenidades de entretenimiento, una cocina completa y servicio de limpieza, cocina y mantenimiento junto con el transporte desde La Ceiba. ¡Siéntete como en casa en esta isla exclusiva y privada y relájate en este hermoso pedazo de tierra!",
    price: 600000,
    image:
      "https://cdn.pixabay.com/photo/2017/04/10/22/28/residence-2219972_960_720.jpg",
    category: "Casa",
    direccion: "Las Quilas 1067, Temuco",
  },
  {
    id: 3,
    title: "Hermosa isla privada con cinco amplias suites",
    description:
      "La Isla de Japón (IDJ) es una isla privada y exclusiva ubicada a 7 km de la costa de Angra dos Reis (Angra), un municipio a 168 km de la ciudad de Río de Janeiro, Angra integra la región de la Costa Verde, una región rodeada por la Selva Atlántica con mar tranquilo y cristalino.",
    price: 342000,
    image:
      "https://a0.muscache.com/im/pictures/3e37a3ee-6471-4356-b7ca-6856ab59b104.jpg",
    category: "Casa",
    direccion: "Las Quilas 1067, Temuco",
  },
  {
    id: 4,
    title: "Propiedad 4",
    description:
      "¡Bienvenido al paraíso! Round Cay le ofrece una isla privada para usted solo! Esta isla privada cuenta con 3 cabañas con dos habitaciones cada una, un muelle, una zona común con amenidades de entretenimiento, una cocina completa y servicio de limpieza, cocina y mantenimiento junto con el transporte desde La Ceiba. ¡Siéntete como en casa en esta isla exclusiva y privada y relájate en este hermoso pedazo de tierra!",
    price: 240000,
    image:
      "https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_960_720.jpg",
    category: "Casa",
  },
  {
    id: 5,
    title: "Propiedad 5",
    description:
      "¡Bienvenido al paraíso! Round Cay le ofrece una isla privada para usted solo! Esta isla privada cuenta con 3 cabañas con dos habitaciones cada una, un muelle, una zona común con amenidades de entretenimiento, una cocina completa y servicio de limpieza, cocina y mantenimiento junto con el transporte desde La Ceiba. ¡Siéntete como en casa en esta isla exclusiva y privada y relájate en este hermoso pedazo de tierra!",
    price: 300000,
    image:
      "https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_960_720.jpg",
    category: "Casa",
  },
  {
    id: 6,
    title: "Propiedad 6",
    description:
      "¡Bienvenido al paraíso! Round Cay le ofrece una isla privada para usted solo! Esta isla privada cuenta con 3 cabañas con dos habitaciones cada una, un muelle, una zona común con amenidades de entretenimiento, una cocina completa y servicio de limpieza, cocina y mantenimiento junto con el transporte desde La Ceiba. ¡Siéntete como en casa en esta isla exclusiva y privada y relájate en este hermoso pedazo de tierra!",
    price: 540000,
    image:
      "https://cdn.pixabay.com/photo/2017/04/10/22/28/residence-2219972_960_720.jpg",
    category: "Casa",
  },
  {
    id: 7,
    title: "Propiedad 7",
    description:
      "¡Bienvenido al paraíso! Round Cay le ofrece una isla privada para usted solo! Esta isla privada cuenta con 3 cabañas con dos habitaciones cada una, un muelle, una zona común con amenidades de entretenimiento, una cocina completa y servicio de limpieza, cocina y mantenimiento junto con el transporte desde La Ceiba. ¡Siéntete como en casa en esta isla exclusiva y privada y relájate en este hermoso pedazo de tierra!",
    price: 1000000,
    image:
      "https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271_960_720.jpg",
    category: "Departamento",
    direccion: "Las Quilas 1067, Temuco",
  },
  {
    id: 8,
    title: "Hermosa Isla en Mar Azul con Piscina KALUA",
    description: "Hermosa Isla en Mar Azul con Piscina KALUA",
    price: 1000000,
    image:
      "https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_960_720.jpg",
    category: "Casa",
    direccion: "Las Quilas 1067, Temuco",
  },
  {
    id: 9,
    title: "Propiedad 9",
    description: "Descripción de la propiedad",
    price: 420000,
    image:
      "https://cdn.pixabay.com/photo/2017/04/10/22/28/residence-2219972_960_720.jpg",
    category: "Casa",
    direccion: "Juan Pablo II 860, Temuco",
  },
  {
    id: 10,
    title: "Propiedad 10",
    description: "Descripción de la propiedad",
    price: 680000,
    image:
      "https://cdn.pixabay.com/photo/2017/04/10/22/28/residence-2219972_960_720.jpg",
    category: "Departamento",
    direccion: "Las Quilas 1067, Temuco",
  },
  {
    id: 11,
    title: "Propiedad 11",
    description: "Descripción de la propiedad",
    price: 480000,
    image:
      "https://cdn.pixabay.com/photo/2017/04/10/22/28/residence-2219972_960_720.jpg",
    category: "Departamento",
    direccion: "Las Quilas 1067, Temuco",
  },
  {
    id: 12,
    title: "Propiedad 12",
    description: "Descripción de la propiedad",
    price: 560000,
    image:
      "https://cdn.pixabay.com/photo/2017/04/10/22/28/residence-2219972_960_720.jpg",
    category: "Departamento",
    direccion: "Las Quilas 1067, Temuco",
  },
];

// obtener una propiedad por id
export const getPropiedad = async (id) => {
  const response = await axios.get(`/propiedades/obtener-prop/${id}`);
  return response;
};

// obtener todas las propiedades
export const getPropiedades = async () => {
  const response = await axios.get("/propiedades/obtener-prop");
  return response;
};

// obtener propiedades del ussuario autenticado
export const getPropiedadesUsuario = async (id) => {
  const response = await axios.get(`/propiedades/obtener-prop-usuario/${id}`);
  return response;
};

// eliminar propiedad
export const eliminarPropiedad = async (id) => {
  const response = await axios.delete(`/propiedades/eliminar-prop/${id}`);
  return response;
};
