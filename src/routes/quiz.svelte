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
</style>
