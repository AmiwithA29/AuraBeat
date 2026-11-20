<div align="center">
  <h1>🎧 AuraMood — Music & Books Curated To Heal Your Vibe</h1>
  <p>
    <strong>An AI-powered, mood-adaptive web platform that reads facial expressions via webcam, speaks empathetic voice notes, and curates personalized music & audiobooks.</strong>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20TypeScript-007ACC?style=for-the-badge" />
    <img src="https://img.shields.io/badge/Backend-Firebase%20%26%20REST%20APIs-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
    <img src="https://img.shields.io/badge/AI%20Vision-Webcam%20Mood%20Analysis-FF4B6E?style=for-the-badge" />
    <img src="https://img.shields.io/badge/Audio-Web%20Speech%20%26%20Streaming-1DB954?style=for-the-badge" />
  </p>
</div>

---

## 📖 Website Overview (Parichay)

**AuraMood** is designed as a therapeutic, mood-responsive digital sanctuary. Instead of forcing users to manually search through endless playlists when feeling overwhelmed or distracted, AuraMood uses a **10-Second Facial Mood Scan** via the user's webcam to detect emotional states with confidence scoring[span_2](start_span)[span_2](end_span).

Once the mood is identified (or manually chosen), the platform's **AI Companion** speaks a natural, comforting voice note and pairs **1 tailored song** with **1 uplifting audiobook**—all playable through a persistent, lossless-style bottom media player[span_3](start_span)[span_3](end_span).

---

## ✨ Key Features

- **📸 10-Second Facial Mood Analysis:** Real-time webcam emotion scanning with confidence metrics (e.g., *96.8% Confidence*)[span_4](start_span)[span_4](end_span).
- **🎛️ Instant Manual Mood Overrides:** One-click vibe switching across 5 core emotional states:
  - `Low & Healing` | `Happy` | `Calm & Chill` | `Stressed` | `Deep Focus`[span_5](start_span)[span_5](end_span)
- **🗣️ AI Voice Companion:** Synthesized natural voice notes (`AI Voice: ON/OFF` toggle + `Replay Voice Note`) tailored to comfort or energize the user[span_6](start_span)[span_6](end_span).
- **🎵 Dual-Media Curation (Music + Audiobooks):** Simultaneously pairs mood-matched music tracks with uplifting audiobooks[span_7](start_span)[span_7](end_span).
- **📚 Personal Library & Guest Mode:** Save favorite tracks and audiobooks to `Your Library` with seamless Guest or authenticated Firebase user sessions[span_8](start_span)[span_8](end_span).
- **🎚️ Persistent Bottom Media Player:** Sleek floating audio bar featuring album artwork, interactive timeline scrubber, playback controls, and `Lossless 432Hz` audio badge[span_9](start_span)[span_9](end_span).

---

## 🛠️ Tech Stack & Tools Used

| Layer | Technologies & APIs | Purpose |
| :--- | :--- | :--- |
| **Frontend & UI** | HTML5, Modern CSS3 (Dark Glassmorphism), TypeScript / JavaScript | Responsive dark-mode UI, animated scanner ring, and interactive player controls[span_10](start_span)[span_10](end_span) |
| **AI & Computer Vision** | Browser MediaDevices API (`getUserMedia`), Facial Emotion Recognition (`face-api.js`) | 10-second live webcam capture and facial expression classification[span_11](start_span)[span_11](end_span) |
| **Voice Synthesis** | Web Speech API (`SpeechSynthesis`) | Real-time AI companion voice notes and playback controls[span_12](start_span)[span_12](end_span) |
| **Backend & Database** | Firebase (Authentication & Cloud Firestore) | User/Guest state management and persistent `Your Library` storage[span_13](start_span)[span_13](end_span) |
| **Media & Content** | Music Streaming & Audio APIs, Curated Audiobook Metadata | Fetching track artwork, audio streams, and mood-paired books[span_14](start_span)[span_14](end_span) |

---

## ⚙️ How It Works (System Flow)

```text
[User Opens AuraMood]
        │
        ├──► (Option A) 10-Second Webcam Scan ──► Facial Expression Analysis ──► Confidence Score (%)
        └──► (Option B) Manual Mood Pill Selection (Low & Healing / Happy / Chill / Stressed / Focus)
                                                        │
                                                        ▼
                                     [AI Voice Companion Speaks Note]
                                                        │
                        ┌───────────────────────────────┴───────────────────────────────┐
                        ▼                                                               ▼
        [Curates 1 Matching Song]                                      [Curates 1 Uplifting Audiobook]
                        │                                                               │
                        └───────────────────────────────┬───────────────────────────────┘
                                                        ▼
                             [Plays in Persistent Bottom Bar / Save to Library]
