import { SearchRepositoryData } from "./api";

// Api responses are a bit tricky. I'd love to have a type here, but it wouldn't be 100% safe
// because github could change their api and our code wouldn't reflect it

export const mapGithubData = (data: any[]): SearchRepositoryData[] => {
  return data.map((item) => ({
    owner: item.owner.login,
    repo: item.name,
    language: item.language
  }));
};
