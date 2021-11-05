import makeRequest from './index'

const listarCobros = async(query = undefined) => {

    let urlLotea = "api/cobros";
    let queries = [];

    if (query) {
        queries = Object.entries(query).map(
            ([k, v]) => {
                return k + '=' + v;
            }
        );

    }

    let queryparam = queries.join('&')

    // setRequesting(true)
    urlLotea = urlLotea + (queryparam != '' ? '?' + queryparam : '');

    const jsonResp = await makeRequest(urlLotea)

    if (jsonResp.status == 200) {
        //    console.log(JSON.stringify(jsonResp.data))
        return jsonResp
    } else
        return jsonResp //.data.message)
            // setRequesting(false)
}


export { listarCobros }