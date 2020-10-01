"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_by_nodename_1 = require("./filter-by-nodename");
const get_attribute_proxy_1 = require("./get-attribute-proxy");
exports.taskItemsRule = {
    filter: filter_by_nodename_1.filterByNodeName('EN-TODO'),
    replacement: (content, node) => {
        const nodeProxy = get_attribute_proxy_1.getAttributeProxy(node);
        return `${(nodeProxy.checked.value === 'true' ? '- [x]' : '- [ ]')} ${node.innerHTML}`;
    },
};
//# sourceMappingURL=task-items-rule.js.map