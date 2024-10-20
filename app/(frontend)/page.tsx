'use client'
import getBlockchainInfo from "../(backend)/api/get-blockchain-info/wrapper";


export default function Home() {

    async function handleClick() {
        const data = await getBlockchainInfo();
        console.log(data);
    }




    return (
        <main>
            <p>Hello</p>
            <button onClick={handleClick}>Get blockchain info</button>
        </main>
    );
}
