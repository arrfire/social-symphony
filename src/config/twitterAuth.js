// Twitter OAuth configuration
export const TWITTER_AUTH_URL = 'https://twitter.com/i/oauth2/authorize';
export const TWITTER_CLIENT_ID = ''; // To be filled by the user
export const TWITTER_REDIRECT_URI = 'http://localhost:5173/callback'; // Update this with your actual callback URL
export const TWITTER_SCOPE = 'tweet.read tweet.write users.read offline.access';