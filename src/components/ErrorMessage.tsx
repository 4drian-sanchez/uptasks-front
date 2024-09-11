import { PropsWithChildren } from "react";

export default function ErrorMessage ( {children} : PropsWithChildren)  {

    return (
        <p className="bg-red-100 rounded-md text-red-600 text-center font-bold py-3 text-sm"> {children} </p>
    )
}