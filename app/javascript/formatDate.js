import { format } from "date-fns";

function formatDate(str) {
  const date = new Date(str.split("-"));
  return format(date, "dd MMMM yyyy");
}

export default formatDate;
