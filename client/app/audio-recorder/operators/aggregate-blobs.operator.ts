import {map, reduce} from 'rxjs/operators';
import {Observable} from 'rxjs';

export function aggregateBlobs(mimeType: string) {
  return (source: Observable<Blob>) => {
    const accumulator = (acc: Blob[], chunk: Blob) => {
      acc.push(chunk);
      return acc;
    };
    return source.pipe(
      reduce(accumulator, []),
      map((binary: Blob[]) => new Blob(binary, { type: mimeType }))
    );
  };
}
