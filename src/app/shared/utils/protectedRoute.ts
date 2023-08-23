
import {  Navigate } from "react-router-dom";
import IStorageService from "../localstorage/interfaces/IStorageService";
import { LocalStorage } from "../localstorage/impl/localStorage";

interface ProtectedRouteProps {
    // eslint-disable-next-line
    children ?: any;
}

export default function ProtectedRoute( {children}: ProtectedRouteProps){

    const storageService: IStorageService = new LocalStorage();
    const accessToken: string = storageService.getAccessToken();

    if(!accessToken){
        alert("Sessão expirada, refaça o procedimento de login...");
        return Navigate({ to: "/login", replace: true}); 
    }

    return children;
}
