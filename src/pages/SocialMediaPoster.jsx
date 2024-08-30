import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { TWITTER_AUTH_URL, TWITTER_TOKEN_URL, TWITTER_REDIRECT_URI, TWITTER_SCOPE, TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET, generateTwitterState, generateCodeVerifier, generateCodeChallenge } from '../config/twitterAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";

const SocialMediaPoster = () => {
  const [connectedAccounts, setConnectedAccounts] = useState({
    twitter: false,
    linkedin: false,
    instagram: false,
    farcaster: false,
    lens: false,
  });
  const [loadingPlatforms, setLoadingPlatforms] = useState({
    twitter: false,
    linkedin: false,
    instagram: false,
    farcaster: false,
    lens: false,
  });
  const [postContent, setPostContent] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const storedState = localStorage.getItem('twitter_state');

    if (code && state === storedState) {
      handleTwitterCallback(code);
    }
  }, [location]);

  const handleTwitterCallback = async (code) => {
    try {
      setLoadingPlatforms(prev => ({ ...prev, twitter: true }));
      const codeVerifier = localStorage.getItem('twitter_code_verifier');
      const response = await fetch(TWITTER_TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${TWITTER_CLIENT_ID}:${TWITTER_CLIENT_SECRET}`)}`
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: TWITTER_REDIRECT_URI,
          code_verifier: codeVerifier,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to obtain access token: ${errorData.error_description || 'Unknown error'}`);
      }

      const data = await response.json();
      localStorage.setItem('twitter_access_token', data.access_token);
      setConnectedAccounts(prev => ({ ...prev, twitter: true }));
      toast({
        title: "Twitter Connected",
        description: "Your Twitter account has been successfully connected.",
      });
    } catch (error) {
      console.error('Error during Twitter authentication:', error);
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingPlatforms(prev => ({ ...prev, twitter: false }));
      navigate('/social-media-poster', { replace: true });
    }
  };

  const handleConnect = async (platform) => {
    if (platform === 'twitter') {
      const state = generateTwitterState();
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      
      localStorage.setItem('twitter_state', state);
      localStorage.setItem('twitter_code_verifier', codeVerifier);

      const authUrl = `${TWITTER_AUTH_URL}?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${encodeURIComponent(TWITTER_REDIRECT_URI)}&scope=${encodeURIComponent(TWITTER_SCOPE)}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
      window.location.href = authUrl;
    } else {
      setLoadingPlatforms(prev => ({ ...prev, [platform]: true }));
      // Simulate a connection process for other platforms
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConnectedAccounts(prev => ({ ...prev, [platform]: !prev[platform] }));
      setLoadingPlatforms(prev => ({ ...prev, [platform]: false }));
    }
  };

  const handlePost = () => {
    console.log('Posting to:', Object.entries(connectedAccounts).filter(([_, v]) => v).map(([k]) => k));
    console.log('Content:', postContent);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Social Media Poster</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Connect Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(connectedAccounts).map(([platform, isConnected]) => (
              <div key={platform} className="flex items-center justify-between">
                <Label htmlFor={platform} className="capitalize">{platform}</Label>
                <div className="flex items-center">
                  {loadingPlatforms[platform] ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <span className={`mr-2 text-sm ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
                      {isConnected ? 'Connected' : 'Disconnected'}
                    </span>
                  )}
                  <Switch
                    id={platform}
                    checked={isConnected}
                    onCheckedChange={() => handleConnect(platform)}
                    disabled={loadingPlatforms[platform]}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handlePost} disabled={!Object.values(connectedAccounts).some(Boolean)}>
            Post to Selected Platforms
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaPoster;
