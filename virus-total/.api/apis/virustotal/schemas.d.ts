declare const PostFiles: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly file: {
                readonly type: "string";
                readonly format: "binary";
            };
            readonly password: {
                readonly type: "string";
                readonly description: "Optional, password to decompress and scan a file contained in a protected ZIP file.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "x-apikey": {
                    readonly type: "string";
                    readonly examples: readonly ["<your API key>"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Your API key";
                };
            };
            readonly required: readonly ["x-apikey"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly description: "object type";
                            readonly examples: readonly ["analysis"];
                        };
                        readonly id: {
                            readonly type: "string";
                            readonly description: "analysis ID.";
                            readonly examples: readonly ["OTFiMDcwMjVjZDIzZTI0NGU4ZDlmMjI2NjkzZDczNGE6MTY1MzY1NDM3Nw=="];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { PostFiles };
