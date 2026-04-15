import axios from 'axios';

export class CardService{
    constructor(){

    this.instance = axios.create({
     baseURL: 'http://localhost:8000/api/v1/card',
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

    async createCard({name,description,columnId}){
        try {
            return await this.instance.post('/create-card',
                {
                   title:name, 
                   description:description,
                   columnId:columnId
                }
            )
        } catch (error) {
            return ("WorkspaceService :: Workspace Error", error)
        }
    }


       async updateCard({cardId,columnId,source}){
        try {
            return await this.instance.post(`/updateCard`,{
                cardId:cardId,
                columnId:columnId,
                source:source
            })
        } catch (error) {
            return ("TweetService :: Tweet Error", error)
        }
    }

}

const Service = new CardService()


export default Service