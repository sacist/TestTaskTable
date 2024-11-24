const mongoose = require ('mongoose')


const JobSchema=new mongoose.Schema({
    company:{type:String,required:true},
    vacancy:{type:String,required:true},
    salaryRange: {
        type: {
            min: { type: Number, required: true },
            max: { type: Number, required: true },
            currency: { type: String, required: true, enum: ['USD', 'EUR', 'RUB'] }
        },
        required: true
    },
    responseStatus:{type:String,required:true},
    notes:{type:String,required:true}  
})  


const Job=mongoose.model('job',JobSchema)
module.exports=Job