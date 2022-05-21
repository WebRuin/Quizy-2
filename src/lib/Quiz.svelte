<script>
	import { fly } from 'svelte/transition';
	import { BarLoader } from 'svelte-loading-spinners';
	import { category, difficulty, questionType, score, questionNumber } from './store.js';
	import { goto } from '$app/navigation';

	import Question from './Question.svelte';
	import Modal from './Modal.svelte';

	let activeQuestion = 1;
	let quiz = getQuiz();
	let gameMessage = 'Please choice an answer';
	let wrongAnswers = 4;
	let isModalOpen;
	let isWinner;

	async function getQuiz() {
		const res = await fetch(
			`https://opentdb.com/api.php?amount=10&category=${parseInt(
				$category
			)}&difficulty=${$difficulty}&type=${$questionType}`
		);
		const quiz = await res.json();
		return quiz;
	}

	function nextQuestion() {
		activeQuestion = activeQuestion + 1;
		$questionNumber.update((val) => activeQuestion);
	}

	$: if ($score > 6) {
		isWinner = true;
		isModalOpen = true;
	} else if ($score > 5) {
		gameMessage = 'You are a true master of the universe';
	} else if ($score > 4) {
		gameMessage = 'Dude, now you just showing off!';
	} else if ($score > 3) {
		gameMessage = 'Ok, maybe you are not stupid after all!?!';
	} else if ($score > 2) {
		gameMessage = 'Three, right on, maybe you should try harder?';
	} else if ($score > 1) {
		gameMessage = 'Alrigh, you got two right, keep going!';
	} else if ($score > 0) {
		gameMessage = 'So, you got one right, should I be impressed?';
	} else {
	}

	function addToNumberOfWrongAnswers() {
		wrongAnswers = wrongAnswers - 1;
		if (wrongAnswers < 1) {
			isModalOpen = true;
			isWaiting = true;
			setTimeout(() => {
				isWaiting = false;
				resetQuiz();
			}, 1500);
		} else if (wrongAnswers < 2) {
			gameMessage = 'One more wrong answer and you lose!!!';
		} else {
		}
	}

	function resetQuiz() {
		isModalOpen = false;
		activeQuestion = 1;
		score.set(0);
		wrongAnswers = 0;
		quiz = getQuiz();
		goto('/');
	}
</script>

<section>
	<h3>
		<p>You can miss {wrongAnswers} questions</p>
	</h3>
	{#if gameMessage}
		<h4>{gameMessage}</h4>
	{/if}

	{#await quiz}
		<BarLoader size="60" color="#FF3E00" unit="px" duration="1s" />
	{:then data}
		{#each data.results as question, index}
			{#if index === activeQuestion - 1}
				<div in:fly={{ x: 100 }} out:fly={{ x: -200 }} class="fade-wrapper">
					<Question {question} {nextQuestion} {addToNumberOfWrongAnswers} />
				</div>
			{/if}
		{/each}
	{/await}
</section>

{#if isModalOpen}
	<Modal on:closeModal={resetQuiz} class="modal-bg">
		{#if isWinner}
			<h1>Congrats</h1>
			<p>You won the game!</p>
		{:else}
			<h1>You lost</h1>
		{/if}
		<button on:click={resetQuiz}>Go Again!</button>
	</Modal>
{/if}

<style>
	.fade-wrapper {
		position: absolute;
		width: 600px;
		margin: var(--margin);
	}

	h2 {
		background: linear-gradient(90deg, var(--blue-teal) 0%, var(--hot-pink) 100%);
		font-size: 2rem;
		margin-bottom: 0.25rem;
	}

	p {
		text-align: center;
	}

	h4 {
		font-size: 1.5rem;
		color: var(--hot-pink);
		margin: 2rem 0;
	}

	@media screen and (max-width: 600px) {
		.fade-wrapper {
			width: 91.25vw;
		}
	}
</style>
