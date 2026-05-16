import { IR_V0_SCHEMA_VERSION } from "@wptp/ir";
function pathFromUrl(url) {
    try {
        return new URL(url).pathname;
    }
    catch {
        return url;
    }
}
/** Import a minimal HAR 1.x log (HTTP Archive) into IR v0 route nodes. */
export function importHarV0(har, sourceApp = "browser-trace") {
    const entries = har.log?.entries ?? [];
    const nodes = [];
    const roots = [];
    const seen = new Set();
    let n = 0;
    for (const entry of entries) {
        const method = (entry.request?.method ?? "GET").toUpperCase();
        const url = entry.request?.url;
        if (!url)
            continue;
        const path = pathFromUrl(url);
        const key = `${method} ${path}`;
        if (seen.has(key))
            continue;
        seen.add(key);
        const id = `har-${n++}`;
        roots.push(id);
        nodes.push({
            id,
            layer: "request",
            op: "route",
            valueType: { kind: "void" },
            effects: [{ kind: "http.fetch", host: safeHost(url) }],
            operandIds: [],
            attrs: { path, method, url },
            provenance: [
                {
                    source: "browser-trace",
                    reason: key,
                    locator: { kind: "har", url, method },
                },
            ],
            browser: { url, method },
        });
    }
    return {
        schemaVersion: IR_V0_SCHEMA_VERSION,
        meta: { sourceApp, importedFrom: "har@1.2" },
        roots,
        nodes,
        losses: [],
    };
}
function safeHost(url) {
    try {
        return new URL(url).hostname;
    }
    catch {
        return undefined;
    }
}
export function importHarJson(json, sourceApp) {
    if (!json || typeof json !== "object")
        throw new Error("HAR: expected object");
    return importHarV0(json, sourceApp);
}
