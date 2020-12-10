import { mapGithubData } from "../mapGithubData";

describe("mapGithubData", () => {
  it("given data is passed in, mapGithubData should map it to array of objects with only expected properties", () => {
    const mockResponse = [
      {
        owner: { login: "foo" },
        name: "bar",
        favoriteColor: "invisible",
        language: "javascript",
      },
      {
        owner: { login: "bat" },
        name: "biz",
        language: "haskell",
      },
    ];

    expect(mapGithubData(mockResponse)).toEqual([
      { owner: "foo", repo: "bar", language: "javascript" },
      { owner: "bat", repo: "biz", language: "haskell" },
    ]);
  });
});
