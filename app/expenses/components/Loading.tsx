import React from "react";
import PropTypes from "prop-types";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "" }) => (
  <Box
    mt={3}
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
  >
    <CircularProgress />
    <Box mt={3}>
      <Typography>{message || "Carregando..."}</Typography>
    </Box>
  </Box>
);

Loading.propTypes = {
  message: PropTypes.string,
};



export default Loading;
