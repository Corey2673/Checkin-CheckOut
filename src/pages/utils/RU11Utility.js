import { DateTime } from "luxon";

const isWithinRange = (time, start, end) => {
  return time >= start && time <= end;
};

const calculateDuration = (startTime, endTime) => {
  const start = DateTime.fromISO(startTime);
  const end = DateTime.fromISO(endTime);

  if (start > end) {
    throw new Error("Start time must be before end time");
  }

  let totalHoursDay = 0;
  let totalHoursNight = 0;

  for (let dt = start; dt <= end; dt = dt.plus({ hours: 1 })) {
    const dayStart = dt.set({ hour: 6, minute: 0 });
    const dayEnd = dt.set({ hour: 19, minute: 59 });
    const nightStart = dt.set({ hour: 20, minute: 0 });
    const nightEnd = dt.plus({ days: 1 }).set({ hour: 5, minute: 59 });

    if (isWithinRange(dt, dayStart, dayEnd)) {
      totalHoursDay += 1;
    } else if (isWithinRange(dt, nightStart, nightEnd)) {
      totalHoursNight += 1;
    }
  }

  return {
    totalHoursDay,
    totalHoursNight,
  };
};
