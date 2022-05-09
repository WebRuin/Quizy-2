<script>
  import Quiz from "$lib/Quiz.svelte";
  import { goto } from '$app/navigation';
  import { category, difficulty, questionNumber } from "$lib/store.js";

  console.log('Category', $category);
  console.log('Difficulty', $difficulty);
  onload = () => {
    if ($category === "..." || $difficulty === "...") {
      goto("/");
    }
  }
</script>

<main>
  <header>
    <h1>Let's Get Quizy!!</h1>
    <h2>
      Question #: {$questionNumber}/10
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
    margin-top: 0.5rem;
    font-size: 2rem;
    color: var(--hightlight-light-color);
  }

  header {
    display: flex;
    flex-wrap: wrap;
    margin: var(--margin);
    justify-content: space-between;
  }

  @media screen and (max-width: 600px) {
    h2 {
      margin-top: 1rem;
      display: block;
      margin: 0 auto;
    }
  }
</style>
