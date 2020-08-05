import React, {useState, useEffect} from 'react';
import { MenuItem, Select, FormControl, Card, CardContent } from "@material-ui/core";
import './App.css';
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import {sortData} from "./util";
import LineGraph from './LineGraph'
import numeral from "numeral"

const App = () => {
    const [countries, setCountries] = useState([]);
    const [country, setInputCountry] = useState('worldwide')
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] =useState([]);
    const [casesType, setCasesType] = useState('cases');

useEffect(() => {
  fetch("https://disease.sh/v3/covid-19/all")
  .then(response => response.json())
  .then(data => {
    setCountryInfo(data);
  });
}, []);
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
      const countries = data.map((country) => ({      
        name: country.country,
        value: country.countryInfo.iso2
      }));

      let sorteData = sortData(data);
      setTableData(sorteData);

      //setMapCountries(data);

      setCountries(countries);
    });
  };

  getCountriesData();
}, []);

const onCountryChange = async (event) => {
  const countryCode = event.target.value;


  const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : 
  `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  await fetch(url)
  .then(response => response.json())
  .then(data => {
    setInputCountry(countryCode);

    //All of the data from the counrty response
    setCountryInfo(data);
  });


  //https://disease.sh/v3/covid-19/all
  //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
};

  return (
    <div className="app">
      <div className="app_left">
      <div className="app_header">
        <h1> Covid-19 Tracker</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
          <MenuItem value="worldwide">Worldwide</MenuItem>

{/*Loop through the countries and show a dropdown list of options*/}
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>

            ))}

          </Select>

        </FormControl>

      </div>

      <div className="app_stats">
        <InfoBox 
           onClick={(e) => setCasesType("cases")}
           title="Coronavirus Cases"
           isRed
           active={casesType === "cases"}
           cases={countryInfo.todayCases}
           total={numeral(countryInfo.cases).format("0.0a")}>Cases</InfoBox>


          <InfoBox
          onClick={(e) => setCasesType("recovered")}
          title="Recovered"
          active={casesType === "recovered"}
          cases={countryInfo.todayRecovered}
          total={numeral(countryInfo.recovered).format("0.0a")}>Recovered</InfoBox>
          
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={countryInfo.todayDeaths}
            total={numeral(countryInfo.deaths).format("0.0a")}>Deaths</InfoBox>
      </div>

      <Map/>
      </div>  

      <Card className="app_right">
        <CardContent>
          <div className="app_infomation">
          <h3>Live Cases by Country</h3>
               <Table countries={tableData}/> 
            <h3>Worldwide new {casesType}</h3>
          <LineGraph casesType={casesType}/>
          </div>
        </CardContent>       
        </Card>  
    </div>
  );
}


export default App;
