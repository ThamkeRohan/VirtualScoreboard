export function getMonthNameDayYearFormattedDate(unformattedDate) {
    const date = new Date(unformattedDate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate
}

export function getYearMonthDayFormattedDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

