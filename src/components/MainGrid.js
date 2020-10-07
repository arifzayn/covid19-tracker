import React, { useEffect, useState } from "react";
import { FormControl, makeStyles, NativeSelect } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import GlobalData from "./GlobalData";

const useStyle = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  paper: {
    padding: theme.spacing(8),
    backgroundColor: "#eddcd2",
    textAlign: "center",
    color: theme.palette.text.primary,
  },
}));

export default function MainGrid() {
  const classes = useStyle();

  const [fetchedCountries, setFetchedCountries] = useState();
  const [country, setCountry] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchedCountries() {
      setIsLoading(true);
      const apiResponse = await fetch(
        "https://covid19.mathdro.id/api/countries"
      );

      const apiData = await apiResponse.json();
      setFetchedCountries(apiData);
      setIsLoading(false);
    }

    fetchedCountries();
  }, [setFetchedCountries]);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <FormControl className={classes.formControl}>
              {isLoading ? (
                "Loading"
              ) : (
                <NativeSelect
                  defaultValue="PK"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Select Country</option>
                  {fetchedCountries &&
                    fetchedCountries.countries &&
                    fetchedCountries.countries.map((country, id) => (
                      <option key={id} value={country.iso2}>
                        {country.name}
                      </option>
                    ))}
                </NativeSelect>
              )}
            </FormControl>
          </Paper>
          <Paper className={classes.paper} elevation={5}>
            <GlobalData country={country} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
