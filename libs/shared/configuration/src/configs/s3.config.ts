export const S3Config = () => ({
  s3: {
    storagePublic: process.env.S3_STORAGE_PUBLIC,
    storagePrivate: process.env.S3_STORAGE_PRIVATE,
    storageUrl: process.env.S3_STORAGE_URL,
    cdnProxy: process.env.CDN_S3_PROXY,
    tempFolder: process.env.S3_TMP_FOLDER,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
    signatureVersion: process.env.S3_SIGNATURE_VERSION,
  },
})
