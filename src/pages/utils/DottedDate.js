const DottedDate = (dateString) => {
  const [month, day, year] = dateString.split("/");
  return `${month.padStart(2, "0")}.${day.padStart(2, "0")}.${year}`;
};
export default DottedDate;
