import utils from "../../src/utils";

describe("utils", () => {
  it("isNumeric", () => {
    expect(utils.isNumeric("123abc")).toBe(false);
    expect(utils.isNumeric("abc")).toBe(false);
    expect(utils.isNumeric("123")).toBe(true);
  });

  it("isTemplateConform: EAN13", () => {
    // length 11
    expect(utils.isTemplateConform("11111112222")).toBe(false);

    // length 13 but not all digits
    expect(utils.isTemplateConform("111111122222A")).toBe(false);

    // length 13 and all digits
    expect(utils.isTemplateConform("1111111222223")).toBe(true);

    // this is a template id, but not a template conform code (also not all digits)
    expect(utils.isTemplateConform("1111111XXXXXX")).toBe(false);
  });

  it("isTemplateConform: UPCA", () => {
    // length 11
    expect(utils.isTemplateConform("11111112222")).toBe(false);

    // length 12 but not all digits
    expect(utils.isTemplateConform("11111122222A")).toBe(false);

    // length 12 and all digits
    expect(utils.isTemplateConform("111111222223")).toBe(true);

    // this is a template id, but not a template conform code (also not all digits)
    expect(utils.isTemplateConform("111111XXXXXX")).toBe(false);
  });

  it("createTemplate", () => {
    expect(utils.createTemplate("0000000123456")).toBe("0000000XXXXXX");
  });

  it("getPriceFromTemplate", () => {
    // EAN13
    expect(utils.getPriceFromTemplate("0000000123456")).toBe(123.45);
    expect(utils.getPriceFromTemplate("0000000000456")).toBe(0.45);

    // UPCA
    expect(utils.getPriceFromTemplate("123456543216")).toBe(543.21);
    expect(utils.getPriceFromTemplate("123456000016")).toBe(0.01);

    // not a template code
    expect(utils.getPriceFromTemplate("123")).toBe(0);
  });
});
