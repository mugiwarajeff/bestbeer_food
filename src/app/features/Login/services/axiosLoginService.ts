import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ILoginService } from "../interfaces/loginService";
import { ILogin } from "../interfaces/login";
import { CreateLoginDto } from "../interfaces/createLoginDto";
import { UnauthorizedException } from "app/shared/exceptions/unauthorizedException";
import { ServerException } from "app/shared/exceptions/serverException";
import { APIENDOPOINT } from "app/shared/constants/apiEndpoint";
import AxiosService from "app/shared/services/axiosService";

export class AxiosLoginService implements ILoginService {
    private axios: AxiosInstance;

    constructor(){
        this.axios = AxiosService.getInstance();
    }
     
    public async createLogin (login: ILogin): Promise<CreateLoginDto> {
        
        const response: AxiosResponse = await this.axios.post("/login", login);

        console.log(response.data);

        if(response.status === 200 || response.status === 201){
            return response.data;
        }

        if(response.status === 401){
            throw new UnauthorizedException();
        }
        
        if(response.status === 500){
            throw new ServerException();
        }
        throw Error();
    }
}