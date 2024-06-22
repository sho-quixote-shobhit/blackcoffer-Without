

//RUNNING ONCE TO INSERT THE DATA



const mongoose = require('mongoose')
const Data = require('./models/Data')
const {data} = require('./jsondata')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('connected', ()=>{
    console.log('connected to database')
})
mongoose.connection.on('error' , ()=>{
    console.log('connection failed')
})

data.map(async (d) => {
    const newData = await new Data({
        end_year : d.end_year,
        intensity : d.intensity,
        sector : d.sector,
        topic : d.topic,
        insight : d.insight,
        url : d.url,
        region : d.region,
        start_year : d.start_year,
        impact : d.impact,
        added : d.added,
        published : d.published,
        country : d.country,
        relevance : d.relevance,
        pestle : d.pestle,
        source : d.source,
        title : d.title,
        likelihood : d.likelihood
    })
    await newData.save()
})