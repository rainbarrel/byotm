import * as speechCommands from '@tensorflow-models/speech-commands';

const generateRecognizer = async (modelUrl) => {
  const checkpointUrl = modelUrl + 'model.json';
  const metadataUrl = modelUrl + 'metadata.json';

  const recognizer = speechCommands.create(
    'BROWSER_FFT',
    undefined,
    checkpointUrl,
    metadataUrl,
  );

  await recognizer.ensureModelLoaded();

  return recognizer;
}

export { generateRecognizer };
