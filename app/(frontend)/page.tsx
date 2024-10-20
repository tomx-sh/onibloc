'use client'
import getBlockchainInfo from "../(backend)/api/get-blockchain-info/wrapper";
import { Button } from "@radix-ui/themes";
import { useState } from "react";


export default function Home() {
    const [isLoading, setIsLoading] = useState(false);

    async function handleClick() {
        setIsLoading(true);
        const data = await getBlockchainInfo();
        setIsLoading(false);
        console.log(data);
    }




    return (
        <main>
            <p>Hello</p>
            <Button onClick={handleClick} disabled={isLoading}>Get blockchain info</Button>
        </main>
    );
}
