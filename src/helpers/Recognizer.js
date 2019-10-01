// import * as tf from '@tensorflow/tfjs';
import * as speechCommands from '@tensorflow-models/speech-commands';
import { MODEL_JSON, METADATA_JSON } from './Constants';

const recognizer = speechCommands.create(
  'BROWSER_FFT',
  undefined,
  MODEL_JSON,
  METADATA_JSON,
);

export { recognizer };
