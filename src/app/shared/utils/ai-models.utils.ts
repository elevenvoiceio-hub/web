export const GET_ICON_NAME = (name: string | undefined) => {
  switch (name) {
    case 'openai':
      return 'remixOpenaiFill';
    case 'gcp':
      return 'remixGoogleFill';
    case 'azure':
      return 'remixMicrosoftFill';
    case 'speechify':
      return 'lucideAudioWaveform';
    case 'elevenlabs':
      return 'remixPauseLargeFill';
    case 'lemonfox':
      return 'gameFoxHead';
    case 'labs':
      return 'remixRobot3Line';
    default:
      return 'remixOpenaiFill';
  }
};

export const GET_NAME = (name: string | undefined) => {
  switch (name) {
    case 'openai':
      return 'OpenAI';
    case 'gcp':
      return 'GCP';
    case 'azure':
      return 'Microsoft Azure';
    case 'speechify':
      return 'Speechify';
    case 'elevenlabs':
      return 'Eleven Labs';
    case 'lemonfox':
      return 'Lemon Fox';
    case 'labs':
      return 'GenAI Pro';
    default:
      return name;
  }
};
