/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// getComplexFilePath, getSimpleFilePath

// @ts-ignore
import { writeFile } from 'browserify-fs';

import { promisify } from 'util';

import {
  getMetadata, getNoteContent, getTitle, isComplex, logTags, getNoteFileName,
} from './utils';
import { yarleOptions } from './yarle';

import { convertHtml2Md } from './convert-html-to-md';

const pWriteFile = promisify(writeFile);

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
    const noteFileName = `./notes/${await getNoteFileName('notes/', note)}`;

    
    /*
     * console.log('right before writefile');
     * console.log(`file name: ${noteFileName}`);
     */

    await pWriteFile(noteFileName, data);

    console.log('-------------title----------------------');
    console.log(title);
    // console.log('-------------data (contains markdown)----------------------');
    // console.log(data);
    // console.log('-------------note----------------------');
    // console.log(note);

    console.log(`Note ${title} converted successfully.`);
  } catch (e) {
    console.log(`Failed to convert note: ${title}`, e);
  }
};
