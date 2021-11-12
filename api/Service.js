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


const updateToken = async(newToken) => {
    let url = "api/update-fcm-token?modo=app";
    const jsonResp = await makeRequest(url, { token: newToken }, {}, 'POST')
    return jsonResp;
}


// Informacion sobre lotes

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




//Movimientos

const listarCobros = async(query = undefined) => {

    let urlLotea = "api/cobros";
    let queryparam = doQueryParams(query)

    // setRequesting(true)
    urlLotea = urlLotea + (queryparam != '' ? '?' + queryparam : '');

    const jsonResp = await makeRequest(urlLotea)
    return jsonResp //.data.message)
        // setRequesting(false)
}

/*
loteamiento
nombre
total_cuotas_cobradas
numero_total_cuotas_cobradas
total_cuotas_en_mora
intereses_cobrados
total
gastos_administrativos
comisiones_vendedores
otros_gastos
*/
const getTotals = async(query = undefined) => {

    let urlLotea = "api/totals";
    let queryparam = doQueryParams(query)

    // setRequesting(true)
    urlLotea = urlLotea + (queryparam != '' ? '?' + queryparam : '');

    const jsonResp = await makeRequest(urlLotea)
    return jsonResp //.data.message)
        // setRequesting(false)
}






export { updateToken, listarCobros, listarLoteamientos, listarMisLoteamientos, getLoteamiento, getTotals }