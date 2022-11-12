import { createReceipt } from "@/services/receipts";
import useKasseStore from "@/store/kasse";
import useSettingsStore from "@/store/settings";
import useCheckoutStore from "@/store/checkout";

import { useRouter } from "vue-router";

import { TillMode } from "@/types";

const useCheckout = () => {
  const router = useRouter();
  const kasse = useKasseStore();
  const settings = useSettingsStore();
  const checkoutStore = useCheckoutStore();

  const checkout = ({
    success = true,
    paymentMethod = "cash",
    price = 0,
    paid = 0,
    change = 0,
  }) => {
    checkoutStore.success = success;
    checkoutStore.paymentMethod = paymentMethod;
    checkoutStore.price = price;
    checkoutStore.paid = paid;
    checkoutStore.change = change;
    router.replace("/checkout/overview");
  };

  return checkout;
};

export default useCheckout;
