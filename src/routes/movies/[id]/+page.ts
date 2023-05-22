import * as api from '$lib/api.js';
import type { MovieDetails } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const movie: MovieDetails = await api.get(fetch, `movie/${params.id}`, {
		append_to_response: 'videos,images,recommendations'
	});

	const trailer = movie.videos.results.find((video) => {
		return (
			video.official &&
			video.site === 'YouTube' &&
			(video.type === 'Trailer' || video.type === 'Teaser')
		);
	});

	return {
		movie,
		trailer
	};
};
