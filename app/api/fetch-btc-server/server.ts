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
        const response = await fetch(serverRoute, { method, headers, body });

        if (!response.ok) {
            const errorMess = response.statusText;
            console.error(` BTC ${method}`, serverRoute, 'response not ok', errorMess);
            return { error: errorMess, data: null };
        }

        const data = await response.json();

        console.log(` BTC ${method}`, serverRoute)//, formattedKeys(data));

        const stringData = JSON.stringify(data);

        return { data: stringData, error: null };

    } catch (error) {
        console.error(` BTC ${method}`, serverRoute, 'throws', (error as Error).message);
        return { error: 'Thrown error: ' + (error as Error).message, data: null };
    }
}


/** Show the keys of an object like: { key1, key2, key3 } */
/*function formattedKeys(object): string {
    return `{ ${Object.keys(object).join(", ")} }`;
}*/