type RoomStatus = "waiting" | "gaming";
interface Room {
  id: number;
  player: string[];
  owner: string;
  status: RoomStatus;
}
type Rooms = Room[];

type RoomStatusMap = {
  [K in RoomStatus]: string;
};
