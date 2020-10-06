# [Project to convert Evernote .enex to .md for use in Roam Research](https://atafork.github.io/evernote-to-roam/)

# Adjustments made to the yarle package:
- i sidestepped issues with iconv/node-expat etc by commenting out const XmlStream = require("xml-stream") [it wasn't actually required, maintainers commented out where it was used]
- commented out folder-utils.ts, process-resources.ts (since not doing complex ones for now), xml-parser-options, droptherope.ts
- removed other dependencies
    # // "fast-xml-parser": "3.12.5",
    # // "fs-extra": "4.0.2",
    # // "he": "1.2.0",
    # "xml-stream": "^0.4.5"
    # moment
    # "@types/he": "1.1.1",

- commented out `// const absFilePath = utils_1.isComplex(note) ?` inside process-node.js inside yarle
- the convert-html-to-md.js in dist/yarle has issue of "is not a constructor", so to fix i rebuilt turndown by running `npm run build-cjs`  (the browserify'd version), and replaced the turndown.js in the dist folder with the turndown.browser.cjs.js from the lib folder
- and then in yarle/dist/utils/turndown-service.js changed `const turndownService = new TurndownService({})` to  `const turndownService = TurndownService.default({})`
- then finally rebuilt yarle