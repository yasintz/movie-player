import { CaptionType } from 'srt-to-json';
import dayjs from 'dayjs';

function convertTime(time: number) {
  return dayjs.duration(time * 1000).format('HH:mm:ss,SSS');
}

export default function jsonToSrt(captions: CaptionType[]): string {
  const itemStrings = captions.map((item) =>
    [
      item.id,
      `${convertTime(item.start)} --> ${convertTime(item.end)}`,
      item.text,
    ].join('\n')
  );

  return itemStrings.join('\n\n');
}
