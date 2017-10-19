import { SessionData } from '../../models/session-data';

const briefing = 'In this section the participant is briefed on what they are expected to do while watching the video clip. ' +
  'Once the user has started watching the clip, the next time they hit spacebar they will be redirected to a url defined by the experimenter (usually a qualtrics survey). ' +
  'The redirect url will have a "study" query parameter indicating the study\'s ID, a "participant" query parameter indicating the participant\'s ID, and a "stoptime" query parameter indicating the time in seconds since the video started.';
const youTubeId = 'OoA4017M7WU';
const redirect = `${window.location.origin}`;

export const demoData = new SessionData(briefing, youTubeId, redirect);
