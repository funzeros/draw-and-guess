<script lang="ts">
  import { onDestroy } from "svelte";
  import useSocket from "../hooks/socket";
  import { statusMap } from "../const";
  import useFace from "../hooks/face";
  const { send, add, remove } = useSocket();
  const { randomFace, randomFaceByArr } = useFace();
  let rooms: Rooms = [];

  const getRoomListFn: ActionsFn<Rooms> = (res) => {
    rooms = res.data;
  };
  add("getRoomList", getRoomListFn);
  const enterRoom = (roomId: number) => {
    const face = randomFace();
    send({ type: "enterRoom", data: { roomId } });
  };
  const createRoom = () => {
    const face = randomFace();
    send({ type: "createRoom", data: { face } });
  };
  onDestroy(() => {
    remove("getRoomList", getRoomListFn);
  });
</script>

<section class="room-wrap">
  <div class="room-head">
    <button on:click={createRoom}>创建房间</button>
  </div>
  <div class="room-content basic-scroll">
    <div class="room-scroll">
      {#each rooms as item (item.id)}
        <div class="room-item" on:click={() => enterRoom(item.id)}>
          <span>房间号：{item.id}</span>
          <div class="status">{statusMap[item.status]}</div>
          <div>
            <svg class="icon" aria-hidden="true" style="font-size: 24px;">
              <use xlink:href="#face-keai" />
            </svg>
          </div>
        </div>
      {:else}
        <div class="no-room">没有等待中的游戏房间，赶快去创建一个吧！</div>
      {/each}
    </div>
  </div>
</section>

<style>
  .room-wrap {
    position: fixed;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    padding: 2vh 2vw 4vh;
    background-color: #e0e0e0;
  }
  .room-head {
    padding: 0 0 2vh;
    height: 6vh;
    display: flex;
    flex-direction: row-reverse;
  }
  .room-head > *:not(:first-of-type) {
    margin-right: 10px;
  }
  .room-content {
    height: 88vh;
    padding: 4vh 4vw;
    border-radius: 5vh;
    background: #e0e0e0;
    box-shadow: inset 2vh 2vh 4vh #bebebe, inset -2vh -2vh 4vh #ffffff;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .room-scroll {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    gap: 80px;
    padding: 50px;
  }
  .room-item {
    height: 200px;
    width: 200px;
    cursor: pointer;
    border-radius: 50px;
    background: linear-gradient(145deg, #f0f0f0, #cacaca);
    box-shadow: 20px 20px 40px #bebebe, -20px -20px 40px #ffffff;
    overflow: hidden;
    padding: 20px;
    text-align: center;
  }
  .room-item > div {
    margin-top: 5px;
  }
  .room-item .status {
    color: #999;
  }
  .room-item:hover {
    background: #e0e0e0;
    box-shadow: 20px 20px 40px #bebebe, -20px -20px 40px #ffffff;
  }
  .room-item:active {
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    box-shadow: 20px 20px 40px #bebebe, -20px -20px 40px #ffffff;
  }
  .no-room {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    color: #bbb;
  }
</style>
