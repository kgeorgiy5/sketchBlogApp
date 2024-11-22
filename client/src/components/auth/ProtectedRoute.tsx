import {FC} from "react";
import { useSelector} from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import {RootState} from "../../store/store.ts";

interface IProtectedRoute {
    redirectPath?: string;
}

const ProtectedRoute:FC<IProtectedRoute> = ({redirectPath="/"}) => {
    const isAuth = useSelector((state:RootState) => state.isAuthenticated.isAuthenticated);

    if(!isAuth){
        return (
            <Navigate to={redirectPath} replace/>
        )
    }
    return <Outlet/>
}

export default ProtectedRoute;