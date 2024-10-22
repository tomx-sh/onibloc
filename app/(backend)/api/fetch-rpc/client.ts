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

    const data = await res.json();

    if (!res.ok) return { error: data.error || res.statusText, data: null };

    return {data: JSON.stringify(data), error: null};
}