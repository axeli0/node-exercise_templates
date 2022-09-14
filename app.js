const http = require('http')
const db = require('./src/db.js')
const express = require('express')
const es6Renderer = require('express-es6-template-engine')

const app = express()
const server = http.createServer(app);
const hostname = '127.0.0.1'
const port = 3000;

app.set('view engine', 'ejs')


app.get('/', (req, res) => {
	res.render('home')
})

app.get('/ceos', (req, res) => {
	res.render('ceo-list', {
		ceoList: db,
		path: req.path
	})
})

app.get('/ceos/:slug', (req,res) => {
	const { slug } = req.params;
	const ceo = db.find(c => c.slug === slug);
	if(ceo){
		res.render('ceo-details',{ceo});
	}
	else{
		res.status(404).send(`no ceo with that slag`)
	}

})

server.listen(port, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
})