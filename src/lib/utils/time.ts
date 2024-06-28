import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export function getHoursMinutesSeconds(seconds: number) {
  const duration = dayjs.duration(seconds, "seconds");

  return {
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds()
  };
}

export function formatHoursMinutesSeconds(
  seconds: number,
  noWords?: boolean
) {
  const {
    hours,
    minutes,
    seconds: remainingSeconds
  } = getHoursMinutesSeconds(seconds);
  let formattedHours = "";
  let formattedMinutes = "";
  let formattedSeconds = "";

  if (!noWords) {
    formattedHours = hours ? `${hours} hr ` : "";
    formattedMinutes = minutes ? `${minutes} min ` : "";
    formattedSeconds = `${remainingSeconds} sec`;
  } else {
    formattedHours = hours ? `${hours}:` : "";
    formattedMinutes = minutes ? `${minutes}:` : "0:";
    formattedSeconds = `${remainingSeconds}`;
  }

  return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
}
