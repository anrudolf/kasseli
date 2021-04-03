// 'templates' are barcodes with embedded prices, such as for
// weighted products like tomatoes, onions, apples
export const TEMPLATE_MASK = "X";

export const TEMPLATES = [
  { name: "EAN13", length: 13, begin: 7, end: 12, checksum: 1 },
  { name: "UPCA", length: 12, begin: 6, end: 11, checksum: 1 },
];
