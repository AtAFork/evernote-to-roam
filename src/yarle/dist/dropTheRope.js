"use strict";
/* istanbul ignore file */
// tslint:disable:no-console
Object.defineProperty(exports, "__esModule", { value: true });
const minimist = require("minimist");
const fs = require("fs");
const yarle = require("./yarle");
const output_format_1 = require("./output-format");
exports.run = async () => {
    const argv = minimist(process.argv.slice(2));
    const options = {
        enexFile: argv['enexSource'],
        outputDir: argv['outputDir'],
        isZettelkastenNeeded: argv['zettelkasten'] || false,
        isMetadataNeeded: argv['include-metadata'] || false,
        plainTextNotesOnly: argv['plaintext-notes-only'] || false,
        skipLocation: argv['skip-latlng'] || false,
        skipCreationTime: argv['skip-creation-time'] || false,
        skipUpdateTime: argv['skip-update-time'] || false,
        skipTags: argv['skip-tags'] || false,
        outputFormat: argv['outputFormat'] || output_format_1.OutputFormat.StandardMD,
    };
    if (options.enexFile.endsWith('.enex')) {
        console.log(`Converting notes in file: ${options.enexFile}`);
        await yarle.dropTheRope(options);
    }
    else {
        const enexDir = options.enexFile;
        const enexFiles = fs
            .readdirSync(options.enexFile)
            .filter(file => {
            return file.match(/.*\.enex/ig);
        });
        for (const enexFile of enexFiles) {
            options.enexFile = `${enexDir}/${enexFile}`;
            console.log(`Converting notes in file: ${enexFile}`);
            await yarle.dropTheRope(options);
        }
    }
    process.exit();
};
exports.run();
// tslint:enable:no-console
//# sourceMappingURL=dropTheRope.js.map