import fetchBtcServer from "../fetch-btc-server/server";


export interface FetchRpcArgs {
    method: string;
    params: unknown;
}

export interface FetchRpcResponse {
    data: string | null;
    error: string | null;
}

interface RpcResponse {
    result: string;
    error: string;
    id: string;
}


export default async function fetchRpc({ method, params }: FetchRpcArgs): Promise<FetchRpcResponse> {
    const requestBody = JSON.stringify({method, params});
    const res = await  fetchBtcServer({route: "/rpc", method: "POST", body: requestBody});

    if (!res.data || res.error) {
        return { data: null, error: res.error || "No data returned" };
    }

    // rpc methods allways return a stringified object of type RpcResponse
    try {
        const data = JSON.parse(res.data) as RpcResponse;
        return { data: data.result, error: data.error };

    } catch (error) {
        console.error("Error parsing rpc response", res.data, error);
        return { data: null, error: "Error parsing rpc response" };
    }
}