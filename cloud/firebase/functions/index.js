/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for t`he specific language governing permissions and
 * limitations under the License.
 */
"use strict";

const functions = require("firebase-functions");
const mkdirp = require("mkdirp");
const admin = require("firebase-admin");
admin.initializeApp();
const spawn = require("child-process-promise").spawn;
const path = require("path");
const os = require("os");
const fs = require("fs");
const { v5: uuidv5, v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const MY_NAMESPACE = "3387eb34-efd7-4f4b-99bb-7f393d790984";

// Max height and width of the thumbnail in pixels.
const THUMB_MAX_HEIGHT = 200;
const THUMB_MAX_WIDTH = 200;
// Thumbnail prefix added to file names.
const THUMB_PREFIX = "thumb_";

/**
 * When an image is uploaded in the Storage bucket We generate a thumbnail automatically using
 * ImageMagick.
 * After the thumbnail has been generated and uploaded to Cloud Storage,
 * we write the public URL to the Firebase Realtime Database.
 */
exports.generateThumbnail = functions
  .region("europe-west1")
  .storage.object()
  .onFinalize(async (object) => {
    // File and directory paths.
    const filePath = object.name;
    const contentType = object.contentType; // This is the image MIME type
    const fileDir = path.dirname(filePath);
    const fileName = path.basename(filePath);
    const thumbFilePath = path.normalize(
      path.join(fileDir, `${THUMB_PREFIX}${fileName}`)
    );
    const tempLocalFile = path.join(os.tmpdir(), filePath);
    const tempLocalDir = path.dirname(tempLocalFile);
    const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);

    // Exit if this is triggered on a file that is not an image.
    if (!contentType.startsWith("image/")) {
      return console.log("This is not an image.");
    }

    // Exit if the image is already a thumbnail.
    if (fileName.startsWith(THUMB_PREFIX)) {
      return console.log("Already a Thumbnail.");
    }

    // Cloud Storage files.
    const bucket = admin.storage().bucket(object.bucket);
    const file = bucket.file(filePath);
    const thumbFile = bucket.file(thumbFilePath);
    const metadata = {
      contentType: contentType,
      firebaseStorageDownloadTokens: uuidv5(fileName, MY_NAMESPACE),
      // To enable Client-side caching you can set the Cache-Control headers here. Uncomment below.
      // 'Cache-Control': 'public,max-age=3600',
    };

    // Create the temp directory where the storage file will be downloaded.
    await mkdirp(tempLocalDir);
    // Download file from bucket.
    await file.download({ destination: tempLocalFile });
    console.log("The file has been downloaded to", tempLocalFile);
    // Generate a thumbnail using ImageMagick.
    await spawn(
      "convert",
      [
        tempLocalFile,
        "-thumbnail",
        `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`,
        "-auto-orient",
        tempLocalThumbFile,
      ],
      { capture: ["stdout", "stderr"] }
    );
    console.log("Thumbnail created at", tempLocalThumbFile);
    // Uploading the Thumbnail.
    await bucket.upload(tempLocalThumbFile, {
      destination: thumbFilePath,
      metadata: {
        metadata: metadata,
      },
    });
    console.log("Thumbnail uploaded to Storage at", thumbFilePath);
    // Once the image has been uploaded delete the local files to free up disk space.
    fs.unlinkSync(tempLocalFile);
    fs.unlinkSync(tempLocalThumbFile);

    return console.log("Thumbnail URLs saved to database.");
  });

exports.createThumbnail = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    const { name, image } = data;

    const lastDot = name.lastIndexOf(".");
    const ext = name.substring(lastDot + 1);

    const contentType = image.match(
      /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/
    )[1]; // mime type
    const base64EncodedImageString = image.replace(
      /^data:image\/\w+;base64,/,
      ""
    );

    const hash = crypto
      .createHash("sha256")
      .update(base64EncodedImageString)
      .digest("hex");

    const filePath = `${hash}.${ext}`;
    const fileDir = path.dirname(filePath);
    const fileName = path.basename(filePath);
    const thumbFilePath = path.normalize(
      path.join(fileDir, `${THUMB_PREFIX}${fileName}`)
    );
    const tempLocalFile = path.join(os.tmpdir(), filePath);
    const tempLocalDir = path.dirname(tempLocalFile);
    const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);

    await fs.promises.writeFile(
      tempLocalFile,
      base64EncodedImageString,
      "base64"
    );

    await spawn(
      "convert",
      [
        tempLocalFile,
        "-thumbnail",
        `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`,
        "-auto-orient",
        tempLocalThumbFile,
      ],
      { capture: ["stdout", "stderr"] }
    );
    console.log("Thumbnail created at", tempLocalThumbFile);
    // Uploading the Thumbnail.
    const bucket = admin.storage().bucket();

    const uploaded = await bucket.upload(tempLocalThumbFile, {
      destination: thumbFilePath,
      metadata: {
        metadata: {
          contentType: contentType,
          firebaseStorageDownloadTokens: uuidv4(),
        },
      },
    });

    const uploadedMeta = await uploaded[0].getMetadata();
    const uploadedDownloadUrl = uploadedMeta[0].mediaLink;

    console.log("Thumbnail uploaded to Storage at", thumbFilePath);
    // Once the image has been uploaded delete the local files to free up disk space.
    fs.unlinkSync(tempLocalFile);
    fs.unlinkSync(tempLocalThumbFile);

    return {
      text: `You now created a thumbnail on default bucket for: ${name},${tempLocalThumbFile},${thumbFilePath}`,
      downloadUrl: uploadedDownloadUrl,
    };
  });
