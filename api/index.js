import axios from "axios";
import { getAuthStateWithoutHook } from "./AuthContext";
const base_url = "https://clientes.terrelandia.com";


const makeRequest = async(uri, data = {}, headers = {}, metodo = "GET") => {


    let authToken = await getAuthStateWithoutHook()

    let resp = undefined
    try {
        let fullpath = base_url + '/' + uri
        let cabeceras = {...headers, 'Accept': 'application/json', 'Accept-Language': 'es', 'Authorization': 'Bearer ' + authToken }

        let config = {
            url: fullpath,
            method: metodo,
            data: data,
            headers: cabeceras
        }
        resp = await axios(config);
        const jsonResp = resp;
        return jsonResp

    } catch (e) {

        return e.response
    }
}
export { makeRequest as default, base_url }