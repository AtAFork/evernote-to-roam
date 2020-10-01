"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yarle_1 = require("../../yarle");
const filter_by_nodename_1 = require("./filter-by-nodename");
const get_attribute_proxy_1 = require("./get-attribute-proxy");
const output_format_1 = require("./../../output-format");
exports.imagesRule = {
    filter: filter_by_nodename_1.filterByNodeName('IMG'),
    replacement: (content, node) => {
        const nodeProxy = get_attribute_proxy_1.getAttributeProxy(node);
        if (!nodeProxy.src) {
            return '';
        }
        if (yarle_1.yarleOptions.outputFormat === output_format_1.OutputFormat.ObsidianMD) {
            return `![[${nodeProxy.src.value}]]`;
        }
        const srcSpl = nodeProxy.src.value.split('/');
        return `![${srcSpl[srcSpl.length - 1]}](${nodeProxy.src.value})`;
    },
};
//# sourceMappingURL=images-rule.js.map