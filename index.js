const express = require('express')
const app = express()
var exec = require("shelljs").exec;
var bodyParser = require('body-parser');
const delay = process.env.DELAY

console.log(delay)

app.post('/bermi_website', bodyParser.json(), (req, res) => {
    setTimeout(()=>{
      exec(`sudo docker pull ${req.body.repository.repo_name}:${req.body.push_data.tag} &&
          sudo docker rm $(sudo docker stop bermi_website) &&
          sudo docker run -d --name bermi_website -p 8085:8085 ${req.body.repository.repo_name}:${req.body.push_data.tag}`
        ,function (err, out, code) {})
    }, delay)
})

app.get('/test', (req, res) => {
  setTimeout(()=>{
    res.send('Hello World!!!')
  }, delay)
})

app.listen(3000, () => console.log('app listening on port 3000!'))