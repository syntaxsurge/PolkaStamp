import { Storage } from '@apillon/sdk'

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
})

/* -------------------------------------------------------------------------- */
/*                         B U C K E T   H A N D L E                          */
/* -------------------------------------------------------------------------- */

/** Cached bucket handle to avoid repeated instantiation. */
let _bucket: ReturnType<typeof storage.bucket> | null = null

/**
 * Get the configured bucket instance.
 * The first call hits the network; subsequent calls reuse the handle.
 */
export async function getBucket() {
  if (_bucket) return _bucket
  _bucket = storage.bucket(APILLON_BUCKET_UUID)
  /* Pre-fetch bucket metadata so the handle is fully initialised. */
  try {
    await _bucket.get()
  } catch {
    /* Silent fail – subsequent operations will surface errors. */
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

  /* Normalise inputs ----------------------------------------------------- */
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

  /* Upload --------------------------------------------------------------- */
  const res: any = await bucket.uploadFiles(
    [
      {
        fileName,
        contentType,
        content,
      },
    ],
    opts.wrapDir
      ? { wrapWithDirectory: true, directoryPath: opts.wrapDir }
      : undefined,
  )

  const cid: string =
    res?.cid ??
    res?.data?.cid ??
    (() => {
      throw new Error('Apillon upload failed – CID not returned')
    })()

  return `ipfs://${cid}/${fileName}`
}

/* -------------------------------------------------------------------------- */
/*                     P U B L I C   G A T E W A Y   U R L                    */
/* -------------------------------------------------------------------------- */

/**
 * Convert an IPFS URI to a HTTP gateway URL.
 *
 * @example
 * buildGatewayUrl('ipfs://bafy.../doc.pdf')
 * // → 'https://ipfs.io/ipfs/bafy.../doc.pdf'
 */
export function buildGatewayUrl(
  ipfsUrl: string,
  gateway: string = 'ipfs.io',
): string {
  if (!ipfsUrl.startsWith('ipfs://')) return ipfsUrl
  const [, cidAndPath] = ipfsUrl.split('ipfs://')
  return `https://${gateway}/ipfs/${cidAndPath}`
}

/**
 * Lightweight check whether a string is an IPFS URI.
 */
export function isIpfsUrl(url: string): boolean {
  return url.startsWith('ipfs://')
}