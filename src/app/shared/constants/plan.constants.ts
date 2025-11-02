export const PLAN_CONSTANTS = [
  {
    plan_name: 'Start for free',
    monthly_price: 'Free',
    yearly_price: 'Free',
    description:
      'Generate unlimited voiceovers, but without downloads or commercial usage rights',
    features: [
      'Unlimited voiceover generation',
      'Access to 1000+ AI voices',
      'Basic voice customization',
    ],
    limitations: [
      'No voiceover downloads',
      'No dubbing downloads',
      'No commercial usage rights',
      'No Avatars Cloning',
      'No Voice Cloning',
    ],
    button_text: 'Select Plan',
    button_link:
      'https://studio.speechify.com/onboarding?source_page=_pricing-studio_&source_category=pricing-studio&source_locale=en&source_section=block-v2-payment-plans',
  },
  {
    plan_name: 'Basic',
    tag: 'MOST POPULAR',
    monthly_price: '$69',
    yearly_price: '$288',
    description:
      'Generate voiceovers with downloads, dubbing access, and commercial usage',

    is_popular: true,
    features: [
      'Unlimited voiceover creation',
      'Access to 1000+ AI voices',
      'Advanced voice customization',
      '4h of voiceover downloads per month',
      '1h of dubbing downloads per month',
      'Commercial usage rights',
    ],
    limitations: ['No Avatars Cloning', 'No Voice Cloning'],
    button_text: 'Select Plan',
    button_link:
      'https://studio.speechify.com/onboarding?source_page=_pricing-studio_&source_category=pricing-studio&source_locale=en&source_section=block-v2-payment-plans',
  },
  {
    plan_name: 'Professional',
    monthly_price: '$99',
    yearly_price: '$385',
    description:
      'Generate voiceovers with cloning, full dubbing access, and AI avatars',
    features: [
      'Unlimited voice generation',
      'Access to 1000+ AI voices',
      'Advanced voice customization',
      '8h of voiceover downloads per month',
      '3h of dubbing downloads per month',
      'Commercial usage rights',
      'Unlimited voice cloning',
      '5min of AI avatar downloads per month',
      'Voice Changer',
      'Speech Clean Up',
    ],
    limitations: [],
    button_text: 'Contact Sales',
    button_link: '/voiceover-studio-contact/',
  },
];
