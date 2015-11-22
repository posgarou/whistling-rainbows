import detect from "detect-pitch";
import streamInput from "./streamInput";
import hzToNote from "./hzToNote";

import NOTES from "./constants/notes";
import HUES from "./constants/hues";

/**
 * @const
 *
 * Certainty threshold for detect-pitch
 *
 * Range is [0,1]
 **/
const THRESHOLD = 0.6;

function run() {
  streamInput()
  .then(({ context, source, analyser }) => {
    const SAMPLE_RATE = context.sampleRate;
    const BUFF_LEN = analyser.fftSize;

    /** analyser data will be dumped in here */
    let buffer = new Float32Array(BUFF_LEN);

    window.setInterval(function () {
      /** dump data into the buffer */
      analyser.getFloatTimeDomainData(buffer);

      // Pitch be 0 if THRESHOLD is not met, leading to Infinity for value
      const pitchInHz = Math.round(SAMPLE_RATE / detect(buffer, THRESHOLD));

      // If too low or pitch threshold was not met, return
      if (pitchInHz < 50 || pitchInHz === Infinity) return;

      const note = hzToNote(pitchInHz);

      if (!note) {
        console.error(pitchInHz);
        return;
      }

      /** Get the appropriate hue for this note and apply it to the body */
      const i = NOTES.indexOf(note);
      const colorString = `hsl(${HUES[i]}, 50%, 70%)`;
      document.body.style.backgroundColor = colorString;
    }, 20);
  })
  .catch(e => console.error(e));
};

document.addEventListener("DOMContentLoaded", run);
