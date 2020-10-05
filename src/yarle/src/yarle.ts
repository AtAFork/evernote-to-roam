/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as flow from 'xml-flow';
// @ts-ignore
import { createReadStream } from 'browserify-fs';
import * as JSZip from 'jszip';
import { YarleOptions } from './YarleOptions';
import { processNode } from './process-node';

// eslint-disable-next-line import/no-mutable-exports
export let yarleOptions: YarleOptions = {
  enexFile: 'notebook.enex',
  outputDir: './mdNotes',
  isMetadataNeeded: false,
  isZettelkastenNeeded: false,
  plainTextNotesOnly: false,
};

const setOptions = (options: YarleOptions): void => {
  yarleOptions = { ...yarleOptions, ...options };
};

export const parseStream = async (options: YarleOptions, zip: JSZip): Promise<void> => {
  const stream = createReadStream(options.enexFile);
  /*
   * const xml = new XmlStream(stream);
   * let noteNumber = 0;
   * const failed = 0;
   * const totalNotes = 0;
   */
  const failArr: (string | number)[] | PromiseLike<(string | number)[]> = [];

  const xmlStream = await flow(stream);

  return new Promise((resolve, reject) => {
    const logAndReject = (error: Error) => {
      console.log(`Could not convert ${options.enexFile}:\n${error.message}`);
      // eslint-disable-next-line no-plusplus
      // ++failed;

      return reject();
    };
    xmlStream.on('tag:en-export', (enExport: any) => {
      // eslint-disable-next-line no-ternary
      // totalNotes = Array.isArray(enExport.note) ? enExport.note.length : 1;
    });
    xmlStream.on('tag:note', (note: any) => {
      processNode(note, zip, failArr);
      // eslint-disable-next-line no-plusplus
      /*
       * ++noteNumber;
       * console.log(`Notes processed: ${noteNumber}`);
       */
    });
    xmlStream.on('end', () => {
      const div = document.getElementById('result');
      let result;
      if (failArr.length > 0) {
        result = `The following notes failed to convert (either too complex e.g. with image attachments or another error):\n\n${failArr}`;
      } else {
        result = 'Hooray! All notes were converted, enjoy!';
      }
      const p = document.createElement('p');
      const text = document.createTextNode(result);
      p.appendChild(text);
      div.appendChild(p);
      resolve();
    });
    /*
     * const success = noteNumber - failed;
     * console.log(
     *   `Conversion finished: ${success} succeeded, ${
     *     totalNotes - success
     *   } failed.`,
     * );
     */

    xmlStream.on('error', logAndReject);
    stream.on('error', logAndReject);
  });
};

export const dropTheRope = async (options: YarleOptions, zip: JSZip): Promise<any> => {
  setOptions(options);
  try {
    return await parseStream(options, zip);
  } catch (error) {
    console.log(error);
  }
};
// tslint:enable:no-console
