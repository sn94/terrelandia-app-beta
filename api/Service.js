import makeRequest from './index'


const doQueryParams = function(query) {
    let queries = [];

    if (query) {
        queries = Object.entries(query).map(
            ([k, v]) => {
                return k + '=' + v;
            }
        );
    }

    let queryparam = queries.join('&')
    return queryparam
}



const listarLoteamientos = async() => {
    let urlLotea = "api/loteamientos"
    const jsonResp = await makeRequest(urlLotea)
    return jsonResp //.data.message)
}
const listarMisLoteamientos = async() => {
    let urlLotea = "api/mis-loteamientos"
    const jsonResp = await makeRequest(urlLotea)
    return jsonResp //.data.message)
}


const getLoteamiento = async(idLoteamieno) => {
    let urlLotea = "api/loteamientos/" + idLoteamieno;
    const jsonResp = await makeRequest(urlLotea)
    return jsonResp //.data.message)
}


const listarCobros = async(query = undefined) => {

    let urlLotea = "api/cobros";
    let queryparam = doQueryParams(query)

    // setRequesting(true)
    urlLotea = urlLotea + (queryparam != '' ? '?' + queryparam : '');

    const jsonResp = await makeRequest(urlLotea)
    return jsonResp //.data.message)
        // setRequesting(false)
}


export { listarCobros, listarLoteamientos, listarMisLoteamientos, getLoteamiento }