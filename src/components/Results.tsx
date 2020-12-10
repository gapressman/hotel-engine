import {
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { SearchRepositoryData } from "../service/api";
import { ApiContent } from "../types/ApiContent";

interface ResultsProps {
  repos: SearchRepositoryData[];
}

export const Results: React.FC<ResultsProps> = ({ repos }) => {
  return (
    <List>
      {repos.map(({ owner, repo }) => (
        <ListItem key={repo + owner}>
          <Link to={`/repositories/${owner}/${repo}`}>
            <Typography>{repo}</Typography>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};
