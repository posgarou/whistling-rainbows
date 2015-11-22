/**
 * Start streaming in input from the microphone. Once we have a stream,
 * start piping it through an analyzer. Once all this is done, resolve the
 * returned promise.
 *
 * @return {Promise} resolved with context (AudioContext), source (media
 * stream), and analyser (audio analyser)
 **/
module.exports = function streamInput() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  const context = new AudioContext();

  return navigator.mediaDevices.getUserMedia({
    audio: true,
  })
  .then(stream => {
    const source = context.createMediaStreamSource(stream);

    /** Setup an analyser to receive input as it streams through */
    const analyser = context.createAnalyser();

    /** Max smoothing */
    analyser.smoothingTimeConstant = 1;

    /** Help filter out background noise */
    analyser.maxDecibels = 0;
    analyser.minDecibels = -10;
    analyser.fftSize = 2048;

    /** Pipe input through our analyser */
    source.connect(analyser);

    return {
      context: context,
      source: source,
      analyser: analyser,
    };
  });
};
