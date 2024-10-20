export default async function fetchRpc(method, params) {
    return fetch("/api/bitcoin-rpc", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ method, params }),

    }).then((response) => {
        if (!response.ok) {
            return { error: "Network response was not ok" };
        }
        return response.json();
    });
}