export const lineProcessor = (text, size) => {
  if (text.length < size) return text;
  let temp = text.substring(0, size);
  temp += "...";
  return temp;
};

export const capitalizeString = (str) => {
  const words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
};

export const linkProcessor = (link) => {
  let start = "https://";
  if (!link.startsWith(start)) {
    link = start + link;
  }
  return link;
};

export const arraysEqual = (a1, a2) => {
  if (!a1 && (!a2 || a2?.length === 0)) return true;
  if (!a1 || !a2) return false;
  return (
    a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]))
  );
};

export const objectsEqual = (o1, o2) =>
  typeof o1 === "object" && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
    : o1 === o2;

// "2023-01-23T14:58:34.072Z"
export const timeProcessor = (str) => {
  const d = new Date(str);
  const dt = d.toDateString();
  const st = d.toLocaleTimeString();
  return dt + ", at " + st;
};

export const trimAll = (obj) => {
  const keys = Object.keys(obj);
  keys.forEach((key, index) => {
    let myVar = obj[key];
    if (typeof myVar === "string") {
      obj[key] = myVar.trim();
    }
  });
  return obj;
};
