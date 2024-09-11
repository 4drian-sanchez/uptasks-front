import { Link } from "react-router-dom"


export default function Logo () {


    return (
        <Link to={'/'}>
            <img 
            src="/logo.svg" 
            alt="Logo de UpTasks" 
            className="block w-64"/>
        </Link>
    )
}