// Twitter OAuth configuration
export const TWITTER_AUTH_URL = 'https://twitter.com/i/oauth2/authorize';
export const TWITTER_TOKEN_URL = 'https://api.twitter.com/2/oauth2/token';
export const TWITTER_REDIRECT_URI = 'https://social-symphony.gptengineer.run/social-media-poster';
export const TWITTER_SCOPE = 'tweet.read tweet.write users.read offline.access';
export const TWITTER_CLIENT_ID = 'RDJ6T29TMVpvTldkWU5ZVFI1WnU6MTpjaQ';
export const TWITTER_CLIENT_SECRET = '67jU2GwpmWAJ2zFZGY3GgCTt2tNlrfSr';

// Generate a unique state for each request
export const generateTwitterState = () => crypto.randomUUID();

// Generate a code verifier and challenge
export const generateCodeVerifier = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

export const generateCodeChallenge = async (verifier) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};
