"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttributeProxy = (node) => {
    const handler = {
        get(target, key) {
            return target[key];
        },
    };
    return new Proxy(node.attributes, handler);
};
//# sourceMappingURL=get-attribute-proxy.js.map