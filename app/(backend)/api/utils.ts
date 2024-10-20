export async function callRpc(method: string, params: { [key: string]: string } = {}) {
    const rpcUrl = process.env.BTC_SERVER_URL
    const apiKey = process.env.API_KEY;
    if (!rpcUrl) return { error: "BTC_SERVER_URL is not set" };
    if (!apiKey) return { error: "API_KEY is not set" };

    const requestHeaders = new Headers({
        "Content-Type": "application/json",
        "x-api-key": apiKey,
    })

    const apiUrl = rpcUrl + "/" + method + (params[0] ? "?" + new URLSearchParams(params).toString() : "");
    console.log(" RPC GET", apiUrl);

    try {
        const response = await fetch(apiUrl, { method: "GET", headers: requestHeaders});

        const data = await response.json();

        if (data.error) return { error: data.error };

        return data.result;

    } catch (error) {
        return { error: 'Thrown error: ' + (error as Error).message };
    }
}