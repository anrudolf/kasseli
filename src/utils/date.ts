const pad2 = (value: number) => `${value}`.padStart(2, "0");

export const getLocaleDateTimeString = (iso: string) => {
  const date = getLocaleDateString(iso);
  const time = getLocaleTimeString(iso);

  return `${date} ${time}`;
};

export const getLocaleDateString = (iso: string) => {
  const d = new Date(iso);

  const YYYY = d.getFullYear();
  const MM = pad2(d.getMonth() + 1);
  const DD = pad2(d.getDate());

  return `${YYYY}-${MM}-${DD}`;
};

export const getLocaleTimeString = (iso: string) => {
  const d = new Date(iso);

  const hh = pad2(d.getHours());
  const mm = pad2(d.getMinutes());
  const ss = pad2(d.getSeconds());

  return `${hh}:${mm}:${ss}`;
};
