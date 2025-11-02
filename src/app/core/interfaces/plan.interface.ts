export interface IPlan {
  id: number | null;
  name: string;
  price: {
    monthly?: number | string;
    yearly?: number | string;
    lifetime?: number | string;
  };
  description: string;
  features: string[];
  limitations: string[];
  old_price: number;
  duration_days: number;
  is_popular: boolean;
  character_limit: number;
  voice_limit: number;
  default_character_limit: number;
  discount: number;
  on_offer: boolean;
  plan_id: string;
}
