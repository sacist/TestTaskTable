const Router = require("express")
const router=new Router()
const jobRouter=require('./job-router')

router.use('/jobEntry',jobRouter)

module.exports=router