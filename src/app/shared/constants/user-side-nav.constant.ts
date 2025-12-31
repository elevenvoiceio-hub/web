import { environment } from "../../../environments/environment";

export const USER_SIDE_NAV_CONSTANT = {
		navMain: [
			{
				title: 'Text to Speech',
				url: '/app/tts',
				icon: 'lucideMic',
			},
			{
				title: 'Cloning',
				url: '/app/clone',
				icon: 'lucideSquareStack',
			},
			{
				title: 'Speech to Text',
				url: '/app/stt',
				icon: 'remixVoiceRecognitionLine',
			},
			{
				title: 'Voices',
				url: '/app/voices',
				icon: 'lucideMicVocal',
			},{
        title: 'Billing',
        url: '/billing',
        icon: 'lucideCreditCard',
      }

		],
		navSecondary: [
			{
				title: 'Share Feedback',
				url: '/feedback',
				icon: 'remixFeedbackLine',
			},
			{
				title: 'Terms & Conditions',
				url: `${environment.welcomeWebsite}/terms-and-conditions`,
				icon: 'lucideBookCheck',
			},
		],
	};
