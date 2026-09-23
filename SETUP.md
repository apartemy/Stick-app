# RNR Archive Platform Setup

## Overview
Archive platform for Radio Zeedijk RNR live performances. Store, organize, and stream recorded performances.

## Local Development

1. Install dependencies (already done):
```bash
npm install
```

2. Create `.env.local` from `.env.example`:
```bash
cp .env.example .env.local
```

3. Run dev server:
```bash
npm run dev
```

Server runs at `http://localhost:5173`

## Configuration

### Firebase Setup
1. Go to https://console.firebase.google.com
2. Create new project
3. Enable Firestore Database (Start in test mode)
4. Copy config to `.env.local`

### Cloudinary Setup
1. Go to https://cloudinary.com
2. Create free account (25GB storage included)
3. Upload MP4 streams to Cloudinary
4. Get URLs for videos
5. Copy cloud name to `.env.local`

## Data Structure

Firestore collection: `streams`

```json
{
  "id": "1",
  "episode": 11,
  "date": "2024-09-10",
  "artist": "Artist Name",
  "duration": 3600,
  "cloudinaryUrl": "https://media.cloudinary.com/...",
  "thumbnail": "https://media.cloudinary.com/..."
}
```

## Adding New Streams

1. Upload MP4 to Cloudinary
2. Get video and thumbnail URLs
3. Add document to Firestore `streams` collection

## Deployment

### Deploy to Vercel
1. Connect GitHub repo to Vercel
2. Add environment variables
3. Deploy (auto on git push)

```bash
npm run build
```

## Tech Stack
- React 19
- Vite
- Tailwind CSS
- Firebase (metadata)
- Cloudinary (video hosting)
- Plyr (video player)
