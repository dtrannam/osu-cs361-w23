import { useState } from "react";
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

  const [search, setSearch] = useState({value: ""})
  const [filterBy, setFilterBy] = useState({value: 'name'})
  const [filterState, setfilterState] = useState({value: `CA`})

  function onChangeSearch(event) {
    setSearch(event.target.value)
    console.log(search)
  }

  function onChangeFilterBy(event) {
    setFilterBy({value: event.target.value})
  }

  function onChangeFilterState(event) {
    setfilterState({value: event.target.value})
  }

  var baseURL = "https://www.bls.gov/oes/current/oes_nat.htm"

  return (
    <div className="App">
      <header className="App-header">
        <h1>My App Name</h1>
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
                  jobs.map(row => {
                    return <TableRow key={row.Code}>
                      <TableCell>
                          <a href={`https://www.bls.gov/oes/current/oes${row.Code}.htm`}> {row.Title} </a>
                      </TableCell>
                      <TableCell>{row.Annual}</TableCell>
                      <TableCell>Value for Later</TableCell>
                      <TableCell>{row.Median}</TableCell>
                      <TableCell>{row.Mean}</TableCell>
                      <TableCell>{row.Annual}</TableCell>
                      <TableCell>{row.EmploymentPer1000}</TableCell>
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
