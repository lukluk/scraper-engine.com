var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const fs =  require('fs')
const Handlebars = require('handlebars')
var session = require('express-session')

app.use(session({ secret: 'love3', cookie: { maxAge: 60000 }}))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.post('/save/script/:script', function(req, res){
	req.session.user=true
	var code=req.body.code+''
  code=code.replace(new RegExp('require', 'g'), 'console.log')
	fs.writeFileSync('scripts/users/'+req.params.script+'.js', code)
	res.send(code)
})

function renderHTML(req,res){
	var file=req.params.file?req.params.file:'index'
	var template = Handlebars.compile(fs.readFileSync('views/'+file+'.html','utf-8'))
  var data={}
  data.api='http://scraper-engine.com:8000'
  data.id=req.session.id
  data.site=req.query.site?req.query.site:'default'
  if(!req.session.user || !fs.existsSync('scripts/users/'+data.site+'-'+req.session.id+'.js')){
  	data.code=fs.readFileSync('scripts/'+data.site+'.js','utf-8')
  }else{
  	data.code=fs.readFileSync('scripts/users/'+data.site+'-'+req.session.id+'.js','utf-8')
  }
  res.send(template(data))
}

app.get('/',renderHTML)
app.get('/:file.html',renderHTML)

app.listen(80);
