import axios from 'axios'


const axiosInstance=axios.create({
    baseURL:'http://localhost:5000'
})

export const createNewJobEntry=async ({company,vacancy,salaryRange,responseStatus,notes}) => {
    try {
        const res=await axiosInstance.post('/jobEntry/create',{company,vacancy,salaryRange,responseStatus,notes})
        return res.data
    } catch (e) {
        console.log(e);     
    }
}

export const getAllJobEntries=async () => {
    try {
        const res=await axiosInstance.get('/jobEntry/getAll')
        return res.data
    } catch (e) {
        console.log(e);     
    }
}

export const updateJobEntry=async ({company,vacancy,salaryRange,responseStatus,notes,id}) => {
    try {
        const res=await axiosInstance.put(`/jobEntry/update/${id}`,{company,vacancy,salaryRange,responseStatus,notes})
        return res.data
    } catch (e) {
        console.log(e);     
    }
}
export const deleteJobEntry=async ({id}) => {
    try {
        const res=await axiosInstance.delete(`/jobEntry/delete/${id}`)
        return res.data
    } catch (e) {
        console.log(e);     
    }
}