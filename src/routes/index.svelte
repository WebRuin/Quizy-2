<script>
  import Quiz from "$lib/Quiz.svelte";
  import { questionNumber } from "$lib/store.js";
</script>

<main>
  <header>
    <h1>Let's Get Quizy!!</h1>
    <h2>
      {$questionNumber}/10
    </h2>
  </header>
  <Quiz />
</main>

<style>
  h1 {
    font-size: 3rem;
    color: var(--hightlight-color);
  }
  h2 {
    font-size: 3rem;
    color: var(--hightlight-light-color);
  }

  header {
    display: flex;
    margin: var(--margin);
    justify-content: space-between;
  }

  :global(button) {
    margin: var(--margin);
    padding: 1rem;
    background: var(--light-color-50);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    border: 2px solid var(--hightlight-color);
    font-weight: bold;
    color: var(--light-color);
  }
  :global(button:hover) {
    background: var(--hightlight-color);
    color: #fff;
  }
  :global(button:disabled) {
    background: var(--hightlight-dark-color);
    color: #fff;
    border: 2px solid #000;
    cursor: not-allowed;
  }
</style>
