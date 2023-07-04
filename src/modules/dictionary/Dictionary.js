import notFound from '../../audio/notFound.mp3';

export default class Dictionary {
  constructor(params) {
    this.api = params.api;
    this.btn = params.btn;
    this.input = params.input;
    this.wiki = params.wiki;
    this.img = params.img;
    this.audio = params.audio;
    this.word = params.word;
    this.transcription = params.transcription;
    this.speech = params.speech;
    this.definition = params.definition;
    this.synonyms = params.synonyms;
    this.antonyms = params.antonyms;
    this.content = params.content;

    this.url = '';
    this.linkWiki = '';
    this.newWord = '';
    this.data = {
      word: '',
      sourceUrls: [],
      phonetics: [],
      meanings: [],
    };
  }

  async #response() {
    this.newWord = '';
    try {
      const request = await fetch(this.url);

      if (!request.ok) {
        throw new Error('Request failed');
      }

      const response = await request.json();

      if (response.length) {
        const item = response[0];
        this.data = {
          word: item.word,
          sourceUrls: item.sourceUrls,
          phonetics: item.phonetics,
          meanings: item.meanings,
        };
        const [firstLink] = this.data.sourceUrls;
        this.linkWiki = firstLink;
      }
    } catch (error) {
      this.linkWiki = '#';
      this.newWord = 'error';
      this.data.phonetics = [{ audio: notFound }];
    }
  }

  clickBtn() {
    this.btn.addEventListener('click', async (e) => {
      e.preventDefault();
      if (this.btn && this.input.value !== '') {
        this.url = `${this.api}${this.input.value}`;
        await this.#response();
        this.#wikiResp();
        this.#wordResp();
        this.#transcriptionResp();
        this.#speechResp();
        this.#definitionResp();
        this.#synonymsResp();
        this.#antonymsResp();
        this.content.style.display = 'block';
      }
    });
  }

  #wikiResp() {
    this.wiki.href = this.linkWiki;
  }

  #wordResp() {
    if (this.newWord === 'error') {
      this.word.textContent = 'Not found';
    } else {
      const wordData = this.data.word;
      this.newWord = wordData[0].toUpperCase() + wordData.slice(1);
      this.word.textContent = this.newWord;
    }
  }

  audioResp() {
    this.img.addEventListener('click', () => {
      if (this.data.phonetics.length > 0 && this.data.phonetics[0].audio) {
        this.audio.src = this.data.phonetics[0].audio;
        this.audio.play();
      } else {
        this.audio.src = notFound;
        this.audio.play();
      }
    });
  }

  #transcriptionResp() {
    if (this.data.phonetics[0] && this.data.phonetics[0].text) {
      const transcriptionData = this.data.phonetics[0].text;
      this.transcription.textContent = transcriptionData;
    } else {
      this.transcription.textContent = 'Not found';
    }
  }

  #speechResp() {
    if (this.newWord !== 'error') {
      let text = '';
      this.data.meanings.map((e) => {
        text += `<p class="speech__text">${e.partOfSpeech}</p>`;
        return null;
      });
      this.speech.innerHTML = text;
    } else {
      this.speech.innerHTML = '<p class="speech__text">Not found</p>';
    }
  }

  #definitionResp() {
    if (this.newWord !== 'error') {
      const definitions = this.data.meanings[0]?.definitions || [];
      const text = definitions.map((e) => `<p class="definition__element">${e.definition}</p>`).join('');
      this.definition.innerHTML = text;
    } else {
      this.definition.innerHTML = '<p class="definition__element">Not found</p>';
    }
  }

  #synonymsResp() {
    if (this.newWord !== 'error' && this.data.meanings[0]?.synonyms[0]) {
      const synonyms = this.data.meanings[0]?.synonyms || [];
      const text = synonyms.map((e) => `<p class="synonyms__element">${e}</p>`).join('');
      this.synonyms.innerHTML = text;
    } else {
      this.synonyms.innerHTML = '<p class="synonyms__element">Not found</p>';
    }
  }

  #antonymsResp() {
    if (this.newWord !== 'error' && this.data.meanings[0]?.antonyms[0]) {
      const antonym = this.data.meanings[0]?.antonyms || [];
      const text = antonym.map((e) => `<p class="antonyms__element">${e}</p>`).join('');
      this.antonyms.innerHTML = text;
    } else {
      this.antonyms.innerHTML = '<p class="synonyms__element">Not found</p>';
    }
  }
}
