import { format } from "date-fns";
import viLocale from "date-fns/locale/vi";

export const formatDate = (date, dateFormat = "dd/MM/yyyy") => {
   return format(date, dateFormat, { locale: viLocale });
};
