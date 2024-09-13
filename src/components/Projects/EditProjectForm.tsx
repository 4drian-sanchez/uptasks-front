import { ProjectFormData, Project } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import ProjectForm from "./ProjectForm"
import { updateProject } from "@/api/projectAPI"

export type ProjectForm = {
    formData: ProjectFormData,
    projectId: Project['_id']
}

export default function EditProjectForm ( {formData, projectId} : ProjectForm ) {
    
    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: {
        projectName: formData.projectName,
        clientName : formData.clientName,
        description: formData.description
    }})

    const navigate = useNavigate()
    
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            //Regresa los datos editados. Hace una consulta una cuando se realiza cambios
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData : ProjectFormData) => {

        const data = {
            formData,
            projectId
        }
        mutate(data)
    }
    
    return (
        <>
            <h1 className="text-6xl font-black">Editar Proyecto</h1>
            <p className="text-3xl text-gray-500 mt-2">Llena el siguiente formulario para editar el proyecto</p>

            <Link 
            to={'/'}
            className="bg-purple-400 hover:bg-purple-500 inline-block mt-5 px-5 py-3 text-white uppercase font-bold rounded-md shadow-lg shadow-purple-100 transition-colors"
            >Volver a proyectos</Link>

            <form 
            className="max-w-xl mx-auto bg-white rounded-md p-5 mt-10"
            onSubmit={handleSubmit(handleForm)}
            noValidate
            >   
                <ProjectForm
                    errors={errors}
                    register={register}
                />
                <input type="submit" value="Crear proyecto"
                className="bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors w-full py-3 rounded-md text-white font-bold uppercase shadow-md shadow-fuchsia-200"
                />
            </form>
        </>
    )
}