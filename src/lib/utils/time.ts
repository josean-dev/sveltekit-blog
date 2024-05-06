import pluralize from "pluralize";
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

export function formatHoursMinutesSeconds(seconds: number) {
  const {
    hours,
    minutes,
    seconds: remainingSeconds
  } = getHoursMinutesSeconds(seconds);

  const formattedHours = hours ? `${hours} hr ` : "";
  const formattedMinutes = minutes ? `${minutes} min ` : "";
  const formattedSeconds = `${remainingSeconds} sec`;

  return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
}
