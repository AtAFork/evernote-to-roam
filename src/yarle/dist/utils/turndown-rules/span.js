"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yarle_1 = require("./../../yarle");
const filter_by_nodename_1 = require("./filter-by-nodename");
const get_attribute_proxy_1 = require("./get-attribute-proxy");
const output_format_1 = require("./../../output-format");
const EVERNOTE_HIGHLIGHT = '-evernote-highlight:true;';
exports.spanRule = {
    filter: filter_by_nodename_1.filterByNodeName('SPAN'),
    replacement: (content, node) => {
        const HIGHLIGHT_SEPARATOR = yarle_1.yarleOptions.outputFormat === output_format_1.OutputFormat.ObsidianMD ? '==' : '`';
        const nodeProxy = get_attribute_proxy_1.getAttributeProxy(node);
        if (nodeProxy.style) {
            const nodeValue = nodeProxy.style.value;
            return nodeValue.endsWith(EVERNOTE_HIGHLIGHT) ?
                `${HIGHLIGHT_SEPARATOR}${content}${HIGHLIGHT_SEPARATOR}` :
                content;
        }
        return content;
    },
};
//# sourceMappingURL=span.js.map