import * as google from 'googleapis';
import {Stream} from 'stream';
import * as util from 'util';

// some better way to do this with the api?
const FILE_FIELDS = 'files/parents,files/name,files/permissions,files/id,files/mimeType,files/kind';

class GDrive {

  private drive;
  private fileRoot: FileNode = new FileNode({ id: 'root' });

  constructor() {
    const key = JSON.parse(process.env.GDRIVE_CREDENTIALS_JSON);
    const drive = google.drive({
      version: 'v3',
      auth: new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        ['https://www.googleapis.com/auth/drive'],
        null
      )
    });

    this.drive = {
      files: {
        list: util.promisify(drive.files.list),
        create: util.promisify(drive.files.create),
        delete: util.promisify(drive.files.delete),
      },
      permissions: {
        create: util.promisify(drive.permissions.create),
        delete: util.promisify(drive.permissions.delete)
      }
    };
  }

  async init() {

    return this.buildFileTree();

  }

  public async listFiles() {
    let files = [];
    let response = await this.drive.files.list({ pageSize: 1000, fields: FILE_FIELDS });
    files = files.concat(response.files);
    while (response.nextPageToken) {
      response = await this.drive.files.list({ pageSize: 1000 , pageToken: response.nextPageToken, fields: FILE_FIELDS });
      files = files.concat(response.files);
    }

    console.log(files);
  }

  private async buildFileTree() {
    // reset fileTree
    this.fileRoot = new FileNode({ id: 'root' });

    // fetch list of all files
    let files = [];
    let response = await this.drive.files.list({ pageSize: 1000, fields: FILE_FIELDS });
    files = files.concat(response.files);
    while (response.nextPageToken) {
      response = await this.drive.files.list({ pageSize: 1000 , pageToken: response.nextPageToken, fields: FILE_FIELDS });
      files = files.concat(response.files);
    }

    // build fileId-to-FileNode map
    let fileIdMap: { string: FileNode } = Object.create(null);

    files.forEach((file: FilesResource) => {
      fileIdMap[file.id] = new FileNode(file);
    });

    // build file tree
    files.forEach((file: FilesResource) => {
      const fileNode = fileIdMap[file.id];
      file.parents.forEach((parentId: string) => {
        // the root has an id that appears in it's children's parent arrays, but the root is not listed by drive.files.list
        let parent = fileIdMap[parentId] || this.fileRoot;
        parent.children.push(fileNode);
      });
      // TODO what if the file is in both root and another subfolder?
    });
  }


  private cd(path: string[], parentNode: FileNode = this.fileRoot): FileNode {
    if (parentNode === this.fileRoot && path.length === 0) {
      return this.fileRoot;
    }

    const segment = path.shift();
    const match = parentNode.children.filter((childNode: FileNode) => {
      return childNode.file.name === segment;
    })[0];

    if (!match) {
      throw new Error('File does not exist.');
    }

    if (path.length > 0) {
      return this.cd(path, match);
    }

    return match;
  }

  async writeFile(file: string[], data: Stream): Promise<FileNode> {
    if (file.length === 0) {
      throw new Error('File name is required.');
    }

    const filename = file.pop();
    const directoryNode = file.length != 0 ? await this.mkDir(file) : this.fileRoot;

    const media = {
      body: data
    };

    const newFile = await this.drive.files.create({
      resource: {
        name: filename,
        parents: [directoryNode.file.id]
      },
      media: media,
      // TODO why are these fields not namespaced like the list ones?
      fields: 'id,kind,name,mimeType,parents,permissions'
    });

    directoryNode.children.push(new FileNode(newFile));

    return newFile;
  }


  async mkDir(path: string[], parentNode: FileNode = this.fileRoot): Promise<FileNode> {
    if (path.length === 0) {
      throw new Error('path parameter required');
    }
    const segment = path.shift();

    let dir: FileNode;
    try {
      dir = this.cd([segment], parentNode);
    }
    catch(e) {
      // TODO custom error class
      if (e.message === "File does not exist.") {
        let file = await this.drive.files.create( {
          resource: {
            parents: [parentNode.file.id],
            name: segment,
            mimeType: 'application/vnd.google-apps.folder'
          }
        });
        dir = new FileNode(file);
        parentNode.children.push(dir);
      }
      else {
        throw e;
      }
    }

    if (path.length > 0) {
      return this.mkDir(path, dir);
    }

    return dir;

  }

  async unLink(path: string[]) {
    const fileNode = this.cd(path);

    const response = await this.drive.files.delete({
      fileId: fileNode.file.id
    });

    await this.buildFileTree();

    return response;
  }

  async unLinkById(id: string) {
    const response = await this.drive.files.delete({
      fileId: id
    });

    await this.buildFileTree();

    return response;
  }

  async createPermission(path: string[], email: string, role: PermissionsResourceRole, type: PermissionsResourceType) {
    const fileNode = this.cd(path);

    const response =  await this.drive.permissions.create({
      fileId: fileNode.file.id,
      resource: {
        role: role,
        type: type,
        emailAddress: email
      }
    });

    await this.buildFileTree();

    return response;
  }

  async deletePermission(path: string[], email: string) {
    const fileNode = this.cd(path);
    const permission = fileNode.file.permissions.filter((permission: PermissionsResource) => {
      return permission.emailAddress === email
    })[0];

    // don't bother throwing an error if the permission doesn't exist
    if (!permission) {
      return;
    }

    const response = await this.drive.permissions.delete({
      fileId: fileNode.file.id,
      permissionId: permission.id
    });

    await this.buildFileTree();

    return response;
  }

  // can't put email in delete request url, gotta do it by id
  async deletePermissionById(path: string[], id: string) {
    const fileNode = this.cd(path);

    const response = await this.drive.permissions.delete({
      fileId: fileNode.file.id,
      permissionId: id
    });

    await this.buildFileTree();

    return response;
  }

  async getPermissions(path: string[]): Promise<PermissionsResource[]> {
    const fileNode = this.cd(path);

    return fileNode.file.permissions;
  }

}

class FileNode {

  constructor(public file: FilesResource, public children: FileNode[] = []) { }

}

// TODO is this an ideal way to share a singleton throughout the app?
const gdrive = new GDrive();

export default gdrive;






// https://developers.google.com/drive/v3/reference/files#resource
interface FilesResource {
  id: string,
  name?: string,
  parents?: [string],
  permissions?: [PermissionsResource]
}
interface PermissionsResource {
  id: string,
  emailAddress: string,
  type: PermissionsResourceType,
  role: PermissionsResourceRole
}
// https://developers.google.com/drive/v3/reference/permissions
type PermissionsResourceRole = 'organizer' | 'owner' | 'writer' | 'commenter' | 'reader';
type PermissionsResourceType = 'user' | 'group' | 'domain' | 'anyone';


// type workaround
interface NodeCallback<T> {
  (err: any, result?: T): void;
}
interface NodeCallback2<T> {
  (result: T): void;
}

declare module "util" {
  export function promisify<T>(f: (callback?: NodeCallback<undefined>) => void): () => Promise<T>;
  export function promisify<T, S>(f: (arg1: S, callback: NodeCallback<T>) => void): (arg1: S) => Promise<T>;
  export function promisify<T, S, U>(f: (arg1: S, arg2: U, callback: NodeCallback<T>) => void): (arg1: S, arg2: U) => Promise<T>;
  export function promisify<T, S, U, W>(f: (arg1: S, arg2: U, arg3: W, callback: NodeCallback<T>) => void): (arg1: S, arg2: U, arg3: W) => Promise<T>;
  export function promisify<T>(f: (callback: NodeCallback2<undefined>) => void): () => Promise<T>;
  export function promisify<T, S>(f: (arg1: S, callback: NodeCallback2<T>) => void): (arg1: S) => Promise<T>;
  export function promisify<T, S, U>(f: (arg1: S, arg2: U, callback: NodeCallback2<T>) => void): (arg1: S, arg2: U) => Promise<T>;
  export function promisify<T, S, U, W>(f: (arg1: S, arg2: U, arg3: W, callback: NodeCallback2<T>) => void): (arg1: S, arg2: U, arg3: W) => Promise<T>;
}interface NodeCallback<T> {
  (err: any, result?: T): void;
}
interface NodeCallback2<T> {
  (result: T): void;
}

declare module "util" {
  export function promisify<T>(f: (callback?: NodeCallback<undefined>) => void): () => Promise<T>;
  export function promisify<T, S>(f: (arg1: S, callback: NodeCallback<T>) => void): (arg1: S) => Promise<T>;
  export function promisify<T, S, U>(f: (arg1: S, arg2: U, callback: NodeCallback<T>) => void): (arg1: S, arg2: U) => Promise<T>;
  export function promisify<T, S, U, W>(f: (arg1: S, arg2: U, arg3: W, callback: NodeCallback<T>) => void): (arg1: S, arg2: U, arg3: W) => Promise<T>;
  export function promisify<T>(f: (callback: NodeCallback2<undefined>) => void): () => Promise<T>;
  export function promisify<T, S>(f: (arg1: S, callback: NodeCallback2<T>) => void): (arg1: S) => Promise<T>;
  export function promisify<T, S, U>(f: (arg1: S, arg2: U, callback: NodeCallback2<T>) => void): (arg1: S, arg2: U) => Promise<T>;
  export function promisify<T, S, U, W>(f: (arg1: S, arg2: U, arg3: W, callback: NodeCallback2<T>) => void): (arg1: S, arg2: U, arg3: W) => Promise<T>;
}
