'use client'
import { Code, Flex } from "@radix-ui/themes"
import useSWR from "swr"
import fetchRpc from "@/app/api/fetch-rpc/client"
import { Box } from "lucide-react"


const fetcher = async ([method, params]: [string, unknown]) => {
    const { data, error } = await fetchRpc(method, params)
    if (error) throw new Error(error)
    return data
}


export default function TotalBlocks() {

    const { data, error, isLoading } = useSWR(["getblockchaininfo", []], fetcher, { refreshInterval: 50000 })

    const blocks: number = data ? JSON.parse(data).blocks : 0
    const color = () => {
        if (error) return 'red'
        if (isLoading) return 'gray'
        return undefined
    }


    return (
        <Flex gap='1' align='center'>
            <Box color='var(--accent-9)'/>
            <Code size='5' color={color()}>
                {blocks}
            </Code>
        </Flex>
    )
}