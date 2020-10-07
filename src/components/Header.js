import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "../App.css";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  appBarBG: {
    backgroundColor: "#370617",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBarBG}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Coronavirus (COVID-19) Tracker by{" "}
            <a
              href="https://www.github.com/arifzayn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Arif Zain
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
