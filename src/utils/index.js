import { TEMPLATES, TEMPLATE_MASK } from "./constants";

function isNumeric(value) {
  return /^\d+$/.test(value);
}

function isTemplateConform(code) {
  if (!code || !isNumeric(code)) {
    return false;
  }

  return TEMPLATES.some((t) => t.length === code.length);
}

function isTemplate(code) {
  if (!code) {
    return false;
  }

  const template = TEMPLATES.find((t) => t.length === code.length);
  if (!template) {
    return false;
  }

  const prefix = code.slice(0, template.begin);
  const mask = code.slice(template.begin);

  if (!isNumeric(prefix)) {
    return false;
  }

  if (mask !== TEMPLATE_MASK.repeat(template.length - template.begin)) {
    return false;
  }

  return true;
}

function createTemplate(code) {
  if (!isTemplateConform(code)) {
    return code;
  }

  const template = TEMPLATES.find((t) => t.length === code.length);
  if (!template) {
    return code;
  }

  return (
    code.slice(0, template.begin) +
    TEMPLATE_MASK.repeat(template.length - template.begin)
  );
}

function getPriceFromTemplate(code) {
  if (!isTemplateConform(code)) {
    return 0;
  }

  const template = TEMPLATES.find((t) => t.length === code.length);
  if (!template) {
    return 0;
  }

  const v = code.slice(template.begin, template.end);

  return Number(v) / 100;
}

export function toNumber(val) {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
}

export default {
  isNumeric,
  isTemplate,
  isTemplateConform,
  getPriceFromTemplate,
  createTemplate,
  toNumber,
};
