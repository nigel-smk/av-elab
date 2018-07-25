import {map} from 'rxjs/operators';

// "volume" strategy is to take the value of the highest bin
const volumeTransform = map((fftFrame: Uint8Array) =>
  fftFrame.reduce((prev, curr) =>
    Math.max(prev, curr)
  )
);

export { volumeTransform };
