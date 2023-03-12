import { useState, useEffect } from "react";
import jobs from "./data/salary.json"
import InputLabel from "@mui/material/InputLabel";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TextField from "@mui/material/TextField";
import TableHead from '@mui/material/TableHead';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import { red } from "@mui/material/colors";
import { fontSize, style } from "@mui/system";

function App() {

  const [search, setSearch] = useState("")
  const [filterBy, setFilterBy] = useState({value: 'name'})
  const [jobFilter, setJobFilters] = useState(jobs)
  const [costOfLiving, setCostOfLiving] = useState(0)
  const [visible, setVisible] = useState("hidden")

  // Calls Microservice to get data 
  const serviceURL = "http://localhost:4000/laCol"
  async function getCostOfLiving() {
    let jsonResponse = await fetch(serviceURL).then(response => response.json()).catch(console.log("Data Failed to Load"))
    let monthTotal = jsonResponse[1]["Cost of Living Month Total"]
    let oneBedroom = jsonResponse[1]["Rent Per Month prices"][0]["Value"]
    setCostOfLiving(parseInt(monthTotal.replace(/,/g, '')) + parseInt(oneBedroom.replace(/,/g, '')))
  }
  useEffect(() => {
    getCostOfLiving()
    }
  , [])

  function onChangeSearch(event) {
    setSearch(event.target.value)
  }

  function onChangeFilterBy(event) {
    setFilterBy({value: event.target.value})
  }


  useEffect(() => {
    let tempData = jobs
    if (filterBy.value === 'name') {
      tempData = tempData.filter(job => job.Title.toLowerCase().includes(search.toLowerCase())).sort((a,b ) => a.Title - b.Title)
    } else if (filterBy.value === 'income' && isNaN(search)) {
      // Value is searching for an income, but the search field is not a number
      setSearch("")
      setVisible("visible")
      setTimeout(() => {
        setVisible("hidden")}, 2500
      )
    } else {
      // job.Annual.replace(",", "") - 5000 <= search || search >= job.Annual.replace(",", "") + 5000
      tempData = tempData.filter(job => parseInt(job.Annual.replace(",", "")) >= parseInt(search)).sort((a, b) => parseInt(a.Annual.replace(",", "")) - parseInt(b.Annual.replace(",", "")))
    }
    setJobFilters(tempData)
  
  }, [search, filterBy])

  // Base URL to present to user
  var baseURL = "https://www.bls.gov/oes/current/oes_nat.htm"

  return (
    <div className="App">
      <header className="App-header">
        <h1>Income Search App</h1>
        <form>
          <InputLabel>Filter By</InputLabel>
          <Select onChange={onChangeFilterBy} value={filterBy.value}>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="income">Income</MenuItem>
          </Select>

          <TextField label="Search Term*" value={search} onChange={onChangeSearch}/>
          <p style={{visibility: `${visible}`}}>The value entered was not valid</p>
        </form>
          <br/>
          <h3>Usage</h3>
          <p>This project expands on the BLS gov site by allowing better searching through income or a job title search. Income search will yield any salary that exceed the values</p>
          <h3>About</h3>
          <p>
          Data used from this website is pulled directly from the <b>US Bureau of Labor Statistics May 2021 Report ({baseURL})</b>. 
          </p>
          <p>
          Percentage of income is a reflection of the annual cost of living in Los Angeles with rent for a one bedroom apartment in city centre.
          </p>
          <br/>
        <TableContainer className="Table">
          <Table>
            <TableHead className="Header">
                <TableCell >Job Title</TableCell>
                <TableCell>Annual Mean Wage</TableCell>
                <TableCell>Percentage of Income</TableCell>
                <TableCell>Median Hourly Wage</TableCell>
                <TableCell>Mean Hourly Wage</TableCell>
                <TableCell>Employment per 1,000</TableCell>
            </TableHead>
            <TableBody>
                {
                  jobFilter.map(row => {
                    return <TableRow key={row.Code} className="Row">
                      <TableCell onClick={() => alert("You are navigating away from this site and onto the BLS gov site.")}>
                          <a href={`https://www.bls.gov/oes/current/oes${row.Code}.htm`}> {row.Title} </a>
                      </TableCell>
                      <TableCell>${row.Annual}</TableCell>
                      <TableCell>{costOfLiving ? (costOfLiving*12/parseInt(row.Annual.replace(/,/g, ''))).toFixed(2) + "%" : "N/A"}</TableCell>
                      <TableCell>${row.Median}</TableCell>
                      <TableCell>${row.Mean}</TableCell>
                      <TableCell>${row.EmploymentPer1000}</TableCell>
                    </TableRow>
                  }
                  )
                }
            </TableBody>
          </Table>
        </TableContainer>
      </header>
    </div>
  );
}

export default App;
