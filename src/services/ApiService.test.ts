import { waitFor } from "@testing-library/react";
import { ApiEndpoints, createApiService } from "./ApiService";

describe("ApiService", () => {
  const authToken = "mock-token";
  it("should call getTrendingMovies", () => {
    const jsonResolve = jest.fn();
    const fetchMock = jest.fn().mockResolvedValue({
      json: jsonResolve,
    });
    const service = createApiService(authToken, fetchMock);

    service.getTrendingMovies();
    expect(fetchMock).toHaveBeenCalledWith(ApiEndpoints.popularMovies, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        accept: "application/json",
      },
    });
    waitFor(() => {
      expect(jsonResolve).toHaveBeenCalledTimes(1);
    });
  });
});
