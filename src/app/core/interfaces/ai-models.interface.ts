export interface IAiModel {
  id: number;
  provider: string;
  model_name: string;
  api_key: string;
  active: boolean;
  is_stt: boolean;
  is_tts: boolean;
  is_clone: boolean;
  gcp_config?: string; // Optional field for GCP specific configuration
}
