import { Container, Section, Heading, TextField, Flex, Select, Button, Box, Separator } from "@radix-ui/themes"
import TotalBlocks from "./_components/TotalBlocks"
import MempoolTransactions from "./_components/MempoolTransactions"
import Block, { BlockProps } from "./_components/Block"
import { getLatestBlockData } from "./lib"


export default async function Home() {

    const blockData = await getLatestBlockData()
    const dataArray = blockData?.map(({ size }) => ({ value: size })) as BlockProps['data']


    return (
        <main>
            <Container size='2' p='3'>
                <Section>
                    <Heading>Home</Heading>

                    <Flex direction='column' gap='5'>
                        <TotalBlocks />
                        <MempoolTransactions />

                        <Separator size='4'/>

                        <Flex gap='3'>
                            <Select.Root defaultValue='height'>
                                <Select.Trigger/>
                                <Select.Content>
                                    <Select.Group>
                                        <Select.Item value='height'>Block height</Select.Item>
                                        <Select.Item value='hash'>Block hash</Select.Item>
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                            <Box flexGrow='1'><TextField.Root placeholder="Block height"/></Box>
                            <Button>OK</Button>
                        </Flex>
                        <Block data={dataArray}/>
                    </Flex>
                </Section>
            </Container>
        </main>
    )
}