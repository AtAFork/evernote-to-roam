// specifically referencing it here so i know i edited the source
import JSZip from 'jszip';
import { writeFile } from 'browserify-fs';
import { promisify } from 'util';
import { dropTheRope } from './yarle/dist/yarle.js';

const pWriteFile = promisify(writeFile);

const enexName = 'notes.enex';

const options = {
  enexFile: enexName,
  outputDir: './out/',
  isZettelkastenNeeded: false,
  // keep this false for now so i can comment out moment
  isMetadataNeeded: false,
};

const convert = async (file) => {
  const buffer = await file.arrayBuffer();
  await pWriteFile(enexName, buffer);

  const zip = new JSZip();

  // do the conversion
  await dropTheRope(options, zip);
  const content = await zip.generateAsync({ type: 'base64' });

  window.location.href = `data:application/zip;base64,${content}`;
};

const uploadFile = (file, i) => {
  convert(file);
};

const handleFiles = (e) => {
  let { target: { files } } = e;
  files = [...files];
  files.forEach(uploadFile);
};

const setup = () => {
  // if (!document.getElementById('fileElem')) {
  const div = document.createElement('div');

  const input = document.createElement('input');
  input.type = 'file';
  input.id = 'fileElem';
  input.accept = '.enex';
  input.multiple = true;
  input.addEventListener('change', handleFiles);

  const form = document.createElement('form');
  form.appendChild(input);
  form.id = 'form-id';
  div.appendChild(form);

  const h3 = document.createElement('h3');
  h3.style = 'margin-left: 10px';
  const text = document.createTextNode('Upload .enex file');
  h3.appendChild(text);
  div.appendChild(h3);

  const element = document.getElementById('input');
  element.appendChild(div);
  // }
};

setup();
