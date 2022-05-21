<script>
	import { BarLoader } from 'svelte-loading-spinners';
	import { score, questionNumber } from './store.js';

	export let question;
	export let nextQuestion;
	export let addToNumberOfWrongAnswers;

	let isCorrect;
	let isAnswered = false;
	let isWaiting = false;
	let answers = question.incorrect_answers.map((answer) => {
		return {
			answer,
			correct: false
		};
	});

	let allAnswers = [
		...answers,
		{
			answer: question.correct_answer,
			correct: true
		}
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
		<div class="loader">
			<BarLoader size="60" color="#00d8ff" unit="px" duration="1s" />
		</div>
	{:else}
		<p class="question">{@html question.question}</p>
	{/if}
	{#if isAnswered}
		<h5 class:isCorrect>
			{#if isCorrect}Darn Right!! 🔥{:else}Nope 🤬{/if}
		</h5>
	{/if}
	<section class="answers">
		{#each allAnswers as answer}
			<button disabled={isAnswered} on:click|once={() => checkQuestion(answer.correct)}
				>{@html answer.answer}</button
			>
		{/each}
	</section>
</article>

<style>
	:global(.isCorrect) {
		color: var(--hot-pink);
	}

	p {
		font-size: 1.2rem;
		line-height: 1.2;
	}

	.answers {
		margin: var(--margin);
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
	}

	.question {
		font-size: 1.5rem;
		text-align: left;
	}

	.loader {
		margin-bottom: 1rem;
	}
</style>
