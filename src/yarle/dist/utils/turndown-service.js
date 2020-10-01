"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-ternary */
const TurndownService = require("turndown");
const joplin_turndown_plugin_gfm_1 = require("joplin-turndown-plugin-gfm");
const wikistyle_links_rule_1 = require("./turndown-rules/wikistyle-links-rule");
const task_items_rule_1 = require("./turndown-rules/task-items-rule");
const span_1 = require("./turndown-rules/span");
const images_rule_1 = require("./turndown-rules/images-rule");
// eslint-disable-next-line import/prefer-default-export
exports.getTurndownService = () => {
    /* istanbul ignore next */
    // const turndownService = new TurndownService({
    const turndownService = TurndownService.default({
        br: '',
        blankReplacement: (content, node) => (node.isBlock ? '\n\n' : ''),
        keepReplacement: (content, node) => (node.isBlock ? `\n${node.outerHTML}\n` : node.outerHTML),
        defaultReplacement: (content, node) => (node.isBlock ? `\n${content}\n` : content),
    });
    turndownService.addRule('evernote task items', task_items_rule_1.taskItemsRule);
    turndownService.addRule('wikistyle links', wikistyle_links_rule_1.wikiStyleLinksRule);
    turndownService.addRule('images', images_rule_1.imagesRule);
    turndownService.addRule('span', span_1.spanRule);
    turndownService.use(joplin_turndown_plugin_gfm_1.gfm);
    return turndownService;
};
//# sourceMappingURL=turndown-service.js.map