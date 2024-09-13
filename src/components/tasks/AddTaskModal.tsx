import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import { useMutation } from '@tanstack/react-query';
import type { TaskFormData } from '@/types/index';
import TaskForm from './TaskForm';
import { createTask } from '@/api/taskAPI';
import { toast } from 'react-toastify';

export default function AddTaskModal() {

    /* VALIDAR SI EL MODAL EXISTE */
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get('newTask')
    const show = modalTask ? true : false
    const navigate = useNavigate()


    /* OBTENER EL PROJECT ID */
    const param = useParams()
    const projectId = param.projectId!
    
    /* REACT HOOK FORM */
    const initialValues : TaskFormData = {
        name: '',
        description: ''
    }
    const { register, formState: {errors}, handleSubmit, reset } = useForm({defaultValues: initialValues})

    
    /* REACK QUERY */
    const {mutate} = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true})
        }
    })
    
    const handleNewTask = (formData : TaskFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }
    
    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>

                                    <form 
                                    className='space-y-3 mt-10' 
                                    noValidate
                                    onSubmit={handleSubmit(handleNewTask)}
                                    >
                                        <TaskForm
                                            register={register}
                                            errors={errors}
                                        />
                                        
                                        <input type="submit" value="Crear tarea"
                                            className="bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors w-full py-3 rounded-md text-white font-bold uppercase shadow-md shadow-fuchsia-200"
                                        />
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}