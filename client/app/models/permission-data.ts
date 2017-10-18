// TODO share type definitions with server project

export class PermissionData {

  constructor(
    public id?: string,
    public emailAddress?: string,
    public type?: string,
    public role?: string,
    public displayName?: string
  ) {}
}
