export const formatNumber = (number) =>
  String(number).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

export const formatDate = (date) => {
  console.log(date);
};

export const getImage = (imagePath) =>
  `${import.meta.env.VITE_API_URL}/images/${imagePath}`;
