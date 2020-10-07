import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chart from "./Chart";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(2),
      width: theme.spacing(30),
      height: theme.spacing(20),
      padding: theme.spacing(2),
      backgroundColor: "#fff1e6",
      border: "1px solid #cb997e",
      borderRadius: "35px",
    },
    justifyContent: "space-around",
    backgroundColor: "#eddcd2",
  },
}));

const useStylesTypography = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
  },
});

export default function GlobalData({ country }) {
  const classes = useStyles();
  const classTypography = useStylesTypography();

  const [globalData, setGlobalData] = useState();
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    async function fetchGlobalData() {
      setDataLoading(true);
      const url = `https://covid19.mathdro.id/api/countries/${country}`;
      const apiResponse = await fetch(url);
      const apiData = await apiResponse.json();
      setGlobalData(apiData);
      setDataLoading(false);
    }
    fetchGlobalData();
  }, [country]);

  return (
    <div className={classes.root}>
      <Paper>
        <div className={classTypography.root}>
          <Typography variant="subtitle2" gutterBottom>
            Total Cases
          </Typography>
          <Typography variant="h3" gutterBottom>
            {dataLoading ? (
              <CircularProgress color="secondary" />
            ) : (
              globalData &&
              globalData.confirmed &&
              globalData.confirmed.value.toLocaleString()
            )}
          </Typography>
        </div>
      </Paper>
      <Paper>
        <div className={classTypography.root} style={{ color: "green" }}>
          <Typography variant="subtitle2" gutterBottom>
            Recovered
          </Typography>
          <Typography variant="h3" gutterBottom>
            {dataLoading ? (
              <CircularProgress color="secondary" />
            ) : (
              globalData &&
              globalData.recovered &&
              globalData.recovered.value.toLocaleString()
            )}
          </Typography>
        </div>
      </Paper>
      <Paper>
        <div className={classTypography.root} style={{ color: "#d90429" }}>
          <Typography variant="subtitle2" gutterBottom>
            Deaths
          </Typography>
          <Typography variant="h3" gutterBottom>
            {dataLoading ? (
              <CircularProgress color="secondary" />
            ) : (
              globalData &&
              globalData.deaths &&
              globalData.deaths.value.toLocaleString()
            )}
          </Typography>
        </div>
      </Paper>
      <Paper>
        <Chart d={globalData} />
      </Paper>
    </div>
  );
}
