<script>
	import { category, difficulty, questionType } from '$lib/store.js';
	import { createForm } from 'svelte-forms-lib';
	import { goto } from '$app/navigation';

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			category: $category,
			difficulty: $difficulty,
			questionType: $questionType
		},
		validate: (values) => {
			let errs = {};
			if (values.category === '...') {
				errs['category'] = 'You must choose a category';
			}
			if (values.difficulty === '...') {
				errs['difficulty'] = 'Please choose a difficulty';
			}
			if (values.questionType === '...') {
				errs['questionType'] = 'Please choose a difficulty';
			}
			return errs;
		},
		onSubmit: (values) => {
			category.update((val) => (val = values.category));
			difficulty.update((val) => (val = values.difficulty));
			questionType.update((val) => (val = values.questionType));
			goto('/quiz');
		}
	});
</script>

<main>
	<header>
		<h1>Let's Get Quizy!!</h1>
	</header>
	<form on:submit={handleSubmit}>
		<label for="category">
			Category
			<select id="category" name="category" on:change={handleChange} bind:value={$form.category}>
				<option>...</option>
				<option value="9">General Knowledge</option>
				<option value="10">Entertainment: Books</option>
				<option value="11">Entertainment: Film</option>
				<option value="12">Entertainment: Music</option>
				<option value="13">Entertainment: Musicals &amp; Theatres</option>
				<option value="14">Entertainment: Television</option>
				<option value="15">Entertainment: Video Games</option>
				<option value="16">Entertainment: Board Games</option>
				<option value="17">Science &amp; Nature</option>
				<option value="18">Science: Computers</option>
				<option value="19">Science: Mathematics</option>
				<option value="20">Mythology</option>
				<option value="21">Sports</option>
				<option value="22">Geography</option>
				<option value="23">History</option>
				<option value="27">Animals</option>
				<option value="28">Vehicles</option>
				<option value="29">Entertainment: Comics</option>
				<option value="30">Science: Gadgets</option>
				<option value="31">Entertainment: Japanese Anime &amp; Manga</option>
				<option value="32">Entertainment: Cartoon &amp; Animations</option>
			</select>
		</label>
		{#if $errors.category}
			<small>{$errors.category}</small>
		{/if}

		<label for="difficulty">
			Difficulty
			<select
				id="difficulty"
				name="difficulty"
				on:change={handleChange}
				bind:value={$form.difficulty}
			>
				<option>...</option>
				<option value="easy">Easy</option>
				<option value="medium">Medium</option>
				<option value="hard">Hard</option>
			</select>
		</label>
		{#if $errors.difficulty}
			<small>{$errors.difficulty}</small>
		{/if}

		<label for="questionType">
			Question Type
			<select
				id="questionType"
				name="questionType"
				on:change={handleChange}
				bind:value={$form.questionType}
			>
				<option value="multiple">Multiple</option>
				<option value="boolean">True/False</option>
			</select>
		</label>
		{#if $errors.questionType}
			<small>{$errors.questionType}</small>
		{/if}

		<button type="submit">Play</button>
	</form>
</main>

<style>
	header {
		display: flex;
		margin: var(--margin);
		justify-content: space-between;
	}

	label {
		display: grid;
		margin-bottom: 1rem;
	}

	label,
	select {
		font-size: 1.5rem;
		margin: 0;
		margin-top: 1rem;
	}

	select {
		width: 100%;
		margin: 1rem 0;
		padding: 0.5rem;
		color: var(--light-color);
		background: rgba(0, 0, 0, 0.2);
		border: none;
	}
	select::after {
		content: '';
		justify-self: end;
		width: 0.8em;
		height: 0.5em;
		background-color: var(--select-arrow);
		clip-path: polygon(100% 0%, 0 0%, 50% 100%);
	}
</style>
