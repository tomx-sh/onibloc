import { NextRequest, NextResponse } from "next/server";
import fetchRpc from "./server";


export async function POST(request: NextRequest) {
    const { method, params } = await request.json();
    const res = await fetchRpc(method, params);
    return NextResponse.json(res);
}