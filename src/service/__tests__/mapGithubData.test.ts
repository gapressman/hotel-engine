import { mapGithubData } from "../mapGithubData";

describe("mapGithubData", () => {
  it("given data is passed in, mapGithubData should map it to array of objects with only expected properties", () => {
    const mockResponse = [
      {
        owner: { login: "foo" },
        name: "bar",
        favoriteColor: "invisible",
      },
      {
        owner: { login: "bat" },
        name: "biz",
      },
    ];

    expect(mapGithubData(mockResponse)).toEqual([
      { owner: "foo", repo: "bar" },
      { owner: "bat", repo: "biz" },
    ]);
  });
});
