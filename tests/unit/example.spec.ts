import { shallowMount } from "@vue/test-utils";
import Pay from "@/components/Pay.vue";

const routerPushMock = jest.fn();

jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

describe("Pay.vue", () => {
  it("renders props.msg when passed", () => {
    const id = "1001";
    const wrapper = shallowMount(Pay, {
      props: { id },
    });
    expect(wrapper.text()).toMatch(id);
  });
});
