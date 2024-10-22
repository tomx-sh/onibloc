import getAllowedMethods from "@/app/api/allowed-methods/server";
import { DataList, Badge } from "@radix-ui/themes";

export default async function AllowedMethods() {
    const { data, error } = await getAllowedMethods();

    return (
        <DataList.Root>
            {data && Object.entries(data).map(([name, value]) => (
                <DataListItem key={name} name={name} value={value} />
            ))}
            {error && <DataList.Item>{error}</DataList.Item>}
        </DataList.Root>
    );
}



function DataListItem({ name, value }: { name: string; value: boolean }) {
    return (
        <DataList.Item>
            <DataList.Label>{name}</DataList.Label>
            <DataList.Value>
                <Badge color={value ? "green" : "red"}>
                    {value ? "Yes" : "No"}
                </Badge>
            </DataList.Value>
        </DataList.Item>
    );
}