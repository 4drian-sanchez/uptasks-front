import { useParams, Navigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProyectById } from "@/api/projectAPI"
import EditProjectForm from "@/components/Projects/EditProjectForm"

export default function EditProjectView () {

    const param = useParams()
    const projectId = param.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProyectById(projectId),
        retry: false
    })

    if(isLoading) return 'cargando...'
    if(isError) return <Navigate to={'/404'}/>
    if(data) return <EditProjectForm formData={data} projectId={projectId} />

}