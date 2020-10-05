"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/ban-ts-comment */
const flow = require("xml-flow");
// @ts-ignore
const browserify_fs_1 = require("browserify-fs");
const process_node_1 = require("./process-node");
// eslint-disable-next-line import/no-mutable-exports
exports.yarleOptions = {
    enexFile: 'notebook.enex',
    outputDir: './mdNotes',
    isMetadataNeeded: false,
    isZettelkastenNeeded: false,
    plainTextNotesOnly: false,
};
const setOptions = (options) => {
    exports.yarleOptions = Object.assign(Object.assign({}, exports.yarleOptions), options);
};
exports.parseStream = async (options, zip) => {
    const stream = browserify_fs_1.createReadStream(options.enexFile);
    /*
     * const xml = new XmlStream(stream);
     * let noteNumber = 0;
     * const failed = 0;
     * const totalNotes = 0;
     */
    const failArr = [];
    const xmlStream = await flow(stream);
    return new Promise((resolve, reject) => {
        const logAndReject = (error) => {
            console.log(`Could not convert ${options.enexFile}:\n${error.message}`);
            // eslint-disable-next-line no-plusplus
            // ++failed;
            return reject();
        };
        xmlStream.on('tag:en-export', (enExport) => {
            // eslint-disable-next-line no-ternary
            // totalNotes = Array.isArray(enExport.note) ? enExport.note.length : 1;
        });
        xmlStream.on('tag:note', (note) => {
            process_node_1.processNode(note, zip, failArr);
            // eslint-disable-next-line no-plusplus
            /*
             * ++noteNumber;
             * console.log(`Notes processed: ${noteNumber}`);
             */
        });
        xmlStream.on('end', () => {
            const div = document.getElementById('result');
            let result;
            if (failArr.length > 0) {
                result = `The following notes failed to convert (either too complex e.g. with image attachments or another error):\n\n${failArr}`;
            }
            else {
                result = 'Hooray! All notes were converted, enjoy!';
            }
            const p = document.createElement('p');
            const text = document.createTextNode(result);
            p.appendChild(text);
            div.appendChild(p);
            resolve();
        });
        /*
         * const success = noteNumber - failed;
         * console.log(
         *   `Conversion finished: ${success} succeeded, ${
         *     totalNotes - success
         *   } failed.`,
         * );
         */
        xmlStream.on('error', logAndReject);
        stream.on('error', logAndReject);
    });
};
exports.dropTheRope = async (options, zip) => {
    setOptions(options);
    try {
        return await exports.parseStream(options, zip);
    }
    catch (error) {
        console.log(error);
    }
};
// tslint:enable:no-console
//# sourceMappingURL=yarle.js.map