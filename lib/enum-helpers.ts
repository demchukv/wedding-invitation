
export const enumToArray = (enumbObj: any) => {
  const arrayManual: { label: string; value: string }[] = [];
  for (const key in enumbObj) {
    if (enumbObj.hasOwnProperty(key)) {
      arrayManual.push({ label: key, value: enumbObj[key] });
    }
  }
  return arrayManual;
};
