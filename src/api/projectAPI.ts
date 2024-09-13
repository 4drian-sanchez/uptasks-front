import { DashboardProjectSchema, Project, ProjectFormData } from "../types";
import  type {ProjectForm} from '@/components/Projects/EditProjectForm'
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

export async function getProyectById (id : Project['_id']) {

    try {
        const {data} = await api(`/projects/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateProject ({ formData, projectId } : ProjectForm) {

    try {
        const {data} = await api.put<string>(`/projects/${projectId}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteProject (id: Project['_id']) {
    try {
        const {data} = await api.delete(`projects/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}