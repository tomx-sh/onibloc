import fetchBtcServer from "../fetch-btc-server/server";


export default async function fetchRpc(method, params) {
    const requestBody = JSON.stringify({method, params});
    console.log("fetchRpc request body", requestBody);
    const res = await  fetchBtcServer({route: "/rpc", method: "POST", body: requestBody});
    console.log("fetchRpc response", res);
    return { data: res.data, error: res.error };
}