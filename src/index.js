console.log('hi there adam');
const testEnex = './test.enex';
console.log('hi there adam2');

const yarle = require('../node_modules/yarle/dist/yarle.js');
console.log('hi there adam3');

// how to not even put to a folder but rather a data stream in the browser

const hi = async ()=>{
    await console.log('hii');
}

hi();

const options = {
    // const options: YarleOptions = {
    enexFile: 'test2.enex',
    outputDir: './out/',
    isZettelkastenNeeded: true,
    isMetadataNeeded: false,
};
yarle.dropTheRope(options);

console.log('hi there adam');
