import axios from "axios";

const base_url = "https://clientes.terrelandia.com";

const makeRequest = async(uri, data = {}, headers = {}, metodo = "GET") => {
    let resp = undefined
    try {
        let fullpath = base_url + '/' + uri
        let cabeceras = {...headers, ... { 'Accept-Language': 'es' } }

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
        console.log(JSON.stringify(e.response, null, 2))
        return e.response
    }
}
export { makeRequest as default, base_url }