import { Box, CircularProgress } from "@material-ui/core";
import React from "react";
import { ContentStatuses } from "../types/ContentStatus";

export interface ContentSwitchProps {
  LoadingView?: JSX.Element;
  ErrorView: JSX.Element;
  children: JSX.Element;
  status: ContentStatuses;
}

const DefaultLoadingView = () => (
  <Box data-testid="loading-view" textAlign="center">
    <CircularProgress />
  </Box>
);

export const ContentSwitch: React.FC<ContentSwitchProps> = (props) => {
  const {
    LoadingView = DefaultLoadingView(),
    ErrorView,
    children,
    status,
  } = props;

  if (status === ContentStatuses.ERROR) {
    return ErrorView;
  }

  if (status === ContentStatuses.LOADING) {
    return LoadingView;
  }

  return children;
};
