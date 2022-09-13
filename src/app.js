const http = require('http')
const db = require('./db.js')
const express = require('express')
const es6Renderer = require('express-es6-template-engine')

const app = express()
const server = http.createServer(app);
const hostname = '127.0.0.1'
const port = 3000;

app.engine('html', es6Renderer)
app.set('views', 'templates')
app.set('view engine', 'html')


app.get('/', (req, res) => {
	console.log("home");
	res.render('home', {
		locals: {
			title: 'Home'
		},
		partials: {
			head: '/partials/head'
		}
	})
})

app.get('/ceos', (req, res) => {
	res.render('ceo-list', {
		locals: {
			title: 'Apple CEO\'s',
			ceoList: db,
			path: req.path
		},
		partials: {
			head: '/partials/head'
		}
	})
})

app.get('/ceos/:slug', (req,res) => {
	const { slug } = req.params;
	const ceo = db.find(c => c.slug === slug);
	console.log(ceo);
	if(ceo){
		res.render('ceo-details', {
			locals:{
				title: ceo.name,
				ceo
			}
			// thorws promise err?
			// partials: { 
			// 	head: 'template/partials/haed'
			// }
		});
	}
	else{
		res.status(404).send(`no ceo with that slag`)
	}

})

server.listen(port, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
})