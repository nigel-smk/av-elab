export class StudyData {

  // TODO better way to define models?
  constructor(
    public _id?: string,
    public study?: string,
    public token?: string,
    public youtubeId?: string,
    public instructions?: string,
    public redirect?: string,
    public dateTime?: string
  ) {}

}

