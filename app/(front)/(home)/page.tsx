import { Container, Section, Heading } from "@radix-ui/themes"
import TotalBlocks from "./_components/TotalBlocks"
import MempoolTransactions from "./_components/MempoolTransactions"


export default async function Home() {


    return (
        <Container size='2' m='3'>
            <Section>
                <Heading>Home</Heading>
                <TotalBlocks />
                <MempoolTransactions />
            </Section>
        </Container>
    )
}