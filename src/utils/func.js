function formatDateString(dateString, format = "dd/MM/yyyy") {
   if (!isValidDate(dateString)) {
      return "Invalid Date";
   }
   const date = new Date(dateString);
   const day = date.getDate();
   const month = date.getMonth() + 1;
   const year = date.getFullYear();
   const formattedDate = format
      .replace("dd", day.toString().padStart(2, "0"))
      .replace("MM", month.toString().padStart(2, "0"))
      .replace("yyyy", year);
   return formattedDate;
}
function isValidDate(dateString) {
   return !isNaN(new Date(dateString).getTime());
}

export {formatDateString, isValidDate};
