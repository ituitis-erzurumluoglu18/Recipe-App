import axios from "axios";

const baseUrl = "http://localhost:27690/api/"

export default {
    dCandidate(url=baseUrl){
        return{
            fetchAll : () => axios.get(url),
            fetchById : id => axios.get(url + id)
        }
    }
}