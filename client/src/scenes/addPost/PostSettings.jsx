import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Switch,
  useMediaQuery,
} from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";
import PublicIcon from "@mui/icons-material/Public";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

function PostSettings() {
  const xs = useMediaQuery("(min-width:600px)");
  const [checked, setChecked] = React.useState(["wifi"]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div>
      <WidgetWrapper noRounded={!xs} elevation={xs ? 1 : 0}>
        <List subheader={<ListSubheader>Тохиргоо</ListSubheader>}>
          <ListItem>
            <ListItemIcon>
              <PublicIcon />
            </ListItemIcon>
            <ListItemText
              id="switch-list-label-wifi"
              primary="Олон нийтэд харуулах"
            />
            <Switch
              edge="end"
              onChange={handleToggle("wifi")}
              checked={checked.indexOf("wifi") !== -1}
              inputProps={{
                "aria-labelledby": "switch-list-label-wifi",
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HealthAndSafetyIcon />
            </ListItemIcon>
            <ListItemText
              id="switch-list-label-bluetooth"
              primary="Өөрийгөө нууцлах"
            />
            <Switch
              edge="end"
              onChange={handleToggle("bluetooth")}
              checked={checked.indexOf("bluetooth") !== -1}
              inputProps={{
                "aria-labelledby": "switch-list-label-bluetooth",
              }}
            />
          </ListItem>
        </List>
      </WidgetWrapper>
    </div>
  );
}

export default PostSettings;
