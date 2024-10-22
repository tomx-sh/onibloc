interface FetchRpcResponse {
    data:  string | null;
    error: string | null;
}


export default async function fetchRpc(method, params): Promise<FetchRpcResponse> {
    const res = await fetch("/api/fetch-rpc", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ method, params }),
    })

    if (!res.ok) {
        console.error("🔴 fetchRpc error", res.statusText);
        return { error: res.statusText, data: null };
    }

    const data = await res.json();
    console.log("🟢 fetchRpc data", data);

    return ({
        data: JSON.stringify(data),
        error: null
    });
}