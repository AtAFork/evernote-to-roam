"use strict";
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-negated-condition */
/* eslint-disable multiline-ternary */
/* eslint-disable require-unicode-regexp */
/* eslint-disable no-ternary */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-named-capture-group */
Object.defineProperty(exports, "__esModule", { value: true });
const FILENAME_LENGTH = 50;
const FILENAME_DELIMITER = '_';
exports.getFileIndex = (fileNamePrefix, zip) => {
    // i can do fil index by just filtering the result of zip.folder
    let index = 0;
    zip.folder('notes').forEach((relativePath, file) => {
        if (file.name.indexOf(fileNamePrefix) > -1) {
            // eslint-disable-next-line no-plusplus
            index++;
        }
    });
    return index;
};
/*
 * export const getResourceFileName = async (workDir: string, resource: any) => {
 *   const UNKNOWNFILENAME = 'unknown_filename';
 */
/*
 *   const extension = getExtension(resource);
 *   let fileName = UNKNOWNFILENAME;
 */
/*
 *   if (resource['resource-attributes'] && resource['resource-attributes']['file-name']) {
 *     const fileNamePrefix = resource['resource-attributes']['file-name'].substr(0, 50);
 */
/*
 *     fileName = fileNamePrefix.split('.')[0];
 *   }
 */
/*
 *   if i implement this i need to pass jszip to getresourcefilename and then pass jszip here
 *   getFileIndex(fileNamePrefix, zip);
 *   const index = getFileIndex(workDir, fileName);
 *   const fileNameWithIndex = index > 0 ? `${fileName}.${index}` : fileName;
 */
/*
 *   return `${fileNameWithIndex}.${extension}`;
 * };
 */
exports.getFilePrefix = (note) => {
    const cutName = (note.title ? `${note.title.toString()}` : 'Untitled').substring(0, FILENAME_LENGTH);
    return exports.makeFilePrefixOsCompatible(cutName).toLowerCase();
};
exports.makeFilePrefixOsCompatible = (name) => name.replace(/(\!|\.|\;|\:|\<|\>|\"|\\|\/|\||\*|\?)/g, FILENAME_DELIMITER);
// eslint-disable-next-line require-await
exports.getNoteFileName = (note, zip) => `${exports.getNoteName(note, zip)}.md`;
exports.getExtensionFromResourceFileName = (resource) => {
    if (!(resource['resource-attributes']
        && resource['resource-attributes']['file-name'])) {
        return undefined;
    }
    const splitFileName = resource['resource-attributes']['file-name'].split('.');
    return splitFileName.length > 1 ? splitFileName[splitFileName.length - 1] : undefined;
};
exports.getExtensionFromMime = (resource) => {
    const { mime } = resource;
    if (!mime) {
        return undefined;
    }
    const splitMime = mime.split('/');
    return splitMime.length > 1
        ? splitMime[1] : undefined;
};
exports.getExtension = (resource) => {
    const UNKNOWNEXTENSION = 'dat';
    return exports.getExtensionFromMime(resource) || exports.getExtensionFromResourceFileName(resource) || UNKNOWNEXTENSION;
};
// export const getZettelKastelId = (note: any, dstPath: string): string => moment(note.created).format('YYYYMMDDhhmm');
exports.getNoteName = (note, zip) => {
    const fileNamePrefix = exports.getFilePrefix(note);
    const nextIndex = exports.getFileIndex(fileNamePrefix, zip);
    const noteName = nextIndex === 0 ? fileNamePrefix : `${fileNamePrefix}.${nextIndex}`;
    return noteName;
};
//# sourceMappingURL=filename-utils.js.map