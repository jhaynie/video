import Video from "@components/video";

export default function Home() {
  return (
    <main className="bg-white h-screen w-full flex justify-center items-center">
      <div className="w-full min-h-[480] aspect-video">
        <Video
          poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
          sources={[
            {
              src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              type: "video/mp4",
            },
          ]}
        />
      </div>
    </main>
  );
}
///https://vjs.zencdn.net/v/oceans.mp4
