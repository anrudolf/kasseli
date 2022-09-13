import { computed } from "vue";

import useOrdersStore from "@/store/orders";
import { OrderGroup } from "@/types";

export const useOrdersProjection = () => {
  const ordersStore = useOrdersStore();

  return computed(() => {
    const groups = [] as OrderGroup[];
    for (const order of ordersStore.items) {
      const found = groups.find((g) => g.serial == order.serial);
      if (found) {
        found.content.push(order);
        continue;
      }

      const newGroup: OrderGroup = { serial: order.serial, content: [order] };
      groups.push(newGroup);
    }

    return groups;
  });
};
