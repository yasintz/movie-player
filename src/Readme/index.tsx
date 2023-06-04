import DownloadCommand from './DownloadCommand';

const Readme = () => {
  const links = {
    Extension:
      'https://chrome.google.com/webstore/detail/hls-downloader/fopnhepeflgcnppklfnejokkkeomdgik',
    Subtitles: 'https://my-subs.co/',
    'Project Free': 'https://projectfreetv.space',
    'Movies Joy': 'https://moviesjoy.to/home',
  };
  return (
    <div style={{ padding: 16 }}>
      <h4>Get Started</h4>
      <p>
        You can upload a video and srt file and start to watch. if you leave
        before finish, upload same file to continue
      </p>

      <h5>How to download a movie</h5>
      <video
        src="how-to-download.mp4"
        controls
        style={{ width: 300, height: 200 }}
      />
      <div>
        {Object.entries(links).map(([name, link]) => (
          <div key={link}>
            <a href={link} target="_blank">
              {name}
            </a>
          </div>
        ))}

        <br />
        <DownloadCommand />
      </div>
    </div>
  );
};

export default Readme;
