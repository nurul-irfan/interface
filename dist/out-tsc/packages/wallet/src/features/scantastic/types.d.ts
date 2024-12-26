import { z } from 'zod';
export declare const ScantasticParamsSchema: z.ZodObject<{
    uuid: z.ZodString;
    publicKey: z.ZodObject<{
        alg: z.ZodLiteral<"RSA-OAEP-256">;
        kty: z.ZodLiteral<"RSA">;
        n: z.ZodString;
        e: z.ZodLiteral<"AQAB">;
    }, "strip", z.ZodTypeAny, {
        alg: "RSA-OAEP-256";
        kty: "RSA";
        n: string;
        e: "AQAB";
    }, {
        alg: "RSA-OAEP-256";
        kty: "RSA";
        n: string;
        e: "AQAB";
    }>;
    vendor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    browser: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    uuid: string;
    publicKey: {
        alg: "RSA-OAEP-256";
        kty: "RSA";
        n: string;
        e: "AQAB";
    };
    vendor?: string | null | undefined;
    model?: string | null | undefined;
    browser?: string | null | undefined;
}, {
    uuid: string;
    publicKey: {
        alg: "RSA-OAEP-256";
        kty: "RSA";
        n: string;
        e: "AQAB";
    };
    vendor?: string | null | undefined;
    model?: string | null | undefined;
    browser?: string | null | undefined;
}>;
export type ScantasticParams = z.infer<typeof ScantasticParamsSchema>;
//# sourceMappingURL=types.d.ts.map