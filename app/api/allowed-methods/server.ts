import fetchBtcServer from "../fetch-btc-server/server";


interface GetAllowedMethodsResponse {
    data: Record<string, boolean> | null;
    error: string | null;
}


export default async function getAllowedMethods(): Promise<GetAllowedMethodsResponse> {
    const { data, error } = await fetchBtcServer({ route: "/allowed-methods", method: "GET" });

    if (error || !data) {
        console.error("Error getting allowed methods", error);
        return { data: null, error: error };
    }

    // Try to parse the data
    try {
        const parsedData = JSON.parse(data);
        return { data: parsedData, error: "" } as GetAllowedMethodsResponse;

    } catch (error) {
        console.error("Error parsing allowed methods data", error);
        return { data: null, error: "Error parsing allowed methods data" };
    }    
}