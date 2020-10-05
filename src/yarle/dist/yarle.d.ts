import * as JSZip from 'jszip';
import { YarleOptions } from './YarleOptions';
export declare let yarleOptions: YarleOptions;
export declare const parseStream: (options: YarleOptions, zip: JSZip) => Promise<void>;
export declare const dropTheRope: (options: YarleOptions, zip: JSZip) => Promise<any>;
