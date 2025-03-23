import { get } from "@vercel/edge-config";
import { unstable_cacheLife } from "next/cache";

export async function isEnabled() {
    'use cache'
    unstable_cacheLife('seconds')

    if (!process.env.EDGE_CONFIG) { // if no edge config is set, we assume the service is available
        return true;
    }

    return true;
    return await get("status") === "enabled";
}