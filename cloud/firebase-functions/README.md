# Firebase functions

Cloud Functions for Firebase is a serverless framework that lets you automatically run backend code in response to events triggered by Firebase features and HTTPS requests. See [Cloud Functions for Firebase](https://firebase.google.com/docs/functions).

In Kasseli, cloud functions are used to access external APIs which would be blocked by the Web browser's [Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).

## Local development

### Start local firebase function emulator

Note that typescript needs to be compiled before it can run in the emulator. You can either build it once with `npm run build`, or use `npm run build:watch` to continuosly re-build on code changes.

```
# compile typescript
$ cd cloud/firebase-functions/functions
$ npm run build:watch

# start emulator
$ cd cloud/firebase-functions
$ firebase emulators:start --only functions
```

Firebase emulator suite will be available on http://localhost:4000, and functions emulator endpoint will be on http://localhost:5001.

## Deployment

```
$ cd cloud/firebase-functions

# optional login if required
$ firebase login

# deploy all functions
$ firebase deploy --only functions

```