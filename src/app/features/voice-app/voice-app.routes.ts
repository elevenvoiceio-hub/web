import { Routes } from '@angular/router';

export const voiceAppRoutes: Routes = [
  {
    path: 'tts',
    loadComponent: () =>
      import('./pages/tts/tts').then((m) => m.Tts),
    title: 'Text to Speech',
  },
  {
    path: 'stt',
    loadComponent: () =>
      import('./pages/stt/stt').then((m) => m.Stt),
    title: 'Speech to Text',
  },
  {
    path: 'clone',
    loadComponent: () =>
      import('./pages/cloning/cloning').then((m) => m.Cloning),
    title: 'Voice Cloning',
  },
  {
    path:'voices',
    loadComponent: () =>
      import('./pages/voices/voices').then((m) => m.Voices),
    title: 'Voices',
  },{
    path: '**',
    redirectTo: 'tts',
  }
];
