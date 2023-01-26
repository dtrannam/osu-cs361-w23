import { useState } from "react";
import states from "./data/stateAbb.json"
import jobs from "./data/salary.json"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function App() {

  const [search, setSearch] = useState("")

  function onChangeSearch(event) {
    setSearch(event.target.value)
    console.log(search)
  }

  var baseURL = "https://www.bls.gov/oes/current/oes_nat.htm"

  return (
    <div className="App">
      <header className="App-header">
        <h1>My App Name</h1>
        <form>
          Search By:
          <select>
              <option value="name">Name</option>
              <option value="income">Income</option>
          </select>
          <br/>
          Search By State:
          <select>
              {states.map(state => 
                    <option value={state.Abbreviations} key={state.Abbreviations}>{state.Name}</option>
                )}
          </select>
          <br/>
          Value: 
        <input type="text"  id="searchValue" name="searchValue" onChange={onChangeSearch}/>
        </form>
        <TableContainer>
          <Table>
            <TableHead>
                <TableCell>Job Title</TableCell>
                <TableCell>Annual Mean Wage</TableCell>
                <TableCell>Percentage of Income</TableCell>
                <TableCell>Employment per 1,000</TableCell>
                <TableCell>Median Hourly Wage</TableCell>
                <TableCell>Mean Hourly Wage</TableCell>
            </TableHead>
            <TableBody>
                {
                  jobs.map(row => (
                    <TableRow key={row.Code}>
                      <TableCell>
                          <a href={`https://www.bls.gov/oes/current/oes${row.Code}.htm`}> {row.Title} </a>
                      </TableCell>
                      <TableCell>Value for Later</TableCell>
                      <TableCell>{row.EmploymentPer1000}</TableCell>
                      <TableCell>{row.Median}</TableCell>
                      <TableCell>{row.Mean}</TableCell>
                      <TableCell>{row.Annual}</TableCell>
                    </TableRow>
                  ))
                }
            </TableBody>
          </Table>
        </TableContainer>
      </header>
    </div>
  );
}

export default App;
