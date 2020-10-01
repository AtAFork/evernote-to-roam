// specifically referencing it here so i know i edited the source
import yarle from './yarle/dist/yarle.js';

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
yarle.dropTheRope(options);

console.log('hi there adam');
