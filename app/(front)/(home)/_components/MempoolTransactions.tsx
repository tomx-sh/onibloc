'use client'
import { Code, Flex, Text } from "@radix-ui/themes"
import useSWR from "swr"
import fetchRpc from "@/app/api/fetch-rpc/client"
import { ArrowLeftRight} from "lucide-react"


const fetcher = async ([method, params]: [string, unknown]) => {
    const { data, error } = await fetchRpc(method, params)
    if (error) throw new Error(error)
    if (!data) throw new Error("No data")
    return JSON.parse(data)
}




export default function MempoolTransactions() {

    const { data, error, isLoading } = useSWR(["getmempoolinfo", []], fetcher, { refreshInterval: 5000 })

    const numberOfTransactions: number = data ? JSON.parse(data).size : 0
    const color = () => {
        if (error) return 'red'
        if (isLoading) return 'gray'
        return undefined
    }


    return (
        <Flex gap='1' align='center'>
            <ArrowLeftRight color='var(--accent-9)'/>
            <Code size='5' color={color()}>
                {numberOfTransactions}
            </Code>
            <Text size='2'>
                transactions in mempool
            </Text>
        </Flex>
    )
}