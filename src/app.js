// nodemon src/app.js -e js,hbs <--- gets nodemon to monitor changes to handlebar and js files to restart


const path=require('path') // core module
const express=require('express')
const hbs=require('hbs')

const app=express()
const port = process.env.PORT || 3000

const views=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')

const geocode = require('./utils/geocode')
const forecast=require('./utils/forecast')

// Setup handlebars
app.set('view engine','hbs')
app.set('views',views)  //views default for handlebar.... setting views property allows customisation of where the view templates live
hbs.registerPartials(partialsPath) // path where partials (like subforms) are stored

// setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

// for dynamic content
app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Fred'
    })    
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About me, and I am unanimous in that',
        name:'Betty Slocombe'

    })
}
)

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'Fred',
        message: 'This is the help text'
    })
})

// static content
app.get('/weather', (req, res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address'
        })

    }

    // destructure lat,long,loc ={} to stop errors for server
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error)
        {
            return res.send({error})
        }
    
        forecast( latitude,longitude, (err, forcastData)=>{
            if (error)
            {
                return res.send({err})
            }
            res.send({
                forcast: forcastData,
                location,
                address: req.query.address

            })
           
    
        })
    })

})

app.get('/products', (req,res)=>{
    if (!req.query.search)
    {
        return res.send({
            error:'You must provide a search term'
        })

    }

    console.log(req.query.search)
    res.send({
        products:[]
    })

})

app.get('/help/*', (req, res)=>{
    res.render('error',{
        title:'Help error',
        name: 'Fred',
        errorMsg:'Help file not found'

    })

})

//Page not found
// needs to come last.. wildcard is a match for everything else
app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error',
        name: 'Fred',
        errorMsg:'Page not found'

    })
})

app.listen(port, ()=>{
    console.log('Server started on port '+port)
})  // development port