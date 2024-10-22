import { NextRequest, NextResponse } from "next/server";
import fetchRpc, {FetchRpcArgs} from "./server";


export async function POST(request: NextRequest) {
    // Try to parse the request body as FetchRpcArgs
    try {
        const { method, params } = await request.json() as FetchRpcArgs;
        const res = await fetchRpc({ method, params });
        if (res.error) {
            return NextResponse.json({ data: null, error: res.error }, { status: 400 });

        } else {
            return NextResponse.json(res);
        }

    } catch (error) {
        console.error("Error parsing request body", error);
        return NextResponse.json({ data: null, error: "Error parsing request body" }, { status: 400 });
    }
}