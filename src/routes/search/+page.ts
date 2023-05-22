import type { PageLoad } from './$types';
import * as api from '$lib/api.js';
import type { MovieList } from '$lib/types';

export const load: PageLoad = async ({ url, fetch }) => {
	const query = url.searchParams.get('query');

	if (!query) {
		return {
			query,
			movies: []
		};
	}

	const data: MovieList = await api.get(fetch, 'search/movie', {
		query
	});

	return {
		query,
		movies: data.results
	};
};
