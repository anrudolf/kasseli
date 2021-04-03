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

export default {
  isNumeric,
  isTemplateConform,
  getPriceFromTemplate,
  createTemplate,
};
