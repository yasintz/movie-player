import { useState } from 'react';
import styles from './readme.module.scss';

type CommandParams = {
  name: string;
  url: string;
};

function truncate(
  str: string,
  maxLength: number,
  location: 'start' | 'middle' | 'end' = 'middle'
): string {
  if (str.length <= maxLength) {
    return str;
  }

  const partLength = Math.ceil((maxLength - 3) / 2);
  let startStr, endStr;

  switch (location) {
    case 'start':
      endStr = str.substring(str.length - maxLength + 3);
      return '...' + endStr;
    case 'end':
      startStr = str.substring(0, maxLength - 3);
      return startStr + '...';
    case 'middle':
    default:
      startStr = str.substring(0, partLength);
      endStr = str.substring(str.length - partLength);
      return startStr + '...' + endStr;
  }
}

const ffmpegCommand = ({ name, url }: CommandParams) =>
  `ffmpeg -protocol_whitelist file,http,https,tcp,tls,crypto -i "${url}" -c copy "${name}"`;
const youtubeDlCommand = ({ name, url }: CommandParams) =>
  `youtube-dl --all-subs -f mp4 -o "${name}" "${url}"`;

const Command = ({
  params,
  converter,
  title,
}: {
  title: string;
  params: CommandParams;
  converter: (params: CommandParams) => string;
}) => {
  const truncated = {
    name: params.name,
    url: truncate(params.url, 56, 'middle'),
  };
  return (
    <p className={styles.commandRow}>
      {title}:{' '}
      <button
        onClick={() => {
          navigator.clipboard.writeText(converter(params)).then(() => {
            alert('Copied ✅');
          });
        }}
      >
        {converter(truncated)}
      </button>
    </p>
  );
};

const DownloadCommand = () => {
  const [fileName, setFileName] = useState<string>();
  const [fileUrl, setFileUrl] = useState<string>();

  const params: CommandParams = {
    name: fileName || 'video.mp4',
    url: fileUrl || 'https://example.com/index.m3u8',
  };

  return (
    <div className={styles.downloadCommandContainer}>
      <input
        placeholder="File Name..."
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <input
        placeholder="Url..."
        value={fileUrl}
        onChange={(e) => setFileUrl(e.target.value)}
      />

      <hr />
      <Command params={params} converter={ffmpegCommand} title="FFmpeg" />
      <Command
        params={params}
        converter={youtubeDlCommand}
        title="youtube-dl"
      />
    </div>
  );
};

export default DownloadCommand;
