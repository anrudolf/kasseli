# Local development

Start local firebase function emulator:

```
$ cd cloud/firebase
$ firebase emulators:start --only functions
```

Firebase emulator suite will be available on http://localhost:4000, and functions emulator endpoint will be on http://localhost:5001.

# Deployment

```
$ cd cloud/firebase

# optional login if required
$ firebase login

# deploy all functions
$ firebase deploy --only functions

# deploy only functions within "products" codebase (see firebase.json)
$ firebase deploy --only functions:products

# deploy only functions within "thumbnails" codebase (see firebase.json). This codebase is currently not used.
$ firebase deploy --only functions:products

```