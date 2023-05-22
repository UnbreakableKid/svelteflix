<script lang="ts">
	import { media } from '$lib/api';
	import type { MovieListResult } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';

	export let movies: MovieListResult[];
	export let next: string | null;

	const dispatch = createEventDispatcher();

	let viewport: HTMLDivElement;
	let results: HTMLDivElement;
	let itemWidth: number;
	let itemHeight: number;
	let numColumns: number = 4;

	let a: number = 0;
	let b: number = movies.length;
	let paddingTop: number = 0;
	let paddingBottom: number = 0;

	function handleResize() {
		const first = results.firstElementChild as HTMLAnchorElement;

		itemWidth = first.offsetWidth;
		itemHeight = first.offsetHeight;

		numColumns = 4;
		handleScroll();
	}

	function handleScroll() {
		const remaining = viewport.scrollHeight - (viewport.scrollTop + viewport.clientHeight);

		if (remaining < 400) {
			dispatch('loadMore');
		}

		a = Math.floor(viewport.scrollTop / itemHeight) * numColumns;
		b = Math.ceil((viewport.scrollTop + viewport.clientHeight) / itemHeight) * numColumns;

		paddingTop = Math.floor(a / numColumns) * itemHeight;
		paddingBottom = Math.floor((movies.length - b) / numColumns) * itemHeight;
	}

	onMount(handleResize);
</script>

<svelte:window on:resize={handleResize} />

<div class="viewport" bind:this={viewport} on:scroll={handleScroll}>
	<div
		class="results"
		bind:this={results}
		style:padding-top="{paddingTop}px"
		style:padding-bottom="{paddingBottom}px"
	>
		{#each movies.slice(a, b) as movie}
			<a href="/movies/{movie.id}">
				<img src={media(movie.poster_path, 500)} alt={movie.title} />
			</a>
		{/each}
	</div>
	{#if next}
		<a href={next}>Next Page</a>
	{/if}
</div>

<style>
	.results {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		width: 100%;
	}

	.viewport {
		overflow-y: auto;
	}

	.viewport::-webkit-scrollbar {
		display: none;
	}

	a {
		width: 100%;
		aspect-ratio: 2/3;
		padding: 0.5rem;
		height: auto;
	}

	img {
		width: 100%;
	}
</style>
