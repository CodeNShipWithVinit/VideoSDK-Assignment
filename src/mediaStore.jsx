export let sharedStream = null;

export async function initSharedMedia() {
  if (sharedStream) return sharedStream;

  sharedStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  });

  return sharedStream;
}
