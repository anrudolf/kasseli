import {
  TEMPLATE_TOTAL_LEN,
  TEMPLATE_SUFFIX_LEN,
  TEMPLATE_CHAR,
} from "./constants";

function isNumeric(value) {
  return /^\d+$/.test(value);
}

function createTemplate(barcode) {
  if (!barcode || barcode.length !== TEMPLATE_TOTAL_LEN) {
    return barcode;
  }

  return (
    barcode.slice(0, TEMPLATE_TOTAL_LEN - TEMPLATE_SUFFIX_LEN) +
    TEMPLATE_CHAR.repeat(TEMPLATE_SUFFIX_LEN)
  );
}

export default {
  isNumeric,
  createTemplate,
};
