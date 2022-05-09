<script>
  import { fly, fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<div transition:fade class="modal-bg">
  <div transition:fly={{ y: -100 }} class="modal">
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
    border-radius: 3vh;
    text-align: center;
    place-content: center;
    color: var(--light-color);
    background: var(--dark-color);
    border: 4px solid var(--hightlight-color);
  }

  @media screen and (max-width: 600px) {
    .modal {
      width: unset;
    }
  }
</style>
