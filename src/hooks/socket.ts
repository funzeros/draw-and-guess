import { useUser } from "./store";

const { setState } = useUser();
let socket: WebSocket;

const socketActions: SocketActions = {
  connect: [
    (res) => {
      console.log(res.msg);
      setState(res.data.state);
    },
  ],
  getRooms: [],
};
const useSocket = (name: string) => {
  const user = {
    name,
  };
  let time = 0;
  function initSocket() {
    const url = "localhost:10053/dagws";
    socket = new WebSocket(`ws://${url}`);
    socket.onopen = () => {
      send({ type: "connect" });
    };
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data) as SocketVO;
      if (data.type in socketActions)
        socketActions[data.type].forEach((fn) => fn(data));
    };
    socket.onclose = () => {
      socket = null;
      console.info("socket closed");
    };
    socket.onerror = () => {
      console.error("socket error, restart right now");
      socket.close();
      setTimeout(() => {
        console.log("restart socket time:%d", time + 1);
        getSocket();
      }, time++ * 1000);
    };
  }
  function getSocket() {
    if (!socket) initSocket();
    return socket;
  }
  function send(params: SocketParams) {
    const ins = getSocket();
    params.name = user.name;
    ins.send(JSON.stringify(params));
  }
  function add(key: SocketActionsEnum, callback: ActionsFn) {
    socketActions[key].push(callback);
  }
  function remove(key: SocketActionsEnum, callback: ActionsFn) {
    const index = socketActions[key].findIndex((m) => m === callback);
    if (index > -1) socketActions[key].splice(index, 1);
  }
  return {
    initSocket,
    getSocket,
    send,
    add,
    remove,
  };
};
export default useSocket;
