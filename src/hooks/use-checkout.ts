import { createReceipt } from "@/services/receipts";
import useKasseStore from "@/store/kasse";
import useSettingsStore from "@/store/settings";

import { useRouter } from "vue-router";

import { TillMode } from "@/types";

const useCheckout = () => {
  const router = useRouter();
  const kasse = useKasseStore();
  const settings = useSettingsStore();

  const checkout = () => {
    createReceipt();

    if (
      settings.tillMode == TillMode.ORDER_AND_PAY_LATER ||
      settings.tillMode == TillMode.ORDER_AND_PAY
    ) {
      router.replace("/checkout/order");
      return;
    }

    kasse.$reset();
    router.replace("/");
  };

  return checkout;
};

export default useCheckout;
