"use strict";
/* eslint-disable import/prefer-default-export */
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
// getMetadata, getNoteContent, getTitle, isComplex, logTags, getNoteFileName,
// import { yarleOptions } from './yarle';
const convert_html_to_md_1 = require("./convert-html-to-md");
exports.processNode = (note, zip, failArr) => {
    const title = utils_1.getTitle(note);
    console.log(`Converting note ${title}...`);
    try {
        let data = '';
        const content = utils_1.getNoteContent(note);
        data += title;
        /*
         * if (yarleOptions.isMetadataNeeded) {
         *   data += logTags(note);
         * }
         */
        /*
         * if (isComplex(note)) {
         *   // content = processResources(note, content);
         * }
         */
        const markdown = convert_html_to_md_1.convertHtml2Md(content);
        data += markdown;
        /*
         * if (yarleOptions.isMetadataNeeded) {
         *   const metadata = getMetadata(note);
         *   data += metadata;
         * }
         */
        // returns .md text string
        const noteFileName = utils_1.getNoteFileName(note, zip);
        const notesFolder = zip.folder('notes');
        notesFolder.file(noteFileName, data);
        console.log(`Note ${title} converted successfully.`);
    }
    catch (e) {
        console.log(`Failed to convert note: ${title}`, e);
        failArr.push(title);
    }
};
//# sourceMappingURL=process-node.js.map