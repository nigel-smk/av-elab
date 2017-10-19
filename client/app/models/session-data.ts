export class SessionData {

  constructor(
    public briefing: string,
    public youtubeId: string,
    public redirect: string,
    public subject?: string,
    public study?: string,
    public stopTime?: number
  ) {}

}
