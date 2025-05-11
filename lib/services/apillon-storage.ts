import { Storage, LogLevel } from '@apillon/sdk'

import {
  APILLON_API_KEY,
  APILLON_API_SECRET,
  APILLON_BUCKET_UUID,
} from '@/lib/config'

/* -------------------------------------------------------------------------- */
/*                           A P I L L O N   S D K                            */
/* -------------------------------------------------------------------------- */

/** Singleton SDK instance configured with project credentials. */
const storage = new Storage({
  key: APILLON_API_KEY,
  secret: APILLON_API_SECRET,
  logLevel: LogLevel.ERROR,
})

/* -------------------------------------------------------------------------- */
/*                         B U C K E T   H A N D L E                          */
/* -------------------------------------------------------------------------- */

let _bucket: ReturnType<typeof storage.bucket> | null = null

/**
 * Retrieve the configured bucket instance (memoised).
 */
export async function getBucket() {
  if (_bucket) return _bucket
  _bucket = storage.bucket(APILLON_BUCKET_UUID)
  /* Warm the handle by fetching metadata – ignore failures for now. */
  try {
    await _bucket.get()
  } catch {
    /* noop */
  }
  return _bucket
}

/* -------------------------------------------------------------------------- */
/*                        U P L O A D   U T I L I T Y                         */
/* -------------------------------------------------------------------------- */

interface UploadOptions {
  /** Optional directory inside the bucket to wrap the uploaded file. */
  wrapDir?: string
}

/**
 * Upload a file buffer or Web API File to Apillon Storage and return an
 * immutable IPFS URI in the form `ipfs://<cid>/<filename>`.
 */
export async function uploadCredentialFile(
  file: File | Buffer,
  opts: UploadOptions = {},
): Promise<string> {
  const bucket = await getBucket()

  /* ----------------------- Normalise inputs ---------------------------- */
  let fileName = 'file'
  let contentType = 'application/octet-stream'
  let content: Buffer

  if (typeof Buffer !== 'undefined' && file instanceof Buffer) {
    content = file
  } else {
    const f = file as File
    fileName = f.name || fileName
    contentType = f.type || contentType
    content = Buffer.from(await f.arrayBuffer())
  }

  /* ---------------------------- Upload --------------------------------- */
  const res: any = await bucket.uploadFiles(
    [
      {
        fileName,
        contentType,
        content,
      },
    ],
    opts.wrapDir ? { wrapWithDirectory: true, directoryPath: opts.wrapDir } : undefined,
  )

  console.log(res)

  /* Robustly extract the CID from the SDK response, supporting both
     legacy object shapes and the newer array-of-file-objects format. */
  const cid: string | null = (() => {
    if (!res) return null

    /* Newer SDK versions return an array where each item is a file result */
    if (Array.isArray(res)) {
      for (const item of res) {
        const c = item?.CID ?? item?.cid ?? item?.data?.cid
        if (c) return c
      }
      return null
    }

    /* Older SDK versions returned a plain object */
    return res?.CID ?? res?.cid ?? res?.data?.cid ?? null
  })()

  if (!cid) {
    throw new Error('Apillon upload failed - CID not returned')
  }

  return `ipfs://${cid}/${fileName}`
}