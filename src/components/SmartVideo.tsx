import React, { useState, useEffect } from 'react';

interface SmartVideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
}

export default function SmartVideo({
  src,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  controls = false
}: SmartVideoProps) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);

  useEffect(() => {
    if (!src) {
      setVideoSrc(null);
      return;
    }

    // Check if it's a TikTok video url
    const isTikTok = src.includes('tiktok.com');

    if (!isTikTok) {
      setVideoSrc(src);
      setLoading(false);
      setErrorOccurred(false);
      return;
    }

    // It's a TikTok video. Let's try to fetch the raw MP4 stream from tikwm API
    let isMounted = true;
    const fetchTikTokMp4 = async () => {
      setLoading(true);
      setErrorOccurred(false);
      try {
        const targetUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(src)}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
        
        const response = await fetch(proxyUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonWrapper = await response.json();
        if (!jsonWrapper || !jsonWrapper.contents) {
          throw new Error("No contents field in proxy response");
        }
        
        const result = JSON.parse(jsonWrapper.contents);
        
        if (isMounted) {
          if (result.code === 0 && result.data && result.data.play) {
            setVideoSrc(result.data.play);
          } else {
            // Fallback to the original URL (will be processed as iframe/video fallback)
            setErrorOccurred(true);
          }
          setLoading(false);
        }
      } catch (err) {
        console.warn('Failed to resolve TikTok MP4 URL:', err);
        if (isMounted) {
          setErrorOccurred(true);
          setLoading(false);
        }
      }
    };

    fetchTikTokMp4();

    return () => {
      isMounted = false;
    };
  }, [src]);

  // Helper for TikTok iframe embed fallback if API resolving completely fails or error occurred
  const getTikTokEmbedUrl = (url: string): string | null => {
    const tikTokRegex = /(?:tiktok\.com\/@[\w.-]+\/video\/|tiktok\.com\/v\/|tiktok\.com\/embed\/v2\/)(\d+)/i;
    const match = url.match(tikTokRegex);
    if (match && match[1]) {
      return `https://www.tiktok.com/embed/v2/${match[1]}`;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-black/80 flex flex-col items-center justify-center text-white/40 gap-2 absolute inset-0">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        <span className="text-[10px] font-medium uppercase tracking-wider">Carregando Vídeo...</span>
      </div>
    );
  }

  // If it is STILL a TikTok URL (resolution failed) and we have embed fallback
  const isStillTikTok = src.includes('tiktok.com') && errorOccurred;
  const embedUrl = isStillTikTok ? getTikTokEmbedUrl(src) : null;

  if (embedUrl) {
    return (
      <iframe
        src={embedUrl}
        className={`${className} border-0 absolute inset-0 w-full h-full`}
        allowFullScreen
        scrolling="no"
        allow="autoplay; encrypted-media; picture-in-picture"
      />
    );
  }

  return (
    <video
      src={videoSrc || src}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      controls={controls}
      className={className}
      referrerPolicy="no-referrer"
    />
  );
}
