// specifically referencing it here so i know i edited the source
import { dropTheRope } from './yarle/dist/yarle.js';

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
dropTheRope(options);

console.log('hi there adam');
