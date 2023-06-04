import { useState } from 'react';
import Movie from './Movie';
import './App.css';
import useMovieCache from './hooks/useMovieCache';
import Readme from './Readme';

type DataType = {
  videoName: string;
  videoUrl: string;
  srtFiles: string[];
};

function readFile(file: File) {
  return new Promise<string>((res, rej) => {
    const reader = new FileReader();

    reader.readAsText(file, 'UTF-8');
    reader.onload = (evt) => {
      const content = evt.target?.result;
      if (!content || typeof content !== 'string') {
        rej('Failed');
        return;
      }

      res(content);
    };
  });
}

function App() {
  const [data, setData] = useState<DataType>();
  const [play, setPlay] = useState(false);
  const { movies, delete: deleteCache } = useMovieCache();

  const onFileInputChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const files = Array.from(event.target.files || []);

    const srtFileInstances = files.filter((file) => file.name.endsWith('srt'));
    const srtFiles = (
      await Promise.all(srtFileInstances.map((f) => readFile(f)))
    ).concat(data?.srtFiles || []);

    const videoFile = files.find((file) => file.type.startsWith('video'));

    if (!videoFile) {
      setData((prev) => ({
        srtFiles,
        videoName: prev?.videoName || '',
        videoUrl: prev?.videoUrl || '',
      }));
      return;
    }

    const videoUrl = URL.createObjectURL(videoFile);
    setData({
      videoName: videoFile.name,
      videoUrl,
      srtFiles: srtFiles,
    });
  };

  if (play && data) {
    return (
      <Movie
        src={data.videoUrl}
        srtFiles={data.srtFiles}
        name={data.videoName}
      />
    );
  }

  return (
    <div>
      <input type="file" multiple onChange={onFileInputChange} />
      <button onClick={() => setPlay(true)}>Play</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <ul>
        {movies.map((movie) => (
          <li key={movie.name}>
            {movie.name}: {movie.time} -{' '}
            <button onClick={() => deleteCache(movie.name)}>delete</button>
          </li>
        ))}
      </ul>
      <hr />
      <Readme />
    </div>
  );
}

export default App;
