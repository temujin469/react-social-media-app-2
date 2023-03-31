import { Paper } from "@mui/material";

const WidgetWrapper = ({
  noRounded,
  children,
  mb = "1rem",
  padding = "1rem",
  elevation = 1,
}) => {
  return (
    <Paper
      elevation={elevation}
      sx={(theme) => ({
        padding: padding,
        backgroundColor: theme.palette.background.alt,
        borderRadius: noRounded ? "0" : "0.50rem",
        marginBottom: mb,
      })}
    >
      {children}
    </Paper>
  );
};

export default WidgetWrapper;
