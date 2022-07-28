export function parseDuration(time) {
  let times = time.split(":");
  return Number(times[2]) + Number(times[1]) * 60 + Number(times[0]) * 3600;
}

export function formatTime(time) {
  let hour = Math.floor(time / 3600);
  let minute = Math.floor((time - hour * 3600) / 60);
  let second = time - minute * 60 - hour * 3600;
  if (hour <= 9) hour = "0" + hour;
  if (minute <= 9) minute = "0" + minute;
  if (second <= 9) second = "0" + second;
  return hour + ":" + minute + ":" + second;
}

export function subDateTime(dateTime1, dateTime2) {
  return formatTime(
    Math.abs((Date.parse(dateTime1) - Date.parse(dateTime2)) / 1000)
  );
}
