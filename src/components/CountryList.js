import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import GlobalData from "./GlobalData";
import { FormControl, NativeSelect } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(100),
      height: theme.spacing(30),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CountryList() {
  const classes = useStyles();

  const [fetchedCountries, setFetchedCountries] = useState();
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

  // console.log(
  //   fetchedCountries.countries && fetchedCountries.countries[20].name
  // );

  // console.log(
  //   fetchedCountries &&
  //     fetchedCountries.countryitems[0] &&
  //     fetchedCountries.countryitems[20].name
  // );

  return (
    <div className={classes.root}>
      <GlobalData />
      <Paper>
        <Typography variant="h2" gutterBottom>
          Select Country
        </Typography>

        <FormControl className={classes.formControl}>
          {isLoading ? (
            "Loading"
          ) : (
            <NativeSelect
              defaultValue="PK"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="global">Global</option>
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
    </div>
  );
}
