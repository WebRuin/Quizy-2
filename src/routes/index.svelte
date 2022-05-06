<script>
  import Quiz from "$lib/Quiz.svelte";
</script>

<main>
  <h1>Let's Get Quizy!!</h1>
  <Quiz />
</main>

<style>
  :global(button) {
    margin: 0.5rem;
    padding: 1rem;
    background: var(--color-50);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    border: 2px solid var(--hightlight);
    font-weight: bold;
    color: var(--color);
    max-width: 60px;
  }
  :global(button:hover) {
    background: var(--hightlight);
    color: #fff;
  }
  :global(button:disabled) {
    background: #222;
    color: #fff;
    border: 2px solid #000;
    cursor: not-allowed;
  }
</style>
