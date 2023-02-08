import { useState, useEffect } from "react";
import states from "./data/stateAbb.json"
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

function App() {

  const [search, setSearch] = useState("")
  const [filterBy, setFilterBy] = useState({value: 'name'})
  const [filterState, setfilterState] = useState({value: `CA`})
  const [jobFilter, setJobFilters] = useState(jobs)

  function onChangeSearch(event) {
    setSearch(event.target.value)
  }

  function onChangeFilterBy(event) {
    setFilterBy({value: event.target.value})
  }

  function onChangeFilterState(event) {
    setfilterState({value: event.target.value})
  }


  useEffect(() => {
    let tempData = jobs
    if (filterBy.value === 'name') {
      tempData = tempData.filter(job => job.Title.toLowerCase().includes(search.toLowerCase()))
    } else if (filterBy.value === 'income' && isNaN(search)) {
      // Value is searching for an income, but the search field is not a number
      alert("Enter a number if searching by Income")
    } else {
      // job.Annual.replace(",", "") - 5000 <= search || search >= job.Annual.replace(",", "") + 5000
      tempData = tempData.filter(job => parseInt(job.Annual.replace(",", "")) >= parseInt(search))
    }
    setJobFilters(tempData)
  
  }, [search, filterBy, filterState])

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

          <TextField label="Search Term*" onChange={onChangeSearch}/>

          <InputLabel>Select A State</InputLabel>
          <Select onChange={onChangeFilterState} value={filterState.value}>
              {states.map(state => 
                    <MenuItem value={state.Abbreviations} key={state.Abbreviations}>{state.Name}</MenuItem>
                )}
          </Select>

        </form>
          Data used from this website is pulled directly from the US Bureau of Labor Statistics May 2021 Report (https://www.bls.gov/oes/current/oes_nat.htm). This project expands on the BLS gov site by allowing better searching through income or a job title search.
          Note: This data is from the May 2021 Report and may not be up to date
        <TableContainer>
          <Table>
            <TableHead>
                <TableCell>Job Title</TableCell>
                <TableCell>Annual Mean Wage</TableCell>
                <TableCell>Percentage of Income</TableCell>
                <TableCell>Median Hourly Wage</TableCell>
                <TableCell>Mean Hourly Wage</TableCell>
                <TableCell>Employment per 1,000</TableCell>
            </TableHead>
            <TableBody>
                {
                  jobFilter.map(row => {
                    return <TableRow key={row.Code}>
                      <TableCell onClick={() => alert("You are navigating away from this site and onto the BLS gov site.")}>
                          <a href={`https://www.bls.gov/oes/current/oes${row.Code}.htm`}> {row.Title} </a>
                      </TableCell>
                      <TableCell>${row.Annual}</TableCell>
                      <TableCell>N/A</TableCell>
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
