export const getAudioURL = (audioData) => {
  let audio = audioData.hwi.hasOwnProperty("prs")
    ? audioData.hwi.prs[0].hasOwnProperty("sound")
      ? audioData.hwi.prs[0].sound.audio
      : ""
    : "";
  let audioURL = "https://media.merriam-webster.com/audio/prons/en/us/mp3";
  if (audio.startsWith("bix")) {
    audioURL = `${audioURL}/bix/${audio}.mp3`;
  } else if (audio.startsWith("gg")) {
    audioURL = `${audioURL}/gg/${audio}.mp3`;
  } else if (!!audio.match(/^[.,!?:]/) || !!audio.match(/^[0-9]/)) {
    audioURL = `${audioURL}/number/${audio}.mp3`;
  } else {
    audioURL = `${audioURL}/${audio.charAt(0)}/${audio}.mp3`;
  }

  return audioURL;
};
