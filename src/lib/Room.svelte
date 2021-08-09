<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let rooms: Rooms = [];
  dispatch("getRooms");
</script>

<section class="room-wrap">
  {#each rooms as item (item.id)}
    <div>{item}</div>
  {/each}
</section>
