import { waitFor } from "@testing-library/react";
import Axios from "axios";
import { ContentStatuses } from "../../types/ContentStatus";
import { api } from "../api";
import { mapGithubData } from "../mapGithubData";

jest.spyOn(Axios, "get");

jest.mock("../mapGithubData", () => ({
  mapGithubData: jest.fn(),
}));

const mockResponse = [
  {
    author: {
      login: "foo",
    },
    repository: {
      name: "bar",
    },
  },
];

afterEach(() => {
  jest.clearAllMocks();
});

describe("getRepositoriesSearchTerm", () => {
  it("given getRepositoriesBySearchTerm is called, Axios.get should be called with proper route and params", async () => {
    (Axios.get as jest.Mock).mockResolvedValue({
      data: { items: mockResponse },
    });

    await waitFor(() => {
      api.getRepositoriesBySearchTerm("foo", "bar");
    });

    expect(Axios.get).toBeCalledWith(
      "https://api.github.com/search/repositories",
      {
        params: { q: "foo", sort: "bar" },
      }
    );
  });

  it("given a good response from api call, mapGithubData should be called with items", async () => {
    (Axios.get as jest.Mock).mockResolvedValue({
      data: { items: mockResponse },
    });

    await waitFor(() => {
      api.getRepositoriesBySearchTerm("foo", "bar");
    });

    expect(mapGithubData).toBeCalledWith(mockResponse);
  });

  it("given a good response from api call and successful mapping, mapGithubData should return ApiContent with data and a status of success", async () => {
    (Axios.get as jest.Mock).mockResolvedValue({
      data: { items: mockResponse },
    });

    const mappedData = [{ owner: "foo", repo: "bar" }];
    (mapGithubData as jest.Mock).mockReturnValue(mappedData);

    const response = await api.getRepositoriesBySearchTerm("foo", "bar");

    expect(response).toEqual({
      data: mappedData,
      contentStatus: ContentStatuses.SUCCESS,
    });
  });

  it("given a good response from api call and successful mapping, mapGithubData should return ApiContent with data and a status of success", async () => {
    (Axios.get as jest.Mock).mockRejectedValue({
      data: [],
      error: "foo",
    });

    const response = await api.getRepositoriesBySearchTerm("foo", "bar");

    expect(response).toEqual({
      contentStatus: ContentStatuses.ERROR,
    });
  });
});

describe("getRepo", () => {
  it("given getRepo is called with owner and repo, axios should be called with correct endpoint", () => {
    api.getRepo("foo", "bar");

    expect(Axios.get).toBeCalledWith("https://api.github.com/repos/foo/bar");
  });

  it("given api call is successful, should return Api Content with success and correct data", async () => {
    (Axios.get as jest.Mock).mockResolvedValue({
      data: {
        description: "foobr",
        stargazers_count: 10000,
        langunage: "Italian",
        gistsUrl: "google.com",
      },
    });

    const response = await api.getRepo("foo", "bar");

    expect(response).toEqual({
      contentStatus: ContentStatuses.SUCCESS,
      data: { description: "foobr", language: undefined, stars: 10000 },
    });
  });

  it("given api call fails, should return Api Content with status of error", async () => {
    (Axios.get as jest.Mock).mockRejectedValue({});

    const response = await api.getRepo("foo", "bar");

    expect(response).toEqual({
      contentStatus: ContentStatuses.ERROR,
    });
  });
});
