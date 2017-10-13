export class SessionData {

  constructor(
    public briefing: string,
    public youtubeId: string,
    public redirectUrl: string,
    public session?: string,
    public study?: string,
    public stopTime?: number
  ) {}

}
