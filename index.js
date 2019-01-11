const express = require('express')
const app = express()
var exec = require("shelljs").exec;
var bodyParser = require('body-parser');


app.post('/bermi_website', bodyParser.json(), (req, res) => {
    exec(`sudo docker pull ${req.body.repository.repo_name}:${req.body.push_data.tag} &&
          docker rm $(docker stop bermi_website) &&
          docker run -d --name bermi_website -p 8085:8085 ${req.body.repository.repo_name}:${req.body.push_data.tag}`
        ,function (err, out, code) {})
})

app.get('/test', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('app listening on port 3000!'))