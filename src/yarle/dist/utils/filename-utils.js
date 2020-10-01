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
// import * as fs from 'fs';
// @ts-ignore
const fs = require("browserify-fs");
const moment = require("moment");
// import { yarleOptions } from '../yarle';
const FILENAME_LENGTH = 50;
const FILENAME_DELIMITER = '_';
exports.getFileIndex = async (dstPath, fileNamePrefix) => {
    const files = await fs.readdir(dstPath);
    console.log('does it readdir properly?');
    const index = files.filter((file) => file.indexOf(fileNamePrefix) > -1)
        .length;
    return index;
};
exports.getResourceFileName = async (workDir, resource) => {
    const UNKNOWNFILENAME = 'unknown_filename';
    const extension = exports.getExtension(resource);
    let fileName = UNKNOWNFILENAME;
    if (resource['resource-attributes'] && resource['resource-attributes']['file-name']) {
        const fileNamePrefix = resource['resource-attributes']['file-name'].substr(0, 50);
        fileName = fileNamePrefix.split('.')[0];
    }
    const index = await exports.getFileIndex(workDir, fileName);
    const fileNameWithIndex = index > 0 ? `${fileName}.${index}` : fileName;
    return `${fileNameWithIndex}.${extension}`;
};
exports.getFilePrefix = (note) => {
    const cutName = (note.title ? `${note.title.toString()}` : 'Untitled').substring(0, FILENAME_LENGTH);
    return exports.makeFilePrefixOsCompatible(cutName).toLowerCase();
};
exports.makeFilePrefixOsCompatible = (name) => name.replace(/(\!|\.|\;|\:|\<|\>|\"|\\|\/|\||\*|\?)/g, FILENAME_DELIMITER);
// eslint-disable-next-line require-await
exports.getNoteFileName = async (dstPath, note) => `${exports.getNoteName(dstPath, note)}.md`;
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
exports.getZettelKastelId = (note, dstPath) => moment(note.created).format('YYYYMMDDhhmm');
exports.getNoteName = async (dstPath, note) => {
    /*
     * let noteName;
     * if (yarleOptions.isZettelkastenNeeded) {
     *   const zettelPrefix = getZettelKastelId(note, dstPath);
     *   const nextIndex = await getFileIndex(dstPath, zettelPrefix);
     *   const separator = ' ';
     *   noteName = nextIndex !== 0
     *     ? `${zettelPrefix}.${nextIndex}`
     *     : zettelPrefix;
     */
    /*
     *   noteName += getFilePrefix(note).toLowerCase() !== 'untitled' ? `${separator}${getFilePrefix(note)}` : '';
     * } else {
     */
    const fileNamePrefix = exports.getFilePrefix(note);
    const nextIndex = await exports.getFileIndex(dstPath, fileNamePrefix);
    const noteName = nextIndex === 0 ? fileNamePrefix : `${fileNamePrefix}.${nextIndex}`;
    // }
    return noteName;
};
//# sourceMappingURL=filename-utils.js.map