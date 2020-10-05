// specifically referencing it here so i know i edited the source
import * as JSZip from 'jszip';
import { writeFile } from 'browserify-fs';
import { promisify } from 'util';
import { dropTheRope } from './yarle/dist/yarle.js';

const pWriteFile = promisify(writeFile);

const options = {
  /*
   * const options: YarleOptions = {
   * const options: YarleOptions = {
   */
  enexFile: 'test2.enex',
  outputDir: './out/',
  isZettelkastenNeeded: true,
  isMetadataNeeded: false,
};

// need another funciton to handle upload

// !!!!!!! start here next time: plan is to create zip obj, pass it to yarle, do the "adding" to the folder there (like in twoo.file below) so i can skip writing to fs, then return that zip obj and call await generateAsync({type: 'base64'}), then pass result to window.location.href

// trigger this when they press button
const convert = async () => {
  // get the uploaded file called *.enex
  console.log('after droptherope');

  const zip = new JSZip();

  const twoo = zip.folder('twoo');
  console.log('before file');
  twoo.file('Hello.txt', 'Hello World\n');

  /*
   * const img = zip.folder('images');
   * img.file('smile.gif', imgData, { base64: true });
   */

  const content = await zip.generateAsync({ type: 'base64' });
  console.log(typeof content);

  // async (content) => {
  console.log('inside then');
  /*
   * see FileSaver.js
   * saveAs(content, 'example.zip');
   */
  // await pWriteFile('./allnotes.zip', content);
  console.log('after zip');
  // }

  // do the conversion
  zip = await dropTheRope(options);

  window.location.href = `data:application/zip;base64,${content}`;
};

convert();
console.log('hi there adam');
