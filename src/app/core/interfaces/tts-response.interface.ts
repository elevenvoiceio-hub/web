export interface ISpeechifyResponse {
  message: string;
  audio_base64: string;
  format: string;
}

export interface IAzureResponse {
  message: string;
  filename: string;
  audio_base64: string;
  format: string;
}

export interface IGcpResponse {
  message: string;
  filename: string;
  audio_base64: string;
  format: string;
}

export interface IElevenLabsResponse {
  base64: string;
  filename: string;
}

export interface IGenAIProResponse {
  task_id: string;
}
