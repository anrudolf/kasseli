function dynamicSort(property: string, lang = "de") {
  let sortOrder = 1;
  if (property[0] === "-" || property[0] === "+") {
    sortOrder = property[0] === "-" ? -1 : 1;
    property = property.substr(1);
  }

  return function (a, b) {
    if (property === "label") {
      const result =
        a["label"][lang] < b["label"][lang]
          ? -1
          : a["label"][lang] > b["label"][lang]
          ? 1
          : 0;
      return result * sortOrder;
    }

    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

export default dynamicSort;
