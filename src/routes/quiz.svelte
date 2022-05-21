<script>
	import Quiz from '$lib/Quiz.svelte';
	import { goto } from '$app/navigation';
	import { category, difficulty, questionNumber } from '$lib/store.js';

	console.log('Category', $category);
	console.log('Difficulty', $difficulty);
	onload = () => {
		if ($category === '...' || $difficulty === '...') {
			goto('/');
		}
	};
</script>

<main>
	<a href="/">← Back</a>
	<header>
		<h1>Let's Get Quizy!!</h1>
		<h2>
			Question #: {$questionNumber}/10
		</h2>
	</header>
	<Quiz />
</main>

<style>
	a {
		font-size: 0.8rem;
		color: var(--color-primary);
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
	main {
		height: 100%;
		display: grid;
		place-content: center;
	}

	header {
		display: flex;
		flex-wrap: wrap;
		margin: var(--margin);
		justify-content: space-between;
	}
</style>
