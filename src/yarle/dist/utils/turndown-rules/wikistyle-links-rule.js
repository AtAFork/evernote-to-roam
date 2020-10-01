"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const output_format_1 = require("./../../output-format");
const yarle_1 = require("./../../yarle");
const filter_by_nodename_1 = require("./filter-by-nodename");
const get_attribute_proxy_1 = require("./get-attribute-proxy");
exports.removeBrackets = (str) => {
    return str.replace(/\[|\]/g, '');
};
exports.wikiStyleLinksRule = {
    filter: filter_by_nodename_1.filterByNodeName('A'),
    replacement: (content, node) => {
        const nodeProxy = get_attribute_proxy_1.getAttributeProxy(node);
        if (nodeProxy.href) {
            return ((!nodeProxy.href.value.startsWith('http') && !nodeProxy.href.value.startsWith('www')) ||
                nodeProxy.href.value.startsWith('evernote://')) ?
                `[[${exports.removeBrackets(node.innerHTML)}]]` :
                (yarle_1.yarleOptions.outputFormat === output_format_1.OutputFormat.ObsidianMD) ?
                    `![[${exports.removeBrackets(node.innerHTML)}]]` :
                    `[${exports.removeBrackets(node.innerHTML)}](${nodeProxy.href.value})`;
        }
    },
};
//# sourceMappingURL=wikistyle-links-rule.js.map