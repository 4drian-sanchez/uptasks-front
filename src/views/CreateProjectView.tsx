import { Link, useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import type { ProjectFormData } from "../types";
import ProjectForm from "@/components/Projects/ProjectForm";
import { createProject } from "@/api/projectAPI";

export default function CreateProjectView () {

    const initialValue : ProjectFormData = {
        projectName: '',
        clientName : '',
        description: ''
    }
    
    const navigate = useNavigate()
    
    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValue})

    const {mutate} = useMutation({
        mutationFn: createProject,
        onError: (data) => {
            toast.error(data.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate('/')
        }
    })
    
    function handleForm (formData : ProjectFormData) {
        mutate(formData)    
    }

    return (
        <>
            <h1 className="text-6xl font-black">Crear Proyecto</h1>
            <p className="text-3xl text-gray-500 mt-2">Llena el siguiente formulario para crear un proyecto</p>

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