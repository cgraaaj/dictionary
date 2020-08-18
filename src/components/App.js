import React from 'react';
import SearchBar from './SearchBar';

import dict from '../apis/dict';
import WordList from '../components/WordList';
// https://media.merriam-webster.com/audio/prons/en/us/mp3/f/fucker01.mp3,

class App extends React.Component {
   state = {
      words: [],
      sword: '',
      audio: '',
   };

   componentDidMount() {
      this.onTermSubmit('Raj Lincoln');
   }

   onTermSubmit = async (term) => {
      const response = await dict.get(
         // `/thesaurus/json/${term}?key=51d55996-3ce3-4260-8603-2f14f419e7e3`,
         // `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${term}?key=51d55996-3ce3-4260-8603-2f14f419e7e3`,
         `/collegiate/json/${term}?key=ee2768a1-8b8e-4617-a361-9072d8efc137`,
         {
            headers: {
               'content-type': 'application/json',
            },
         }
      );
      if (!response.data[0].hasOwnProperty('meta')) {
         this.setState({
            words: '',
         });
      } else {
         // if (response.data[0].hwi.hasOwnProperty('prs')) {
         //    console.log(response.data[0].hwi.prs[0].sound.audio);
         // }
         this.setState({
            words: response.data,
            sword: term,
            audio: response.data[0].hwi.hasOwnProperty('prs')
               ? response.data[0].hwi.prs[0].sound.audio
               : '',
         });
      }
   };

   playAudio = () => {
      if (this.state.audio !== '') {
         const audioEl = document.getElementsByClassName('audio-element')[0];
         audioEl.play();
      } else {
      }
   };

   getAudio = () => {
      if (this.state.audio.startsWith('bix')) {
         return 'bix';
      } else if (this.state.audio.startsWith('gg')) {
         return 'gg';
      } else if (
         !!this.state.audio.match(/^[.,!?:]/) ||
         !!this.state.audio.match(/^[0-9]/)
      ) {
         return 'number';
      } else {
         return this.state.audio.charAt(0);
      }
   };

   renderDef = () => {
      return (
         <div>
            <i className="volume up icon" onClick={this.playAudio}></i>
            {this.state.audio !== '' ? (
               <audio
                  className="audio-element"
                  src={`https://media.merriam-webster.com/audio/prons/en/us/mp3/${this.getAudio()}/${
                     this.state.audio
                  }.mp3`}
               ></audio>
            ) : null}
            <div>{this.state.sword}</div>
            <div className="five wide column">
               <WordList words={this.state.words} sword={this.state.sword} />
            </div>
         </div>
      );
   };

   render() {
      return (
         <div className="ui container">
            <SearchBar onFormSubmit={this.onTermSubmit}></SearchBar>
            {this.state.words.length > 0 ? (
               this.renderDef()
            ) : (
               <img src="https://66.media.tumblr.com/20d9f53297a8984a7455d6f5bc336c58/e05115941f982421-ff/s500x750/72493d1229f97a31dddb0fb58a391724cb3e2609.gif"></img>
            )}
         </div>
      );
   }
}

export default App;
