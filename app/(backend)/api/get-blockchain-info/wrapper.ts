export default async function getBlockchainInfo() {
    const response = await fetch("/api/get-blockchain-info");
    const data = await response.json();
    return data;
}