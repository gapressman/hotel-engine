import Axios from "axios";
import { ApiContent } from "../types/ApiContent";
import { ContentStatuses } from "../types/ContentStatus";
import { mapGithubData } from "./mapGithubData";

export interface SearchRepositoryData {
  owner: string;
  repo: string;
  language: string;
}

export interface RepositoryDetails {
  description: string;
  stars: number;
  language: string;
}

class Api {
  async getRepositoriesBySearchTerm(
    searchTerm: string,
    sort: string
  ): Promise<ApiContent<SearchRepositoryData[]>> {
    try {
      const { data: response } = await Axios.get(
        "https://api.github.com/search/repositories",
        {
          params: {
            q: searchTerm,
            sort,
          },
        }
      );

      const data = mapGithubData(response.items);

      return { data, contentStatus: ContentStatuses.SUCCESS };
    } catch (e) {
      return { contentStatus: ContentStatuses.ERROR };
    }
  }

  async getRepo(
    owner: string,
    repo: string
  ): Promise<ApiContent<RepositoryDetails>> {
    try {
      const { data: response } = await Axios.get(
        `https://api.github.com/repos/${owner}/${repo}`
      );

      const data = {
        description: response.description,
        stars: response.stargazers_count,
        language: response.language,
      };

      return { contentStatus: ContentStatuses.SUCCESS, data };
    } catch (e) {
      return { contentStatus: ContentStatuses.ERROR };
    }
  }
}

export const api = new Api();
