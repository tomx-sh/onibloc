interface FetchBtcServerArgs {
    route: string;
    method: 'GET' | 'POST';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: string;
}

interface FetchBtcServerResponse {
    data:  string | null;
    error: string | null;
}


export default async function fetchBtcServer({ route, method, body }: FetchBtcServerArgs): Promise<FetchBtcServerResponse> {
    const apiKey = process.env.API_KEY;
    const serverUrl = process.env.BTC_SERVER_URL
    if (!apiKey) return { error: "API_KEY is not set", data: null };
    if (!serverUrl) return { error: "BTC_SERVER_URL is not set", data: null };

    const serverRoute = serverUrl + route;

    const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": apiKey,
    })

    try {

        console.log('server route', serverRoute);
        console.log('method', method);
        console.log('body', body);

        const response = await fetch(serverRoute, { method, headers, body });

        if (!response.ok) {
            console.error(` RPC ${method}`, serverRoute, 'error', response.statusText);
            return { error: response.statusText, data: null };
        }

        const data = await response.json();
        console.log(` RPC ${method}`, serverRoute, formattedKeys(data));

        const stringData = JSON.stringify(data);

        return { data: stringData, error: null };

    } catch (error) {
        console.error(` RPC ${method}`, serverRoute, 'throws', error);
        return { error: 'Thrown error: ' + (error as Error).message, data: null };
    }
}


/** Show the keys of an object like: { key1, key2, key3 } */
function formattedKeys(object): string {
    return `{ ${Object.keys(object).join(", ")} }`;
}