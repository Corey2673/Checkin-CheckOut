const DateTimeSeparator = (dateTimeString) => {
  // Split the date and time
  const [date, time] = dateTimeString.split(", ");

  return { date, time };
};

export default DateTimeSeparator;

// firstname: false,
// lastname: false,
// lastname: false,
// timestampIN: false,
// timestampOUT: false,
