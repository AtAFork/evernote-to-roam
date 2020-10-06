/* eslint-disable import/prefer-default-export */
import * as JSZip from 'jszip';

import { getNoteContent, getTitle, getNoteFileName } from './utils';
// getMetadata, getNoteContent, getTitle, isComplex, logTags, getNoteFileName,

// import { yarleOptions } from './yarle';
import { convertHtml2Md } from './convert-html-to-md';

export const processNode = (note: any, zip: JSZip, failArr: (string | number)[]): void => {
  const title = getTitle(note);

  console.log(`Converting note ${title}...`);
  try {
    let data = '';

    const content = getNoteContent(note);

    data += title;
    /*
     * if (yarleOptions.isMetadataNeeded) {
     *   data += logTags(note);
     * }
     */
    /*
     * if (isComplex(note)) {
     *   // content = processResources(note, content);
     * }
     */
    const markdown = convertHtml2Md(content);

    data += markdown;
    /*
     * if (yarleOptions.isMetadataNeeded) {
     *   const metadata = getMetadata(note);
     *   data += metadata;
     * }
     */

    // returns .md text string
    const noteFileName = getNoteFileName(note, zip);

    const notesFolder = zip.folder('notes');
    notesFolder.file(noteFileName, data);

    console.log(`Note ${title} converted successfully.`);
  } catch (e) {
    console.log(`Failed to convert note: ${title}`, e);
    failArr.push(title);
  }
};
