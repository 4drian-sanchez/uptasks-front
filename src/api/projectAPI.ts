import { DashboardProjectSchema, ProjectFormData } from "../types";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function createProject( formData : ProjectFormData ) {

    try {
        const {data} = await api.post('/projects', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getAllProjects () {

    try {
        const {data} = await api('/projects')
        const response = DashboardProjectSchema.safeParse(data)
        if(response.success) {
            return response.data
        }

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}