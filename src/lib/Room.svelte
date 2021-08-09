<script lang="ts">
  export let rooms: Rooms = [];
</script>

<section class="room-wrap">
  {#each rooms as item (item.id)}
    <div>{item}</div>
  {/each}
</section>
