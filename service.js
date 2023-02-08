const express = require('express')
const app = express()
const port = 5000
const salaryData = require('./src/data/salary.json')

app.get('/', (req, res) => {
    if (req.query.title) {
        res.send(salaryData.filter(data => data.Title.toLowerCase().includes(req.query.title.toLowerCase())))
    } else if (req.query.salary) {
        res.send(salaryData.filter(data => (parseInt(req.query.salary) <= parseInt(data.Annual.replace(/,/g, '')) + 5000) && parseInt(req.query.salary) >= parseInt(data.Annual.replace(/,/g, '')) - 5000))

    } else {
        res.send(salaryData)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})