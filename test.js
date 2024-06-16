const YTDlpWrap = require('yt-dlp-wrap').default;
const ytDlpWrap = new YTDlpWrap('ytdl/yt-dlp');
const Stream = require('stream');
const ffmpeg = require('fluent-ffmpeg');


//https://youtu.be/8G2q-EfJjTU

let readableStream = ytDlpWrap.execStream([
    'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    '-f',
    'bestaudio',
    '--audio-format', 'mp3'
]);

let pcmData = Buffer.alloc(0);

//probably should make this a class but im not THAT smart
const ffmpegStream = new Stream;
ffmpegStream.writable = true;
ffmpegStream.bytes = 0;

ffmpegStream.write = function(chunk, encoding, callback) {
  pcmData = Buffer.concat([pcmData, chunk]);
}
ffmpegStream.end = function(buf) {
  if(arguments.length) ffmpegStream.write(buf);
  ffmpegStream.writable = false;
}


ffmpeg(readableStream)
  .outputOptions('-f s8')
  .outputOptions('-ar 44100')
  .outputOptions('-ac 1')
  .outputOptions('-acodec pcm_s8')
  .output(ffmpegStream)
  .on('end', () => {
    const dfpwmData = encoder.encode(pcmData)
    const dfpwmStream = fs.createWriteStream(dfpwmPath)
    dfpwmStream.write(dfpwmData)

    res.set("Content-Disposition", `attachment; filename="amazing.dfpwm"`);
    res.send(dfpwmPath)
  })
  .on('error', (err) => {
    console.error('Error during conversion:', err);
  })
  .run();