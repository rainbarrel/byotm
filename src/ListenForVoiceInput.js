// import { recognizer } from './helpers';

// const listenForVoiceInput = async () => {
//   console.log("Start Mic clicked");
//   await recognizer.ensureModelLoaded();

//   // See the array of words that the recognizer is trained to recognize.
//   console.log(`wordLabels: ${recognizer.wordLabels()}`);

//   document.getElementById('start').disabled = true;
//   document.getElementsByClassName('alert-container')[0].hidden = false;
//   const previousButton = document.getElementById('previous');
//   const nextButton = document.getElementById('next');

//   recognizer.listen(result => {
//     // - result.scores contains the probability scores that correspond to
//     // recognizer.wordLabels().
//     // - result.spectrogram contains the spectrogram of the recognized word.
//     // console.log(result);

//     const next     = result.scores[0];
//     const previous = result.scores[1];
//     const neutral  = result.scores[2];

//     if (previous > next && previous > neutral) {
//       previousButton.classList.toggle('active');
//       // updateCommand('previous');

//       setTimeout(() => {
//         previousButton.classList.toggle('active');
//       }, 1000)
//     }
//     else if (next > previous && next > neutral) {
//       nextButton.classList.toggle('active');
//       // updateCommand('next');

//       setTimeout(() => {
//         nextButton.classList.toggle('active');
//       }, 1000)
//     }
//   }, {
//     includeSpectrogram: false,
//     probabilityThreshold: 0.80,
//     invokeCallbackOnNoiseAndUnknown: true,
//     overlapFactor: 0.50
//   });
// }

// export default listenForVoiceInput;
