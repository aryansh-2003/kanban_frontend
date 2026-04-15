import axios from 'axios';

export class ColumnService{
    constructor(){

    this.instance = axios.create({
     baseURL: 'https://kanban-backend-9k1l.onrender.com/api/v1/column',
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

    async createColumn({name,boardId}){
        try {
            return await this.instance.post('/create-column',
                {
                    name:name,
                    boardId:boardId
                }
            )
        } catch (error) {
            return ("WorkspaceService :: Workspace Error", error)
        }
    }


    async getColumn({boardId}){
        console.log(boardId)
        try {
            return await this.instance.get(`/get-columns/${boardId}`)
        } catch (error) {
            return ("TweetService :: Tweet Error", error)
        }
    }


}

const Service = new ColumnService()


export default Service