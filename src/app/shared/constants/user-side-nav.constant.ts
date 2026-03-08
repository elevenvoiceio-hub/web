import { environment } from '../../../environments/environment';

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
    },
    {
      title: 'Billing',
      url: '/billing',
      icon: 'lucideCreditCard',
    },
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

export const ADMIN_SIDE_NAV_CONSTANT = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/admin/dashboard',
      icon: 'lucideLayoutDashboard',
    },
    {
      title: 'Users',
      url: '/admin/users',
      icon: 'lucideUsers',
    },
    {
      title: 'AI Management',
      url: '/admin/ai-management',
      icon: 'remixAiGenerate2',
    },
    {
      title: 'Plan Management',
      url: '/admin/plan-management',
      icon: 'remixCoinsFill',
    },
    {
      title: 'Voice Management',
      url: '/admin/voice-management',
      icon: 'lucideMicVocal',
    },
    {
      title: 'Email Settings',
      url: '/admin/email-settings',
      icon: 'lucideMail',
    },
    {
      title: 'Razorpay Settings',
      url: '/admin/payment-gateway-settings',
      icon: 'lucideCreditCard',
    },
    {
      title: 'Service Requests',
      url: '/admin/service-requests',
      icon: 'remixFeedbackLine',
    },
  ],
};

export const SUBADMIN_SIDE_NAV_CONSTANT = {
  navMain: [
    {
      title: 'Users',
      url: '/subadmin/users',
      icon: 'lucideUsers',
    },
    {
      title: 'Service Requests',
      url: '/subadmin/service-requests',
      icon: 'remixFeedbackLine',
    },
  ],
};
