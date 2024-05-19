import { MovieResults } from "../types";

export const ApiEndpoints = {
  popularMovies:
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
};

export type ApiService = {
  getTrendingMovies: () => Promise<MovieResults>;
};

export const createApiService = (
  token: string,
  fetchFn = fetch
): ApiService => {
  const get = async (url: string) => {
    const response = await fetchFn(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    });
    return response.json();
  };

  return {
    getTrendingMovies: async () => {
      const data = await get(ApiEndpoints.popularMovies);
      return data;
    },
  };
};
