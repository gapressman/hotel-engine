import { RepositoryData } from "./api";

// Api responses are a bit tricky. I'd love to have a type here, but it wouldn't be 100% safe
// because github could change their api and our code wouldn't reflect it

export const mapGithubData = (data: any[]): RepositoryData[] => {
  console.log(data);
  return data.map((item) => ({
    owner: item.owner.login,
    repo: item.name,
  }));
};
