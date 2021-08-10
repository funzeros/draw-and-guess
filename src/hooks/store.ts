import { GMath, useGStore } from "gems-tools";

export const STORE_MOD = {
  USER: "DAG_USER",
};

export const useUser = () => {
  const store = useGStore(STORE_MOD.USER);
  function tempSet<T>(k: string) {
    return (p: T) => {
      return store.setItem(k, p);
    };
  }
  function tempGet<T>(k: string, defaultV: T) {
    return () => {
      const v = store.getItem(k);
      if (!v) store.setItem(k, defaultV);
      return store.getItem(k);
    };
  }
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
    getState: tempGet("state", "rooming"),
    setState: tempSet("state"),
    getRoomId: tempGet("roomId", 0),
    setRoomId: tempSet("roomId"),
  };
};
