import { GMath, useGStore } from "gems-tools";

export const STORE_MOD = {
  USER: "DAG_USER",
};

export const useUser = () => {
  const store = useGStore(STORE_MOD.USER);
  return {
    store,
    getName() {
      const k = "name";
      const v = store.getItem(k);
      if (!v) {
        const name = GMath.randomStr();
        store.setItem(k, name);
      }
      return store.getItem(k);
    },
    getState() {
      const k = "state";
      const v = store.getItem(k);
      if (!v) store.setItem(k, "rooming");
      return store.getItem(k);
    },
    setState(p: string) {
      const k = "state";
      return store.setItem(k, p);
    },
  };
};
