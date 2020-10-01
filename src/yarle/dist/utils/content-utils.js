"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const moment = require("moment");
const fs = require("fs");
const yarle_1 = require("./../yarle");
const TAG_SECTION_SEPARATOR = '---';
exports.getMetadata = (note) => {
    if (!yarle_1.yarleOptions.isMetadataNeeded) {
        return '';
    }
    return `${exports.logSeparator()}${exports.logCreationTime(note)}${exports.logUpdateTime(note)}${exports.logLatLong(note)}${exports.logSeparator()}`;
};
exports.getTitle = (note) => {
    return note.title
        ? `# ${note.title}${os_1.EOL}`
        : '';
};
exports.logCreationTime = (note) => {
    return (!yarle_1.yarleOptions.skipCreationTime && note.created)
        ? `    Created at: ${moment(note.created).format()}${os_1.EOL}`
        : '';
};
exports.logUpdateTime = (note) => {
    return (!yarle_1.yarleOptions.skipUpdateTime && note.updated)
        ? `    Updated at: ${moment(note.updated).format()}${os_1.EOL}`
        : '';
};
exports.logLatLong = (note) => {
    return (!yarle_1.yarleOptions.skipLocation && note['note-attributes'] && note['note-attributes'].longitude)
        ? `    Where: ${note['note-attributes'].longitude},${note['note-attributes'].latitude}${os_1.EOL}`
        : '';
};
exports.logTags = (note) => {
    if (!yarle_1.yarleOptions.skipTags && note.tag) {
        const tagArray = Array.isArray(note.tag) ? note.tag : [note.tag];
        const tags = tagArray.map((tag) => {
            const cleanTag = tag.toString().replace(/ /g, '-');
            return cleanTag.startsWith('#') ? cleanTag : `#${cleanTag}`;
        });
        return `${os_1.EOL}${TAG_SECTION_SEPARATOR}${os_1.EOL}Tag(s): ${tags.join(' ')}${os_1.EOL}${os_1.EOL}${TAG_SECTION_SEPARATOR}${os_1.EOL}${os_1.EOL}`;
    }
    return '';
};
exports.logSeparator = () => {
    return `${os_1.EOL}${os_1.EOL}`;
};
exports.setFileDates = (path, note) => {
    const modificationTime = moment(note.updated);
    const mtime = modificationTime.valueOf() / 1000;
    fs.utimesSync(path, mtime, mtime);
};
exports.getTimeStampMoment = (resource) => {
    return (resource['resource-attributes'] && resource['resource-attributes']['timestamp']) ?
        moment(resource['resource-attributes']['timestamp']) :
        moment();
};
//# sourceMappingURL=content-utils.js.map