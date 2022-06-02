import { Grid } from "@mui/material";

const Container = (props) => {
  return <Grid sx={{ mt: "12rem" }}>{props.children}</Grid>;
};

export default Container;
