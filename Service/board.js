import axios from 'axios';

export class BoardService{
    constructor(){

    this.instance = axios.create({
     baseURL: 'https://kanban-backend-9k1l.onrender.com/api/v1/board',
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

    async createBoard({name,workSpaceId}){
        try {
            return await this.instance.post('/create-board',
                {
                    name:name,
                    workSpaceId:workSpaceId
                }
            )
        } catch (error) {
            return ("WorkspaceService :: Workspace Error", error)
        }
    }


       async getBoards({workSpaceId}){
        console.log(workSpaceId)
        try {
            return await this.instance.get(`/get-boards/${workSpaceId}`)
        } catch (error) {
            return ("TweetService :: Tweet Error", error)
        }
    }

}

const Service = new BoardService()


export default Service