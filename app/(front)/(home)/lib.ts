import fetchRpc from "@/app/api/fetch-rpc/server";

export async function getLatestBlockData() {

    // get best block hash
    const { data: bestblockhash } = await fetchRpc({ method: "getbestblockhash", params: [] });
    if (!bestblockhash) return null;

    const bestblockhashString = JSON.parse(bestblockhash);

    //console.log("Best block hash", bestblockhash);


    // get block details
    const { data: block } = await fetchRpc({ method: "getblock", params: [bestblockhashString, 2] });
    if (!block) return null;

    const blockObject = JSON.parse(block);
    const transactions = blockObject.tx
    //console.log("Block", blockObject.hash, "transactions", transactions);


    // Return transactions ids and sizes
    const result = transactions.map(tx => ({ txid: tx.txid, size: tx.size })) as { txid: string, size: number }[];
    //console.log("First 100 transactions", result);

    return result;
}