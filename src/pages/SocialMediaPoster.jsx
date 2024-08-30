import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TWITTER_AUTH_URL, TWITTER_CLIENT_ID, TWITTER_REDIRECT_URI, TWITTER_SCOPE } from '../config/twitterAuth';

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
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [twitterClientId, setTwitterClientId] = useState('');
  const [twitterClientSecret, setTwitterClientSecret] = useState('');

  const handleConnect = async (platform) => {
    if (platform === 'twitter') {
      if (!twitterClientId || !twitterClientSecret) {
        setShowCredentialsModal(true);
        return;
      }
      const authUrl = `${TWITTER_AUTH_URL}?response_type=code&client_id=${twitterClientId}&redirect_uri=${TWITTER_REDIRECT_URI}&scope=${TWITTER_SCOPE}&state=state`;
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

  const handleCredentialsSubmit = () => {
    setShowCredentialsModal(false);
    handleConnect('twitter');
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

      <Dialog open={showCredentialsModal} onOpenChange={setShowCredentialsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Twitter OAuth Credentials</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clientId" className="text-right">
                Client ID
              </Label>
              <Input
                id="clientId"
                value={twitterClientId}
                onChange={(e) => setTwitterClientId(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clientSecret" className="text-right">
                Client Secret
              </Label>
              <Input
                id="clientSecret"
                type="password"
                value={twitterClientSecret}
                onChange={(e) => setTwitterClientSecret(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handleCredentialsSubmit}>Connect Twitter</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialMediaPoster;
