import { NextResponse } from "next/server";
import { callRpc } from "../utils";

export async function GET() {
    const data = await callRpc("get-blockchain-info");
    return NextResponse.json(data);
}