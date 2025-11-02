
# ai-awaaz Web Frontend

This directory contains the frontend code for ai-awaaz, built with Angular. It provides the user interface for interacting with the backend voice, speech, and subscription services.

## Features
- Modern Angular SPA for voice and speech services
- User authentication and management
- Voice selection, playback, and cloning UI
- Feedback and support ticket submission
- Subscription management and payment integration

## Project Structure
- `src/` - Main Angular source code
  - `app/` - Application modules and components
  - `assets/` - Static assets (images, audio, etc.)
  - `environments/` - Environment configs
- `libs/ui/` - Shared UI components
- `public/` - Public static files
- `angular.json` - Angular CLI config
- `package.json` - NPM dependencies

## Setup
1. Install dependencies:
	```bash
	npm install
	```
2. Run the development server:
	```bash
	npm start
	```
3. Build for production:
	```bash
	npm run build
	```

## Notes
- Connects to the backend Django server for all API calls.
- Update environment variables in `src/environments/` as needed.

## License
MIT License
