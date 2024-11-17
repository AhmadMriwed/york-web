export function calculateHours(dateFrom: any, dateEnd: any) {
  if (dateFrom && dateEnd) {
    const startDate = new Date(dateFrom);
    const endDate = new Date(dateEnd);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const durationInHours = timeDifference / (1000 * 60 * 60);
    return Math.round(durationInHours);
  }
  return 0;
}

export function getUTCDate(date: any) {
  const utcDate = new Date(date);
  return utcDate.toISOString().slice(0, 16).replace("T", " ");
}

export function getLocalISODate(date: any) {
  const formattedDate = new Date(date);
  formattedDate.setMinutes(
    formattedDate.getMinutes() - formattedDate.getTimezoneOffset()
  );
  return formattedDate.toISOString().slice(0, 16).replace("T", " ");
}

export function getLocalDate(date: any) {
  const localeDate = new Date(date);
  localeDate.setMinutes(
    localeDate.getMinutes() - localeDate.getTimezoneOffset()
  );
  return localeDate.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getLocalTimezoneDate(date: any) {
  const localDate = new Date(date);
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());

  return localDate;
}
