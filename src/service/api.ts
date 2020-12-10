import Axios from "axios";
import { ApiContent } from "../types/ApiContent";
import { ContentStatuses } from "../types/ContentStatus";
import { mapGithubData } from "./mapGithubData";

export interface RepositoryData {
  owner: string;
  repo: string;
}

class Api {
  async getRepositoriesBySearchTerm(
    searchTerm: string
  ): Promise<ApiContent<RepositoryData[]>> {
    try {
      const { data: response } = await Axios.get(
        "https://api.github.com/search/repositories",
        {
          params: {
            q: searchTerm,
          },
        }
      );

      const data = mapGithubData(response.items);

      return { data, contentStatus: ContentStatuses.SUCCESS };
    } catch {
      return { contentStatus: ContentStatuses.ERROR };
    }
  }
}

export const api = new Api();
