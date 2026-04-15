import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        // If page REQUIRES login and user is NOT logged in
        if (authentication && authStatus!==authentication) {
            navigate("/login");
        }

        // If page is for NON-logged users (like login/signup) and user IS logged in
        else if (!authentication && authStatus!==authentication) {
            navigate("/");
        }

        setLoader(false);
    }, [authStatus, authentication, navigate]);

     return loader ? <h1>Loading...</h1> : <>{children}</>;
}