import { FetchRpcArgs, FetchRpcResponse } from "./server";


export default async function fetchRpc(
    method: FetchRpcArgs["method"],
    params: FetchRpcArgs["params"]
): Promise<FetchRpcResponse> {

    const res = await fetch("/api/fetch-rpc", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ method, params }),
    })

    const resJson = await res.json()
    const { data, error } = {
        data: JSON.stringify(resJson.data),
        error: resJson.error as string | null
    } as FetchRpcResponse

    if (!res.ok) return { error: error || res.statusText, data: null };

    return { data: data, error: error };
}