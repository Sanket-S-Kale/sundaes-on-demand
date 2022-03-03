import React, { FunctionComponent } from "react";

import Alert from "react-bootstrap/Alert";

type AlertBannerProps = {
  message?: string;
  variant?: string;
};

const AlertBanner: FunctionComponent<AlertBannerProps> = (props) => {
  const { message, variant } = props;
  return <Alert variant={variant}>{message}</Alert>;
};

AlertBanner.defaultProps = {
  message: "An unexpected error occurred. Please try again later.",
  variant: "danger",
};

export default AlertBanner;
