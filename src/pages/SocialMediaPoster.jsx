import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SocialMediaPoster = () => {
  const [connectedAccounts, setConnectedAccounts] = useState({
    twitter: false,
    linkedin: false,
    instagram: false,
    farcaster: false,
    lens: false,
  });
  const [postContent, setPostContent] = useState('');

  const handleConnect = (platform) => {
    // In a real app, this would initiate the OAuth flow for the platform
    setConnectedAccounts(prev => ({ ...prev, [platform]: !prev[platform] }));
  };

  const handlePost = () => {
    // In a real app, this would send the post to the selected platforms
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
                <Switch
                  id={platform}
                  checked={isConnected}
                  onCheckedChange={() => handleConnect(platform)}
                />
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
          <Button onClick={handlePost}>Post to Selected Platforms</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaPoster;