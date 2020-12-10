import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";
import { ContentSwitch } from "./ContentSwitch";
import { Skeleton } from "@material-ui/lab";
import { api, RepositoryDetails } from "../service/api";
import { ApiContent } from "../types/ApiContent";
import { ContentStatuses } from "../types/ContentStatus";
import GitHubIcon from "@material-ui/icons/GitHub";

interface RepositoryParams {
  owner: string;
  repo: string;
}

const LoadingView = () => (
  <Box marginTop="50px">
    <Grid container justify="center">
      <Grid item xs={10} md={6} justify="center">
        <Skeleton height={100} variant="rect" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </Grid>
    </Grid>
  </Box>
);

const ErrorView = () => (
  <Box marginTop={10} textAlign="center">
    <Typography>Repository could not be displayed at this time.</Typography>
  </Box>
);

export const Repository = () => {
  const { owner, repo } = useParams<RepositoryParams>();
  const [repository, setContent] = useState<ApiContent<RepositoryDetails>>({
    contentStatus: ContentStatuses.LOADING,
  });

  useEffect(() => {
    //Begrudingly using .then() syntax because useEffects callback doesn't like async
    api.getRepo(owner, repo).then((response) => {
      setContent(response);
    });
  }, [owner, repo]);

  const { contentStatus, data } = repository;

  return (
    <ContentSwitch
      LoadingView={<LoadingView />}
      status={contentStatus}
      ErrorView={<ErrorView />}
    >
      <Box marginTop={10}>
        <Grid container justify="center">
          <Grid item xs={10} md={6} container direction="column">
            <Card variant="outlined">
              <CardContent>
                <Grid container>
                  <Grid container justify="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" flexDirection="row">
                      <GitHubIcon />
                      <Typography variant="h4">
                        {repo}/{owner}
                      </Typography>
                    </Box>
                    <Box display="flex" flexDirection="row">
                      <Typography>{data?.stars}</Typography>
                      <StarIcon />
                    </Box>
                  </Grid>
                  <Grid container>
                    <Typography>{data?.description}</Typography>
                  </Grid>
                  <Grid>
                    <Typography>{data?.language}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ContentSwitch>
  );
};
