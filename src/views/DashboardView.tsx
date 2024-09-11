import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "@/api/projectAPI";


export default function DashboardView () {

    const {data, isLoading} = useQuery({
        queryKey: ['projects'],
        queryFn: getAllProjects
    })


    if(isLoading) return 'cargando'
    console.log(data)

    if(data) return (
        <>
            <h1 className="text-6xl font-black">Proyectos</h1>
            <p className="text-3xl text-gray-500 mt-2">Maneja y administra tus proyectos</p>

            <Link 
            to={'/projects/create'}
            className="bg-purple-400 hover:bg-purple-500 inline-block mt-5 px-5 py-3 text-white uppercase font-bold rounded-md shadow-lg shadow-purple-100 transition-colors"
            >Nuevo Proyecto</Link>

            {
                data.length 
                ? (
                    <>
                        <p>Si hay proyectos</p>
                        {
                            data.map( proyect => (
                                <p>{proyect.clientName} </p>
                            ))
                        }
                    </>
                    
                )
                : (
                    <p>No hay proyectos</p>
                )
            }
        </>
    )
}