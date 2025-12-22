import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
export default function Protected({children,authentication=true}){
    const navigate=useNavigate();
    const [loader,setLoader]=useState(true);
    const authstatus=useSelector(state=>state.auth.status)
    useEffect(()=>{
        if(authentication && authstatus!==authentication)
        {
            navigate("/login")
        }
        else if(!authentication && authstatus!==authentication)
        {
            navigate("/")
        }
        setLoader(false)
    },[authentication,authstatus,navigate])
    
    return loader?<div className="w-full">Loading...</div>: <>{children}</>
}