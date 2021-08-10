type ActionsFn<T = SocketData> = (res: SocketVO<T>) => void;
interface SocketActions {
  connect: ActionsFn[];
  createRoom: ActionsFn[];
  enterRoom: ActionsFn[];
  getRoomList: ActionsFn[];
}
type SocketActionsEnum = keyof SocketActions;
interface SocketData<T = any> {
  [key: string]: T;
  [key: number]: T;
}
interface SocketVO<T = SocketData> {
  type: SocketActionsEnum;
  msg: string;
  data: T;
  name: string;
}
type SocketParams = Partial<SocketVO>;
