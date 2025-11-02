import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { ACCENTS } from '../../constants/accents.constants';
import { STT_EMOTIONS } from '../../constants/emotions.constant';
import { LANGUAGES } from './../../constants/language.constant';
import { Component, input, model } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { FormsModule } from '@angular/forms';
import { HlmInput } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-voices-filter',
  imports: [
    BrnSelectImports,
    HlmSelectImports,
    NgIcon,
    FormsModule,
    HlmInput,
  ],
  templateUrl: './voices-filter.html',
  styleUrl: './voices-filter.css',
  providers: [provideIcons({ lucideSearch })],
})
export class VoicesFilter {
  languages = input<any[]>([]);
  genders = ['Any', 'Male', 'Female'];
  accents = input(ACCENTS);
  emotions = input(STT_EMOTIONS);

  language = model<any>();
  gender = model('');
  accent = model('');
  emotion = model('');

  searchText = model('');
}
