import { ContentSwitch } from "../ContentSwitch";
import React from "react";
import { ContentStatuses } from "../../types/ContentStatus";
import { render } from "@testing-library/react";

const setup = (overrides: any = {}) => {
  const ErrorView = <div>Error</div>;
  const children = <div>Success</div>;
  const status = ContentStatuses.ERROR;

  const props = {
    ErrorView,
    status,
    ...overrides,
  };

  return render(<ContentSwitch {...props}>{children}</ContentSwitch>);
};

describe("ContentSwitch", () => {
  it("given status is error, error view should be visible", () => {
    const { getByText } = setup();

    expect(getByText("Error")).toBeInTheDocument();
  });

  it("given status is success, success view should be visible", () => {
    const { getByText } = setup({ status: ContentStatuses.SUCCESS });

    expect(getByText("Success")).toBeInTheDocument();
  });

  it("given status is loading and no loading component is passed in, default loader should be visible", () => {
    const { getByTestId } = setup({ status: ContentStatuses.LOADING });

    expect(getByTestId("loading-view")).toBeInTheDocument();
  });

  it("given status is loading and loading component is passed in loading component visible", () => {
    const { getByText } = setup({
      status: ContentStatuses.LOADING,
      LoadingView: <div>Loading</div>,
    });

    expect(getByText("Loading")).toBeInTheDocument();
  });
});
