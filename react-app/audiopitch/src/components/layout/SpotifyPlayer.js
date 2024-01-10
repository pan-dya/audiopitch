export default function SpotifyPlayer({ uri }) {
  return (
    <iframe
      className="border-radius-2px"
      src={`https://open.spotify.com/embed/track/${uri}?utm_source=generator`}
      width="100%"
      height="352"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen={true}
      loading="lazy"
    ></iframe>
  );
}

