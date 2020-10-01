/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-negated-condition */
/* eslint-disable multiline-ternary */
/* eslint-disable require-unicode-regexp */
/* eslint-disable no-ternary */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-named-capture-group */

// import * as fs from 'fs';

// @ts-ignore
import * as fs from 'browserify-fs';

import * as moment from 'moment';

// import { yarleOptions } from '../yarle';

const FILENAME_LENGTH = 50;
const FILENAME_DELIMITER = '_';

export const getFileIndex = async (dstPath: string, fileNamePrefix: string): Promise<string | number> => {
  const files = await fs.readdir(dstPath);
  console.log('does it readdir properly?');
  const index = files.filter((file: string | string[]) => file.indexOf(fileNamePrefix) > -1)
    .length;

  return index;
};
export const getResourceFileName = async (workDir: string, resource: any) => {
  const UNKNOWNFILENAME = 'unknown_filename';

  const extension = getExtension(resource);
  let fileName = UNKNOWNFILENAME;

  if (resource['resource-attributes'] && resource['resource-attributes']['file-name']) {
    const fileNamePrefix = resource['resource-attributes']['file-name'].substr(0, 50);

    fileName = fileNamePrefix.split('.')[0];
  }

  const index = await getFileIndex(workDir, fileName);
  const fileNameWithIndex = index > 0 ? `${fileName}.${index}` : fileName;

  return `${fileNameWithIndex}.${extension}`;
};

export const getFilePrefix = (note: any): string => {
  const cutName = (note.title ? `${note.title.toString()}` : 'Untitled').substring(0, FILENAME_LENGTH);

  return makeFilePrefixOsCompatible(cutName).toLowerCase();
};
export const makeFilePrefixOsCompatible = (name: string): string => name.replace(/(\!|\.|\;|\:|\<|\>|\"|\\|\/|\||\*|\?)/g, FILENAME_DELIMITER);

// eslint-disable-next-line require-await
export const getNoteFileName = async (dstPath: string, note: any): Promise<string> => `${getNoteName(dstPath, note)}.md`;

export const getExtensionFromResourceFileName = (resource: any): string => {
  if (!(resource['resource-attributes']
      && resource['resource-attributes']['file-name'])) {
    return undefined;
  }
  const splitFileName = resource['resource-attributes']['file-name'].split('.');

  return splitFileName.length > 1 ? splitFileName[splitFileName.length - 1] : undefined;
};
export const getExtensionFromMime = (resource: any): string => {
  const { mime } = resource;
  if (!mime) {
    return undefined;
  }
  const splitMime = mime.split('/');

  return splitMime.length > 1
    ? splitMime[1] : undefined;
};

export const getExtension = (resource: any): string => {
  const UNKNOWNEXTENSION = 'dat';

  return getExtensionFromMime(resource) || getExtensionFromResourceFileName(resource) ||  UNKNOWNEXTENSION;
};

export const getZettelKastelId = (note: any, dstPath: string): string => moment(note.created).format('YYYYMMDDhhmm');

export const getNoteName = async (dstPath: string, note: any): Promise<string> => {
  /*
   * let noteName;
   * if (yarleOptions.isZettelkastenNeeded) {
   *   const zettelPrefix = getZettelKastelId(note, dstPath);
   *   const nextIndex = await getFileIndex(dstPath, zettelPrefix);
   *   const separator = ' ';
   *   noteName = nextIndex !== 0
   *     ? `${zettelPrefix}.${nextIndex}`
   *     : zettelPrefix;
   */

  /*
   *   noteName += getFilePrefix(note).toLowerCase() !== 'untitled' ? `${separator}${getFilePrefix(note)}` : '';
   * } else {
   */
  const fileNamePrefix = getFilePrefix(note);
  const nextIndex = await getFileIndex(dstPath, fileNamePrefix);

  const noteName = nextIndex === 0 ? fileNamePrefix : `${fileNamePrefix}.${nextIndex}`;
  // }

  return noteName;
};
