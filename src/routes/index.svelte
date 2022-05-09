<script>
  import { category, difficulty, questionNumber } from "$lib/store.js";
  import { createForm } from "svelte-forms-lib";
  import { goto } from '$app/navigation';

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      category: $category,
      difficulty: $difficulty,
    },
    validate: values => {
      let errs = {};
      if (values.category === "...") {
        errs["category"] = "You must choose a category";
      }
      if (values.difficulty === "...") {
        errs["difficulty"] = "Please choose a difficulty";
      }
      return errs;
    },
    onSubmit: values => {
      category.update((val) => val = values.category);
      difficulty.update((val) => val = values.difficulty);
      goto("/quiz");
    }
  });
</script>

<main>
  <header>
    <h1>Let's Get Quizy!!</h1>
  </header>
  <form on:submit={handleSubmit}>
    <label>
      Category
      <select
        id="category"
        name="category"
        on:change={handleChange}
        bind:value={$form.category}>
        <option>...</option>
        <option value="9">General Knowledge</option>
        <option value="18">Science: Computers</option>
        <option value="19">Science: Mathematics</option>
        <option value="23">History</option>
        <option value="27">Animals</option>
      </select>
    </label>
    {#if $errors.category}
      <small>{$errors.category}</small>
    {/if}

    <label>
      Difficulty
      <select
        id="difficulty"
        name="difficulty"
        on:change={handleChange}
        bind:value={$form.difficulty}>
        <option>...</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </label>
    {#if $errors.difficulty}
      <small>{$errors.difficulty}</small>
    {/if}

    <button type="submit">Play</button>
  </form>
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
