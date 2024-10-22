'use client'
import { Button, Flex } from "@radix-ui/themes";
import fetchRpc from "@/app/(backend)/api/fetch-rpc/client";
import { useState } from "react";

export default function GetBlockHashBtn() {
    const [isLoading, setIsLoading] = useState(false);
    const [blockHash, setBlockHash] = useState('none');

    async function getBlockHash() {
        setIsLoading(true);
        const { data, error } = await fetchRpc('getblockhash', [0]);
        setIsLoading(false);

        if (error || !data) {
            console.error("Error getting block hash", error);
            return;
        }

        console.log("Block hash", data);
        setBlockHash(data);
    }

    return (
        <Flex>
            <Button onClick={getBlockHash} disabled={isLoading}>
                Get Block Hash
            </Button>
            <p>{blockHash}</p>
        </Flex>
    );
}