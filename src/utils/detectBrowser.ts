export function isSafari(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  // Safari has "Safari" in UA but not Chrome/Chromium/Edge/Opera
  return /Safari/.test(ua) && !/Chrome|CriOS|Chromium|Edg|OPR/.test(ua);
}

export function isMobile(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
}

export function isFirefox(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Firefox/.test(navigator.userAgent);
}
