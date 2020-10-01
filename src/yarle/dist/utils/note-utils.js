"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNoteContent = (note) => {
    return note.content;
};
exports.isComplex = (note) => {
    return note.resource ? true : false;
};
//# sourceMappingURL=note-utils.js.map