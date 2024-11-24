const Router = require("express")
const router=new Router()
const jobContoller=require('../controllers/job-controller')

router.post('/create',jobContoller.createJobEntry)

router.get('/getAll',jobContoller.getAllJobEntries )

router.put('/update/:id',jobContoller.updateAnEntry)

router.delete('/delete/:id',jobContoller.deleteEntry)

module.exports=router