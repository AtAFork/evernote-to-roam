"use strict";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// getComplexFilePath, getSimpleFilePath
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const fs = require("browserify-fs");
const utils_1 = require("./utils");
const yarle_1 = require("./yarle");
/*
 * import { writeMdFile } from './utils/file-utils';
 * import { processResources } from './process-resources';
 */
const convert_html_to_md_1 = require("./convert-html-to-md");
// eslint-disable-next-line import/prefer-default-export
exports.processNode = async (note) => {
    const title = utils_1.getTitle(note);
    console.log(`Converting note ${title}...`);
    try {
        let data = '';
        const content = utils_1.getNoteContent(note);
        /*
         * const absFilePath = isComplex(note)
         *   ? getComplexFilePath(note)
         *   : getSimpleFilePath(note);
         */
        data += title;
        if (yarle_1.yarleOptions.isMetadataNeeded) {
            data += utils_1.logTags(note);
        }
        if (utils_1.isComplex(note)) {
            console.log('Failed to process, too complex');
            return;
            // content = processResources(note, content);
        }
        const markdown = convert_html_to_md_1.convertHtml2Md(content);
        data += markdown;
        if (yarle_1.yarleOptions.isMetadataNeeded) {
            const metadata = utils_1.getMetadata(note);
            data += metadata;
        }
        // make this a promise and then have in the callback the writefile to it
        const noteFileName = await utils_1.getNoteFileName('notes/', note);
        // need a get name here to sanitize it
        await fs.writeFile(noteFileName, note);
        console.log('-------------title----------------------');
        console.log(title);
        console.log('-------------data (contains markdown)----------------------');
        console.log(data);
        console.log('-------------note----------------------');
        console.log(note);
        // writeMdFile(absFilePath, data, note);
    }
    catch (e) {
        console.log(`Failed to convert note: ${title}`, e);
    }
    console.log(`Note ${title} converted successfully.`);
};
//# sourceMappingURL=process-node.js.map