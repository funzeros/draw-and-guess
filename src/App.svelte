<script lang="ts">
  import DrawingBoard from "./lib/DrawingBoard.svelte";
  import Room from "./lib/Room.svelte";
  import { useUser } from "./hooks/store";
  import useSocket from "./hooks/socket";
  const { getName, getState } = useUser();
  const userName = getName();
  const { send } = useSocket(userName);
  let state = getState();
  let rooms: Rooms = [];
  const getRooms = () => {
    send({ type: "getRooms" });
  };
</script>

<main>
  {#if state === "rooming"}
    <Room bind:rooms on:getRooms={getRooms} />
  {:else}
    <DrawingBoard />
  {/if}
</main>

<style>
  main {
    height: 100%;
    overflow: hidden;
    background-color: var(--color-white);
  }
</style>
