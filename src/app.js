const path = require('path')
const express = require('express')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const hbs=require('hbs')
const { response } = require('express')
const app = express()

// console.log(__dirname)
// console.log(__filename)
console.log(path.join(__dirname, '../public'))


//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup hndlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Mariyambi'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        author: 'Mariyambi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        author: 'Mariyambi'
    })
})




// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Mariyam'
//     },{
//         name:'Riyan'
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h2>HEY MARIYAM</h2>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            Error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error:'ERROR'})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'forecast',
    //     location: 'location',
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
           Error:'You must provide a search term'
       })
    }
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('four04',{
        para:'Help article not found'
    })
})


app.get('*',(req,res)=>{
    res.render('four04',{
        para:'Page not found 404'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running!')
})