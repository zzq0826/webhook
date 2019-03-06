const express = require('express')
const app = express()
var exec = require("shelljs").exec;
var bodyParser = require('body-parser');
const env = process.env.NODE_ENV

app.post('/bermi_website', bodyParser.json(), (req, res) => {
      if(env === 'production' && req.body.push_data.tag.indexOf('dev') < 0) {
        exec(`sudo docker pull ${req.body.repository.repo_name}:${req.body.push_data.tag} &&
          sudo docker stop bermi_website &&
          sudo docker run --rm -d --name bermi_website -p 8085:8085 ${req.body.repository.repo_name}:${req.body.push_data.tag}`
        ,function (err, out, code) {})
      } else if(env === 'development' && req.body.push_data.tag.indexOf('dev') > 0) {
        exec(`sudo docker pull ${req.body.repository.repo_name}:${req.body.push_data.tag} &&
          sudo docker stop bermi_website &&
          sudo docker run --rm -d --name bermi_website -p 8085:8085 ${req.body.repository.repo_name}:${req.body.push_data.tag}`
        ,function (err, out, code) {})
      }
})

app.get('/test', (req, res) => {
    res.send(env)
})

app.listen(3000, () => console.log('app listening on port 3000!'))