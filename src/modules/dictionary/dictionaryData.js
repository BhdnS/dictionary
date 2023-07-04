import Dictionary from './Dictionary';

const dictionaryData = new Dictionary({
  api: 'https://api.dictionaryapi.dev/api/v2/entries/en/',
  btn: document.querySelector('#submit'),
  input: document.querySelector('#input'),
  wiki: document.querySelector('#wiktionary'),
  img: document.querySelector('#img'),
  audio: document.querySelector('#audio'),
  word: document.querySelector('#word'),
  transcription: document.querySelector('#transcription'),
  speech: document.querySelector('#speech'),
  definition: document.querySelector('#definition'),
  synonyms: document.querySelector('#synonyms'),
  antonyms: document.querySelector('#antonyms'),
  content: document.querySelector('.content'),
});

dictionaryData.clickBtn();
dictionaryData.audioResp();
