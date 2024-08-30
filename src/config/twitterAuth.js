// Twitter OAuth configuration
export const TWITTER_AUTH_URL = 'https://twitter.com/i/oauth2/authorize';
export const TWITTER_TOKEN_URL = 'https://api.twitter.com/2/oauth2/token';
export const TWITTER_REDIRECT_URI = 'http://localhost:5173/callback';
export const TWITTER_SCOPE = 'tweet.read tweet.write users.read offline.access';
export const TWITTER_STATE = 'state'; // You should generate a unique state for each request
