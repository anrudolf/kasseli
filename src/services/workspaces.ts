import useProductStore from "@/store/products";
import useTillStore from "@/store/till";
import useOrdersStore from "@/store/orders";

import { setDatabaseWorkspace } from "@/services/db";

export const initWorkspace = (ws: string) => {
  const products = useProductStore();
  const tills = useTillStore();
  const orders = useOrdersStore();

  setDatabaseWorkspace(ws);

  products.init();
  tills.init();
  orders.init();
};
