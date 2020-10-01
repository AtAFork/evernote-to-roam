/* eslint-disable @typescript-eslint/ban-ts-comment */
// getComplexFilePath, getSimpleFilePath

// @ts-ignore
import * as fs from 'browserify-fs';
import {
  getMetadata, getNoteContent, getTitle, isComplex, logTags, getNoteFileName,
} from './utils';
import { yarleOptions } from './yarle';
/*
 * import { writeMdFile } from './utils/file-utils';
 * import { processResources } from './process-resources';
 */

import { convertHtml2Md } from './convert-html-to-md';

// eslint-disable-next-line import/prefer-default-export
export const processNode = async (note: any): Promise<void> => {
  const title = getTitle(note);

  console.log(`Converting note ${title}...`);
  try {
    let data = '';
    const content = getNoteContent(note);
    /*
     * const absFilePath = isComplex(note)
     *   ? getComplexFilePath(note)
     *   : getSimpleFilePath(note);
     */

    data += title;
    if (yarleOptions.isMetadataNeeded) {
      data += logTags(note);
    }
    if (isComplex(note)) {
      console.log('Failed to process, too complex');
      return;
      // content = processResources(note, content);
    }

    const markdown = convertHtml2Md(content);

    data += markdown;
    if (yarleOptions.isMetadataNeeded) {
      const metadata = getMetadata(note);
      data += metadata;
    }

    // make this a promise and then have in the callback the writefile to it
    const noteFileName = await getNoteFileName('notes/', note);

    // need a get name here to sanitize it
    await fs.writeFile(noteFileName, note);

    console.log('-------------title----------------------');
    console.log(title);
    console.log('-------------data (contains markdown)----------------------');
    console.log(data);
    console.log('-------------note----------------------');
    console.log(note);

    // writeMdFile(absFilePath, data, note);
  } catch (e) {
    console.log(`Failed to convert note: ${title}`, e);
  }
  console.log(`Note ${title} converted successfully.`);
};
