import React from "react";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const MeetingList = () => {
  return (
    <Box sx={{ mt: "3rem" }}>
      <Typography variant="body1">Meeting 1</Typography>
      <Typography variant="body1">Meeting 2</Typography>
      <Typography variant="body1">Meeting 3</Typography>
    </Box>
  );
};

export default MeetingList;
