<script lang="ts">
  import DrawingBoard from "./lib/DrawingBoard.svelte";
  import Room from "./lib/Room.svelte";
  import { useUser } from "./hooks/store";
  import useSocket from "./hooks/socket";
  const { getName, getState } = useUser();
  const userName = getName();
  const { send, add, initSocket } = useSocket(userName);
  let state = "offLine";
  let rooms: Rooms = [];
  const getRooms: ActionsFn = (res) => {
    console.log(res);
  };
  const changeState = () => {
    state = getState();
  };
  add("connect", changeState);
  add("getRooms", getRooms);
  initSocket();
</script>

<main>
  {#if state === "rooming"}
    <Room bind:rooms />
  {:else if state === "gaming"}
    <DrawingBoard />
  {:else}
    <div />
  {/if}
</main>

<style>
  main {
    height: 100%;
    overflow: hidden;
    background-color: var(--color-white);
  }
</style>
