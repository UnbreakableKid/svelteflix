<script>
	import '../styles.css';
	import logo from '$lib/images/logo.svg';
	import tmdb from '$lib/images/tmdb.svg';
	import { page } from '$app/stores';
</script>

<nav>
	<a href="/">
		<img src={logo} alt="svelteflix" srcset="" />
	</a>

	<div class="links">
		<a href="/search">Search</a>
		<!-- <a href="/watchlist">Watchlist</a>
		<a href="/login">Login</a> -->
	</div>
</nav>

<main class:infinite={$page.data.infinite}>
	<slot />
</main>

<footer>
	<p>
		Data provided by <a href="https://www.themoviedb.org/">
			<img src={tmdb} alt="TMDB Logo" srcset="" />
		</a>
	</p>
</footer>

<style>
	nav {
		display: flex;
		width: 100vw;
		height: 3rem;
		align-items: center;
		justify-content: space-between;
		max-width: var(--column);
		margin: 0 auto;
		padding: 1em var(--side);
		color: var(--accent);
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	img {
		height: 1rem;
	}

	.links {
		display: flex;
		gap: 1rem;
	}

	footer {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 5rem;
	}

	main.infinite {
		height: 0;
		flex: 1;
		overflow: hidden;
	}
</style>
