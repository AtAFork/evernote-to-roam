"use strict";
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// getComplexFilePath, getSimpleFilePath
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const browserify_fs_1 = require("browserify-fs");
const util_1 = require("util");
const utils_1 = require("./utils");
const yarle_1 = require("./yarle");
const convert_html_to_md_1 = require("./convert-html-to-md");
const pWriteFile = util_1.promisify(browserify_fs_1.writeFile);
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
        const noteFileName = `./notes/${await utils_1.getNoteFileName('notes/', note)}`;
        /*
         * console.log('right before writefile');
         * console.log(`file name: ${noteFileName}`);
         */
        await pWriteFile(noteFileName, data);
        console.log('-------------title----------------------');
        console.log(title);
        // console.log('-------------data (contains markdown)----------------------');
        // console.log(data);
        // console.log('-------------note----------------------');
        // console.log(note);
        console.log(`Note ${title} converted successfully.`);
    }
    catch (e) {
        console.log(`Failed to convert note: ${title}`, e);
    }
};
//# sourceMappingURL=process-node.js.map