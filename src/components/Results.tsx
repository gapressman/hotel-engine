import { Divider, List, ListItem, Typography } from "@material-ui/core";
import React from "react";
import { RepositoryData } from "../service/api";
import { ApiContent } from "../types/ApiContent";
import { ContentStatuses } from "../types/ContentStatus";

interface ResultsProps {
  repos: ApiContent<RepositoryData[]>;
}

export const Results: React.FC<ResultsProps> = ({ repos }) => {
  const {contentStatus, data = []} = repos

  if (contentStatus === ContentStatuses.ERROR){
    <Typography>There was an error, repositories cannot be displayed at this time.</Typography>
  }

  return (
    <List>
      {data.map(({ owner, repo }) => (
        <ListItem key={repo + owner}>
          <Typography>{repo}</Typography>
          <Divider />
        </ListItem>
      ))}
    </List>
  );
};
