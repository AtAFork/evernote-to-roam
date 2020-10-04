/* eslint-disable @typescript-eslint/ban-ts-comment */
// getComplexFilePath, getSimpleFilePath

// @ts-ignore
import * as fs from 'browserify-fs';

import * as util from 'util';

import {
  getMetadata, getNoteContent, getTitle, isComplex, logTags, getNoteFileName,
} from './utils';
import { yarleOptions } from './yarle';
/*
 * import { writeMdFile } from './utils/file-utils';
 * import { processResources } from './process-resources';
 */

import { convertHtml2Md } from './convert-html-to-md';

const writeFile = util.promisify(fs.writeFile);

// eslint-disable-next-line import/prefer-default-export
export const processNode = async (note: any): Promise<void> => {
  console.log('before gettitel');
  const title = getTitle(note);

  console.log(`Converting note ${title}...`);
  console.log('before try');

  try {
    let data = '';
    console.log('before getnotecontent');

    const content = getNoteContent(note);
    /*
     * const absFilePath = isComplex(note)
     *   ? getComplexFilePath(note)
     *   : getSimpleFilePath(note);
     */

    console.log('before logtags');

    data += title;
    if (yarleOptions.isMetadataNeeded) {
      data += logTags(note);
    }
    if (isComplex(note)) {
      console.log('Failed to process, too complex');
      return;
      // content = processResources(note, content);
    }
    console.log('before convertHtml2Md');

    const markdown = convertHtml2Md(content);

    data += markdown;
    if (yarleOptions.isMetadataNeeded) {
      const metadata = getMetadata(note);
      data += metadata;
    }

    console.log('before getnotefilename');
    console.log(note);
    // make this a promise and then have in the callback the writefile to it
    const noteFileName = await getNoteFileName('notes/', note);

    console.log('right before writefile');
    console.log(`file name: ${noteFileName}`);
    console.log(`file name type: ${typeof noteFileName}`);

    // need a get name here to sanitize it
    await writeFile(noteFileName, note);

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
