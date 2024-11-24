const Job = require('../models/job')


class JobController{

    async createJobEntry(req,res) {
        try {
            const {company,vacancy,salaryRange,responseStatus,notes}=req.body
            const newJob=new Job({
                company,
                vacancy,
                salaryRange,
                responseStatus,
                notes
            })
            await newJob.save()
            res.status(204).json()
        } catch (e) {
            res.status(400).json({ error: 'Failed to create jobEntry' });
            console.log(e);         
        }
    }
    async getAllJobEntries(req,res){
        try {         
            const entries=await Job.find()
            res.status(200).json(entries)
        } catch (e) {
           console.log(e);        
        }
    }
    async updateAnEntry(req,res){
        try {
            const {id}=req.params
            const updateData=req.body
            
            const updatedEntry= await Job.findOneAndUpdate(
                {_id:id},
                updateData,
                {new:true}
            )
            if (!updatedEntry){
                return res.status(404).json({error:'Entry not found'})
            }
            res.status(200).json(updatedEntry)
        } catch (e) {
           console.log(e);   
        }
    }
    async deleteEntry(req,res){
        try {
            const {id}=req.params
            const deletedEntry=await Job.findByIdAndDelete(id)
            if(!deletedEntry){
                return res.status(404).json({error:'Entry not found'})
            }
            res.status(200).json(deletedEntry)
        } catch (e) {
            console.log(e);     
        }
    }

}

module.exports = new JobController()