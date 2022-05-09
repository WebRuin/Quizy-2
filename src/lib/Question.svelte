<script>
  import { BarLoader } from "svelte-loading-spinners";
  import { score, questionNumber } from "./store.js";

  export let question;
  export let nextQuestion;
  export let addToNumberOfWrongAnswers;

  let isCorrect;
  let isAnswered = false;
  let isWaiting = false;
  let answers = question.incorrect_answers.map((answer) => {
    return {
      answer,
      correct: false,
    };
  });

  let allAnswers = [
    ...answers,
    {
      answer: question.correct_answer,
      correct: true,
    },
  ];
  shuffle(allAnswers);

  function checkQuestion(correct) {
    if (!isAnswered) {
      isAnswered = true;
      isCorrect = correct;
      if (isCorrect) {
        score.update((val) => val + 1);
      } else {
        addToNumberOfWrongAnswers();
      }
      isWaiting = true;
      setTimeout(() => {
        isWaiting = false;
        nextQuestion();
      }, 1500);
    }
  }

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
</script>

<article>
  {#if isWaiting}
    <BarLoader size="60" color="#FF3E00" unit="px" duration="1s" />
  {:else}
    <h3>{@html question.question}</h3>
  {/if}
  {#if isAnswered}
    <h5 class:isCorrect>
      {#if isCorrect}Darn Right!! 🔥{:else}Nope 🤬{/if}
    </h5>
  {/if}
  <section class="answers">
    {#each allAnswers as answer}
      <button
        disabled={isAnswered}
        on:click|once={() => checkQuestion(answer.correct)}
        >{@html answer.answer}</button
      >
    {/each}
  </section>
</article>

<style>
  :global(.isCorrect) {
    color: green;
  }

  h3 {
    font-size: 1.5rem;
    line-height: 1.5;
  }

  .answers {
    margin: var(--margin);
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
  }
</style>
