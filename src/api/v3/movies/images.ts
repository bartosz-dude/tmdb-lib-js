import TMDBFetcher, { Fetcher } from "../../../fetcher"
import { URLPaths } from "../../../tmdb"
import TMDBUrlParser from "../../../urlParser"
import { OmitOptionalKeys, OmitRequiredKeys, DeepReadonly } from "../../../utilityTypes"

interface Request {
	movie_id: number,
	include_image_language?: string,
	language?: string
}

interface Response {
	backdrops: {
		aspect_ratio: number,
		height: number,
		iso_639_1: string,
		file_path: string,
		vote_average: number,
		vote_count: number,
		width: number,
	}[],
	id: number,
	logos: {
		aspect_ratio: number,
		height: number,
		iso_639_1: string,
		file_path: string,
		vote_average: number,
		vote_count: number,
		width: number,
	}[],
	posters: {
		aspect_ratio: number,
		height: number,
		iso_639_1: string,
		file_path: string,
		vote_average: number,
		vote_count: number,
		width: number,
	}[]
}

type PathParams = OmitOptionalKeys<Request>
type QueryParams = OmitRequiredKeys<Request>

type ReturnResponse = Promise<DeepReadonly<Response>>

export function TMDBMovieImages(request: Request, fetcher: Fetcher): ReturnResponse
export function TMDBMovieImages(request: Request, readAccessToken: string): ReturnResponse

export default function TMDBMovieImages(request: Request, fetcherOrApi: Fetcher | string): ReturnResponse {
	const url = TMDBUrlParser<PathParams, QueryParams>(URLPaths.MOVIE, "{movie_id}/images", {
		path: {
			movie_id: request.movie_id
		},
		query: {
			include_image_language: request.include_image_language,
			language: request.language
		}
	})

	if (typeof fetcherOrApi == "string") {
		return TMDBFetcher(url, fetcherOrApi)
	} else {
		return fetcherOrApi(url)
	}
}