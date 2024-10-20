import fetchBtcServer from "../fetch-btc-server/server";


export default async function fetchRpc(method, params) {
    const requestBody = JSON.stringify({method, params});
    return await fetchBtcServer({route: "/rpc", method: "POST", body: requestBody});
}