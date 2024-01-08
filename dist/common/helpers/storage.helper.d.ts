/// <reference types="node" />
export declare const checkIfFileOrDirectoryExists: (path: string) => boolean;
export declare const getFile: (path: string, encoding: any) => Promise<string | Buffer>;
export declare const createFile: (path: string, fileName: string, data: string) => Promise<void>;
export declare const deleteFile: (path: string) => Promise<void>;
