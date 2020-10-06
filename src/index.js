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

  const resultDiv = document.getElementById('result');
  const aId = 'downloadButton';
  const buttonExists = document.getElementById(aId);
  if (buttonExists) {
    buttonExists.remove();
  }
  const a = document.createElement('a');
  a.setAttribute('id', aId);
  a.setAttribute('href', `data:application/zip;base64,${content}`);
  // a.target = '_blank';
  a.setAttribute('download', 'converted_notes.zip');

  const button = document.createElement('button');
  const text = document.createTextNode('Download .md files');
  button.appendChild(text);
  a.appendChild(button);
  resultDiv.prepend(a);
};

const uploadFile = (file, i) => {
  convert(file);
};

const handleFiles = (e) => {
  let { target: { files } } = e;
  files = [...files];
  files.forEach(uploadFile);
};

const favicon = () => {
  const head = document.querySelector('head');
  const fav = document.createElement('link');
  fav.setAttribute('rel', 'shortcut icon');
  fav.setAttribute('href', '/evernote-to-roam/favicon.ico');
  head.appendChild(fav);
};

const setup = () => {
  favicon();

  const divId = 'e2r-container';
  const divExists = document.getElementById(divId);
  if (divExists) {
    divExists.remove();
  }
  const div = document.createElement('div');
  div.setAttribute('id', divId);
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('id', 'fileElem');
  input.setAttribute('accept', '.enex');
  input.setAttribute('multiple', true);
  input.addEventListener('change', handleFiles);

  const h3 = document.createElement('h3');
  h3.setAttribute('style', 'margin-left: 20px');
  const text = document.createTextNode('Upload .enex file');
  h3.appendChild(text);
  div.appendChild(h3);

  const form = document.createElement('form');
  form.appendChild(input);
  form.setAttribute('id', 'form-id');
  div.appendChild(form);

  const element = document.getElementById('input');
  element.appendChild(div);
};

setup();
