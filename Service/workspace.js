import axios from 'axios';

export class WorkspaceService{
    constructor(){

    this.instance = axios.create({
     baseURL: 'http://localhost:8000/api/v1/workspace',
    });
    this.instance.interceptors.request.use(
        (config) =>{
            const accessToken = localStorage.getItem('token')
            if(accessToken){
                config.headers.Authorization = `Bearer ${accessToken}`
            }
            return config
        },
        (error) => Promise.reject(error)
    )
    }

    async createworkspace({name}){
        try {
            return await this.instance.post('/create-workspace',
                {
                    name:name
                }
            )
        } catch (error) {
            return ("WorkspaceService :: Workspace Error", error)
        }
    }


       async getworkspaces(){
        try {
            return await this.instance.get(`/get-workspaces`)
        } catch (error) {
            return ("TweetService :: Tweet Error", error)
        }
    }

}

const Service = new WorkspaceService()


export default Service