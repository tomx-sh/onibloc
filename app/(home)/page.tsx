import AllowedMethods from "./_components/AllowedMethods";
import GetBlockHashBtn from "./_components/GetBlockHashBtn";

export default async function Home() {

    return (
        <main>
            <h1>Home</h1>
            <GetBlockHashBtn />
            <AllowedMethods />
        </main>
    )
}