# Kasseli

## Description

Kasseli is a play pretend super market self-checkout register inspired by Migros. It is hosted on [https://kasseli.web.app](https://kasseli.web.app).

Kasseli is web based and thus runs in any browser, such as on a mobile phone, tablet, or even a Raspberry Pi (ideally with a touch screen). It is still a work in progress.

Made with ❤ for my godchild Yara.

## Features

Kasseli consists of a [Vue.js](https://vuejs.org/) front-end and a [Cloud Firestore](https://firebase.google.com/docs/firestore) backend.

The following features are implemented:

- Scan product codes with external barcode reader
- Add products to libary including images and prices
- Supports "weighted" products, i.e. price encoded in barcode for 0.25 kg tomatoes or similar.
- Customizable quick links for products without a barcode (Gipfeli, Weggli, Knoblauch, etc.)
- Emulate payment by app (similar to [TWINT](https://www.twint.ch/), requires secondary mobile phone)
- Emulate payment by credit/debit card (partially, requires external card reader)
- Offline support through progressive web app (PWA) and local Firestore database, syncs with cloud when online
- etc.

## Project setup

## Install dependencies

Clone this repo, then run:

```
npm install
```

### Compiles and hot-reloads for local development

To serve Kasseli locally on [http://localhost:8080](http://localhost:8080) for development:

```
npm run serve
```
