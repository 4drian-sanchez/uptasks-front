import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Task, TaskFormData } from "../types";

type CreateTask =  {
    formData : TaskFormData
    projectId : Task['_id']
}

export async function createTask({formData, projectId} : CreateTask) {
    try {
        const {data} = await api.post(`/projects/${projectId}/tasks`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)  {
            throw new Error(error.response.data.error)
        }
    }
}