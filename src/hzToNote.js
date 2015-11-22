import A from "./constants/A";

import NOTES from "./constants/notes";

/**
 * Converts hz into scale note.
 *
 * Assumes A value in constants/A.
 *
 * @param {Number} hz - value in hz
 * @return {String} name of corresponding note
 **/
module.exports = function hzToNote(hz) {
  const offset = Math.round(Math.log((hz / A), 2) * 12);

  if (offset >= 0) {
    return NOTES[offset % NOTES.length];
  }

  return NOTES[NOTES.length - 1 - (Math.abs(offset) % NOTES.length)];
};
