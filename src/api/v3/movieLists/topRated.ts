import TMDBFetcher, { Fetcher } from "../../../fetcher"
import { URLPaths } from "../../../tmdb"
import TMDBUrlParser from "../../../urlParser"

interface Request {
	language?: string,
	page?: number,
	region?: string
}

type PathParams = null

type QueryParams = {
	[ key in keyof Request ]: Request[ key ]
}


interface Response {
	page: number,
	results: {
		adult: boolean,
		backdrop_path: string,
		genre_ids: number[],
		id: number,
		original_language: string,
		original_title: string,
		overview: string,
		popularity: number,
		poster_path: string,
		release_date: string,
		title: string,
		video: boolean,
		vote_average: number,
		vote_count: number
	}[],
	total_pages: number,
	total_results: number
}

export function TMDBMovieListsTopRated(request: Request, fetcher: Fetcher): Promise<Response>
export function TMDBMovieListsTopRated(request: Request, readAccessToken: string): Promise<Response>

export default function TMDBMovieListsTopRated(request: Request, fetcherOrApi: Fetcher | string): Promise<Response> {
	const url = TMDBUrlParser<PathParams, QueryParams>(URLPaths.MOVIE, "top_rated", {
		query: {
			language: request.language,
			page: request.page,
			region: request.region
		}
	})

	if (typeof fetcherOrApi == "string") {
		return TMDBFetcher(url, fetcherOrApi)
	} else {
		return fetcherOrApi<Response>(url)
	}
}