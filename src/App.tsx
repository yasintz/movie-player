import { useState } from 'react';
import Movie from './Movie';
import './App.css';
import useMovieCache from './hooks/useMovieCache';
import Readme from './Readme';

type DataType = {
  videoName: string;
  videoUrl: string;
  caption?: string;
};

function App() {
  const [data, setData] = useState<DataType>();
  const { movies } = useMovieCache();

  const onFileInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const files = Array.from(event.target.files || []);

    const captionFile = files.find((file) => file.name.endsWith('srt'));
    const videoFile = files.find((file) => file.type.startsWith('video'));

    if (!videoFile) {
      alert('Please upload a video');
      return;
    }

    const videoUrl = URL.createObjectURL(videoFile);
    const videoData: Pick<DataType, 'videoName' | 'videoUrl'> = {
      videoName: videoFile.name,
      videoUrl,
    };

    if (!captionFile) {
      setData(videoData);
      return;
    }

    const reader = new FileReader();

    reader.readAsText(captionFile, 'UTF-8');
    reader.onload = (evt) => {
      const caption = evt.target?.result;
      if (!caption || typeof caption !== 'string') {
        alert("File couldn't read");
        return;
      }

      setData({ caption, ...videoData });
    };
  };

  if (data) {
    return (
      <Movie src={data.videoUrl} caption={data.caption} name={data.videoName} />
    );
  }

  return (
    <div>
      <input type="file" multiple onChange={onFileInputChange} />

      <ul>
        {movies.map((movie) => (
          <li key={movie.name}>
            {movie.name}: {movie.time}
          </li>
        ))}
      </ul>
      <hr />
      <Readme />
    </div>
  );
}

export default App;
