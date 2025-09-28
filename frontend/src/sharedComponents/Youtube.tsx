const makeUrlEmbeddable = (url: string) => {
  if (url.includes('youtube.com/watch?v=')) {
    return url.replace('watch?v=', 'embed/')
  }

  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]
    return `https://www.youtube.com/embed/${videoId}`
  }

  return url
}

export default function YouTubeEmbed({ videoUrl }: { videoUrl: string }) {
  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
      <iframe
        src={makeUrlEmbeddable(videoUrl)}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  )
}
