<script>
  import { fly, fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<div transition:fade class="modal-bg">
  <div transition:fly={{ y: -100 }} class="modal">
    <button
      on:click={() => {
        dispatch("closeModal");
      }}
    >
      Close
    </button>

    <slot />
  </div>
</div>

<style>
  .modal-bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: grid;
    place-items: center;
  }

  .modal {
    width: 50vh;
    height: 50vh;
    display: grid;
    color: #f00;
    place-content: center;
    border-radius: 3vh;
    background-color: #fff;
    border: 4px solid #f00;
    text-align: center;
  }
</style>
