// Twitter OAuth configuration
export const TWITTER_AUTH_URL = 'https://twitter.com/i/oauth2/authorize';
export const TWITTER_TOKEN_URL = 'https://api.twitter.com/2/oauth2/token';
export const TWITTER_REDIRECT_URI = 'http://localhost:5173/social-media-poster';
export const TWITTER_SCOPE = 'tweet.read tweet.write users.read offline.access';
export const TWITTER_STATE = crypto.randomUUID(); // Generate a unique state for each request
export const TWITTER_CLIENT_ID = 'RDJ6T29TMVpvTldkWU5ZVFI1WnU6MTpjaQ';
export const TWITTER_CLIENT_SECRET = '67jU2GwpmWAJ2zFZGY3GgCTt2tNlrfSr';
export const TWITTER_CODE_CHALLENGE = 'challenge';
export const TWITTER_CODE_CHALLENGE_METHOD = 'plain';
