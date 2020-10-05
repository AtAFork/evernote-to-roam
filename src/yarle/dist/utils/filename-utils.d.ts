import * as JSZip from 'jszip';
export declare const getFileIndex: (fileNamePrefix: string, zip: JSZip) => number;
export declare const getFilePrefix: (note: any) => string;
export declare const makeFilePrefixOsCompatible: (name: string) => string;
export declare const getNoteFileName: (note: any, zip: JSZip) => string;
export declare const getExtensionFromResourceFileName: (resource: any) => string;
export declare const getExtensionFromMime: (resource: any) => string;
export declare const getExtension: (resource: any) => string;
export declare const getNoteName: (note: any, zip: JSZip) => string;
