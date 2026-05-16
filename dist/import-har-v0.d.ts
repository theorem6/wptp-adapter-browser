import { type IrDocumentV0 } from "@wptp/ir";
export interface HarLog {
    readonly log?: {
        readonly entries?: ReadonlyArray<{
            readonly request?: {
                readonly method?: string;
                readonly url?: string;
            };
        }>;
    };
}
/** Import a minimal HAR 1.x log (HTTP Archive) into IR v0 route nodes. */
export declare function importHarV0(har: HarLog, sourceApp?: string): IrDocumentV0;
export declare function importHarJson(json: unknown, sourceApp?: string): IrDocumentV0;
