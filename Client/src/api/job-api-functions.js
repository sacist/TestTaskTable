import { createNewJobEntry, deleteJobEntry, updateJobEntry, getAllJobEntries } from "./job-api";

export const createEntry=async (company,vacancy,salaryRange,responseStatus,notes) => {
    const data=await createNewJobEntry({company,vacancy,salaryRange,responseStatus,notes})
    return data
}

export const deleteEntry=async (id) => {
    const data=await deleteJobEntry({id})
    return data
}

export const updateEntry=async (company,vacancy,salaryRange,responseStatus,notes,id) => {
    const data=await updateJobEntry({company,vacancy,salaryRange,responseStatus,notes,id})
    return data
}

export const getAllEntries=async () => {
    const data=await getAllJobEntries()
    return data
}