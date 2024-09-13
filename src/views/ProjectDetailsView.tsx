import { useParams, Navigate, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProyectById } from "@/api/projectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import { Task } from "../types"
import TaskList from "@/components/tasks/TaskList"

interface Project {
    _id: string,
    projectName: string,
    clientName: string,
    description: string,
    tasks: Task[]
}

export default function ProjectDetailsView () {

    const param = useParams()
    const projectId = param.projectId!
    const navigate = useNavigate()

    const { data, isLoading, isError } = useQuery<Project>({
        queryKey: ['editProject', projectId],
        queryFn: () => getProyectById(projectId),
        retry: false
    })
    console.log(data?.tasks)
    if(isLoading) return 'cargando...'
    if(isError) return <Navigate to={'/404'}/>
    if(data) return (
        <>
            <h1 className="text-5xl font-black"> {data.projectName} </h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description} </p>

            <nav className="my-5 flex gap-3">
                <button
                type="button"
                className="bg-purple-500 hover:bg-purple-600 px-10 py-2 text-white text-xl cursor-pointer transition-all rounded-md shadow-md shadow-purple-200 hover:shadow-none "
                onClick={ () => navigate('?newTask=true') }
                >
                    Agregar tarea
                </button>
            </nav>
            <TaskList tasks={data.tasks}/>
            <AddTaskModal/>
        </>
    )
}