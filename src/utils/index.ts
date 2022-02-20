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

// from https://gist.github.com/0x263b/2bdd90886c2036a1ad5bcf06d6e6fb37
export const getColor = (str: string) => {
  let hash = 0;
  if (!str || str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  const rgb = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 255;
    rgb[i] = value;
  }
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

export const getInitials = (str: string) => {
  return str;
};

export default {
  isNumeric,
  isTemplate,
  isTemplateConform,
  getPriceFromTemplate,
  createTemplate,
  toNumber,
  getColor,
  getInitials,
};
