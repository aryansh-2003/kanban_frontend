import axios from 'axios';



export class notificationService{
    constructor(){

    this.instance = axios.create({
     baseURL: 'http://localhost:8000/api/v1',
     
     
    //  headers: {'X-Custom-Header': 'foobar'}
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

    


    async getNotification(){
        try {
            return await this.instance.get(`/get-notifications`)
        } catch (error) {
            return ("VideoService :: Login Error", error)
        }
    }

    


}

const Service = new notificationService()


export default Service