import React from "react";

function getURLHost(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function convertToEmbed(url: string): string {
  const youtubeRegex =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const loomRegex = /loom\.com\/share\/([a-zA-Z0-9]+)/;

  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch && youtubeMatch[1]) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  const loomMatch = url.match(loomRegex);
  if (loomMatch && loomMatch[1]) {
    return `https://www.loom.com/embed/${loomMatch[1]}`;
  }

  return url;
}

type Props = {
  link: string;
};

export default function VideoRenderer({ link }: Props) {
  const host = getURLHost(link);
  const youtubeHosts = [
    "youtube.com",
    "www.youtube.com",
    "youtu.be",
  ];
  const loomHosts = [
    "loom.com",
    "www.loom.com",
  ];
  const isYouTube = host !== null && youtubeHosts.includes(host);
  const isLoom = host !== null && loomHosts.includes(host);

  if (isYouTube || isLoom) {
    return (
      <iframe
        className="w-full aspect-video"
        src={convertToEmbed(link)}
        title="Embedded video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <video width="320" height="816" controls preload="none" className="w-full">
      <source src={link} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
