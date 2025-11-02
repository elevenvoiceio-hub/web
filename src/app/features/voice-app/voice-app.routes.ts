import { Routes } from '@angular/router';

export const voiceAppRoutes: Routes = [
  {
    path: 'text-to-speech',
    title: 'Text to Speech',
    children: [
      {
        path: ':voiceId',
        loadComponent: () =>
          import('./pages/text-to-speech/text-to-speech').then(
            (m) => m.TextToSpeech
          ),
      },
      {
        path: '',
        loadComponent: () =>
          import('./pages/text-to-speech/text-to-speech').then(
            (m) => m.TextToSpeech
          ),
      },
    ],
  },
  {
    path: 'voice-cloning',
    loadComponent: () =>
      import('./pages/voice-cloning/voice-cloning').then((m) => m.VoiceCloning),
    title: 'Voice Cloning',
  },
  {
    path: 'speech-to-text',
    loadComponent: () =>
      import('./pages/speech-to-text/speech-to-text').then(
        (m) => m.SpeechToText
      ),
    title: 'Speech to Text',
  },
  {
    path: 'voices',
    loadComponent: () => import('./pages/voices/voices').then((m) => m.Voices),
    title: 'Voices',
  },
  {
    path: '**',
    redirectTo: 'text-to-speech',
    pathMatch: 'full',
  },
];
