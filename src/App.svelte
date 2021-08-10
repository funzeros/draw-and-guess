<script lang="ts">
  import DrawingBoard from "./lib/DrawingBoard.svelte";
  import Room from "./lib/Room.svelte";
  import { useUser } from "./hooks/store";
  import useSocket from "./hooks/socket";
  const { getName, getState, setState } = useUser();
  const userName = getName();
  const { add, initSocket } = useSocket(userName);
  let state = "offLine";
  const changeState = () => {
    state = getState();
  };
  const enterRoomFn: ActionsFn = () => {
    setState("waiting");
    changeState();
  };
  add("connect", changeState);
  add("enterRoom", enterRoomFn);
  initSocket();
</script>

<main>
  {#if state === "rooming"}
    <Room />
  {:else if ["gaming", "waiting"].includes(state)}
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
