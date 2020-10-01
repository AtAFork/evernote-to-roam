"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const turndown_service_1 = require("./utils/turndown-service");
exports.convertHtml2Md = (content) => {
    const contentInMd = turndown_service_1.getTurndownService().turndown(content);
    return contentInMd && contentInMd !== 'undefined' ? contentInMd : '';
};
//# sourceMappingURL=convert-html-to-md.js.map