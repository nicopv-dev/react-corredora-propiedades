import * as moment from "moment";
import esLocale from "moment/locale/es";

moment.defineLocale("es", [esLocale]);

export const formatDate = (date) =>
  moment(date).locale("es").format("DD/MM/YYYY");
