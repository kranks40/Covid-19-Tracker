import React, {useState, useEffect} from 'react';
import { MenuItem, Select, FormControl } from "@material-ui/core";
import './App.css';
import Infobox from "./InfoBox";

function App() {
const [countries, setCountries] = useState([]);
const [country, setCountry] = useState('Worldwide')
//A state is to write a variable in react
//Api address https://disease.sh/v3/covid-19/countries
//Useeffect = Runs a piece of code based on a given condition

useEffect(() => {
  //The code inside here will run once when the component 
  //loads and not again
  // async = send a request, wait fir it then do something with it

  const getCountriesData = async () => {
    await fetch('https://disease.sh/v3/covid-19/countries')
    .then((response) => response.json())
    .then((data) => {
      const countries = data.map((country) => (
      {
        names: country.country,
        value: country.countryInfo.iso2
      }
      ));

      setCountries(countries);
    })
  };

  getCountriesData();
}, []);

const onCountryChange = async (event) => {
  const countryCode = event.target.value;

  setCountry(countryCode);
};

  return (
    <div className="app">
      <div className="app_header">
        <h1> Covid-19 Tracker</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
          <MenuItem value="worldwide">Worldwide</MenuItem>

{/*Loop through the countries and show a dropdown list of options*/}
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.names}</MenuItem>

            ))}

          </Select>

        </FormControl>

      </div>

      <div className="app_stats">
        <Infobox title='Caronavirus Cases ' cases={123} total={2000}/>
        <Infobox title='Recovered ' cases={1234} total={3000}/>
        <Infobox title='Deaths ' cases={12345} total='4000'/>
      </div>


      {/*Header*/}
      {/*Title + Select input dprodown field */}

     

      {/*Table */}
      {/*Graph */}

      {/*Map */}

    </div>
  );
}

export default App;
