import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { api, SearchRepositoryData } from "../service/api";
import { ApiContent } from "../types/ApiContent";
import { ContentStatuses } from "../types/ContentStatus";
import { ContentSwitch } from "./ContentSwitch";
import { Results } from "./Results";

const sortOptions = [
  {
    label: "Best Match",
    value: "best-match",
  },
  {
    label: "Stars",
    value: "stars",
  },
];

const ErrorView = () => (
  <Typography>
    There was an error, repositories cannot be displayed at this time.
  </Typography>
);

export const Search = () => {
  const [repos, setRepos] = useState<ApiContent<SearchRepositoryData[]>>({
    contentStatus: ContentStatuses.SUCCESS,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [sort, setSort] = useState(sortOptions[0].value);

  const { data = [], contentStatus } = repos;
  
  //pass in params to ensure state is updated before call is made
  const callGetRepositories = async (searchTerm: string, sort: string) => {
    setRepos({ contentStatus: ContentStatuses.LOADING });

    const response = await api.getRepositoriesBySearchTerm(searchTerm, sort);

    setRepos(response);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<{ value: any }>) => {
    const { value } = e.target;

    setSort(value);
    if (data) {
      callGetRepositories(searchTerm, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    callGetRepositories(searchTerm, sort);
  };

  const languages = new Set();

  data.forEach((repo) => languages.add(repo.language));
  const languagesArray = [...languages] as string[];

  // Thought about putting a use memo here, but it needs data in the dependency array which would always end up falsy
  // There's potential to write custom deep effect hook, but not with the time contraint I have for this exercise.
  const filteredRepos = selectedLanguage
    ? data.filter((repo) => repo.language === selectedLanguage)
    : data;

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box textAlign="center" marginTop={10}>
        <Grid container justify="center">
          <Grid item xs={10} md={6}>
            <Grid container justify="space-between" spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search Github"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Select
                  variant="outlined"
                  value={sort}
                  onChange={handleSort}
                  fullWidth
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Sort Repos</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Button
                  style={{ height: "100%" }}
                  fullWidth
                  variant="contained"
                  disabled={!searchTerm}
                  type="submit"
                >
                  Search
                </Button>
              </Grid>
            </Grid>
            <Box marginTop={3}>
              <Grid container item>
                <Select
                  disabled={languagesArray.length === 0}
                  variant="outlined"
                  displayEmpty
                  fullWidth
                  value={selectedLanguage}
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Filter Language
                  </MenuItem>
                  {languagesArray.map((language) => (
                    <MenuItem key={language} selected value={language}>
                      {language}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Box>
            <ContentSwitch status={contentStatus} ErrorView={<ErrorView />}>
              <Results repos={filteredRepos} />
            </ContentSwitch>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
