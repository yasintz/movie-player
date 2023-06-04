declare module 'srt-to-json' {
  export type CaptionType = {
    id: number;
    start: number;
    end: number;
    text: string;
  };
  function parseSRT(srt: string): Array<CaptionType>;

  export default parseSRT;
}
