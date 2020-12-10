import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { api, RepositoryData } from "../service/api";
import { ApiContent } from "../types/ApiContent";
import { ContentStatuses } from "../types/ContentStatus";
import { Results } from "./Results";

export const Search = () => {
  const [repos, setRepos] = useState<ApiContent<RepositoryData[]>>({
    contentStatus: ContentStatuses.SUCCESS,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setRepos({ contentStatus: ContentStatuses.LOADING });

    const response = await api.getRepositoriesBySearchTerm(searchTerm);

    setRepos(response);
  };

  console.log(repos);
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
                <Select variant="outlined" fullWidth>
                  <MenuItem>Best Match</MenuItem>
                  <MenuItem>Stars</MenuItem>
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
            <Results repos={repos} />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
