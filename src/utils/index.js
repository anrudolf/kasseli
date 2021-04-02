import {
  TEMPLATE_TOTAL_LEN,
  TEMPLATE_SUFFIX_LEN,
  TEMPLATE_CHAR,
} from "./constants";

function isNumeric(value) {
  return /^\d+$/.test(value);
}

function isTemplateConform(code) {
  return code && code.length === 13 && isNumeric(code);
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

function getPriceFromTemplate(barcode) {
  if (!isTemplateConform(barcode)) {
    return 0;
  }

  const v = barcode.slice(
    TEMPLATE_TOTAL_LEN - TEMPLATE_SUFFIX_LEN,
    TEMPLATE_TOTAL_LEN - 1
  );

  return Number(v) / 100;
}

export default {
  isNumeric,
  isTemplateConform,
  getPriceFromTemplate,
  createTemplate,
};
