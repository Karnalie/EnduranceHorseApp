# Shared Owner/Trainer Roadmap

This document outlines how to evolve the Endurance Horse App from a single-device AsyncStorage setup to a shared, cloud-backed experience with a web dashboard and mobile client.

## Goals
- Allow owners to create horse profiles, exercise plans, and schedules from a desktop/web dashboard.
- Let trainers/grooms view weekly schedules and add training results (e.g., heart rate, notes) from mobile devices.
- Keep data in sync across owner and trainer devices with offline resilience.

## Proposed platform
- **Backend:** Firebase (Firestore) for data storage and sync, Firebase Authentication for user accounts/roles, Firebase Cloud Functions for derived data (e.g., weekly summaries), and Firebase Storage for media (photos/documents).
- **Clients:**
  - **Web dashboard (owner-focused):** React web app or Expo Router for web to manage horses, plans, and users.
  - **Mobile app (trainer/groom):** Continue the Expo/React Native app, connected to the same Firebase project.

## Data model (Firestore collections)
- `users/{userId}`: profile and role (owner, trainer, groom). Store display name, contact, role, and linked horses.
- `horses/{horseId}`: core horse profile (name, DOB, gender, ownerId, photoUrl, notes).
- `horses/{horseId}/plans/{planId}`: weekly plan documents with start date, goals, and assigned sessions.
- `horses/{horseId}/sessions/{sessionId}`: actual training sessions, either planned or ad hoc, including type, duration, metrics (heart rate, speed, distance), perceived effort, and notes.
- `horses/{horseId}/sharedUsers/{userId}`: access control metadata (role, permissions, notification preferences) for collaborators.

## Access and permissions
- Use Firebase Auth for sign-in (email/password to start).
- Firestore security rules enforce:
  - Owners can create/update/delete their horses, plans, sessions, and invited users.
  - Trainers/Grooms can read assigned horses, read plans, and create session logs; owners can optionally allow trainers to edit plans.
  - Deny cross-owner access by checking `ownerId` on horse documents.

## Sync and offline behavior
- Enable Firestore offline persistence in both web and mobile clients to keep local caches when offline.
- Use listeners (`onSnapshot`) to stream updates to the horse list, plans, and sessions in real time—no manual reloads after Add/Edit.
- For metrics entry offline, queue writes locally; Firestore will sync once connectivity returns.

## Web dashboard features (owner)
1. **Horse management:** Create/edit horse profiles; upload photos; view computed age and key stats.
2. **Plan builder:** Weekly calendar to drag/drop or add sessions (e.g., interval ride, recovery, rest); set targets like pace, duration, or heart rate zones.
3. **Sharing:** Invite trainers/grooms by email; assign permissions; select which horses they can access.
4. **Insights:** Roll-up charts of completed vs. planned sessions and average heart rate; export weekly PDF/email.

## Mobile app features (trainer/groom)
1. **Schedule view:** List upcoming sessions per horse with due dates and targets.
2. **Session logging:** Quick form to record heart rate, duration, distance, effort, and notes; attach optional photos.
3. **History:** View past sessions and trends; owner sees updates instantly through Firestore listeners.
4. **Notifications:** Local/Push reminders for scheduled sessions; push to owner when new sessions are logged.

## Migration steps from AsyncStorage
1. **Introduce Firebase client:** Add Firebase config, Auth, and Firestore helpers; feature-flag to allow local/dev mode.
2. **Replace local storage:** Switch horse list to Firestore queries with real-time listeners and offline cache.
3. **Add Auth/roles:** Gate routes by role; allow owners to invite trainers (creates Auth user + role doc).
4. **Plans and sessions:** Implement plan creation in web dashboard first, then consume in mobile schedule view; add session logging flow.
5. **Notifications & exports:** Use Cloud Functions for push notification triggers and weekly summary emails/PDFs.

## Technical considerations
- **Type safety & validation:** Use Zod or TypeScript types to validate Firestore payloads and form inputs before writes.
- **State management:** React Query or Zustand for cached queries across web and mobile; subscribe to Firestore snapshots for live updates.
- **Analytics/monitoring:** Firebase Analytics + Crashlytics for mobile; GA4 for web.
- **Environment separation:** Separate Firebase projects for dev/staging/prod; guard config with environment files.

## Success criteria
- Owner and trainer can see the same horse list, plans, and session logs without manual refreshes.
- Trainers can log metrics offline, and owners receive them once online.
- Web dashboard and mobile app share a single backend and enforce role-based access securely.
