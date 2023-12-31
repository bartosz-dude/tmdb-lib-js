import TMDBFetcher, { Fetcher } from "../../../fetcher"
import { URLPaths } from "../../../tmdb"
import TMDBUrlParser from "../../../urlParser"

type ExternalSource = "imdb_id" | "facebook_id" | "instagram_id" | "tvdb_id" | "tiktok_id" | "twitter_id" | "wikidata_id" | "youtube_id"

interface Request {
	external_id: number,
	external_source: ExternalSource,
	language?: string
}

type PathParams = {
	external_id: number
}

type QueryParams = {
	external_source: ExternalSource,
	language?: string
}

interface Response {
	movie_results: {
		adult: boolean,
		backdrop_path: string,
		id: number,
		title: string,
		original_language: string,
		original_title: string,
		overview: string,
		poster_path: string,
		media_type: string,
		genre_ids: number[],
		popularity: number,
		release_date: string,
		video: boolean,
		vote_average: number,
		vote_count: number
	}[],
	person_results: [], // Not defined in docs
	tv_results: {
		adult: boolean,
		backdrop_path: string,
		id: number,
		name: string,
		original_language: string,
		original_name: string,
		overview: string,
		poster_path: string,
		media_type: string,
		genre_ids: number[],
		popularity: number,
		first_air_date: string,
		vote_average: number,
		vote_count: number,
		origin_country: string[],
	}[], // Not defined in docs; taken from response
	tv_episodes_results: [], // Not defined in docs
	tv_seasons_results: [] // Not defined in docs
}

export function TMDBFingFindById(request: Request, fetcher: Fetcher): Promise<Response>
export function TMDBFingFindById(request: Request, readAccessToken: string): Promise<Response>

export default function TMDBFingFindById(request: Request, fetcherOrApi: Fetcher | string): Promise<Response> {
	const url = TMDBUrlParser<PathParams, QueryParams>(URLPaths.FIND, "{external_id}", {
		path: {
			external_id: request.external_id
		},
		query: {
			external_source: request.external_source,
			language: request.language
		}
	})

	if (typeof fetcherOrApi == "string") {
		return TMDBFetcher(url, fetcherOrApi)
	} else {
		return fetcherOrApi<Response>(url)
	}
}