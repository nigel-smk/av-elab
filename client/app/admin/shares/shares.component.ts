import { Component, OnInit } from '@angular/core';
import {PermissionsDataService} from '../../shared/services/permissions-data.service';
import {PermissionData} from '../../models/permission-data';

@Component({
  selector: 'app-shares',
  templateUrl: './shares.component.html',
  styleUrls: ['./shares.component.css']
})
export class SharesComponent implements OnInit {

  public permissions: PermissionData[];
  public newPermission = new PermissionData();

  constructor(private permissionData: PermissionsDataService) { }

  ngOnInit() {
    this.getPermissions();
  }

  getPermissions() {
    this.permissionData.getAll().subscribe((data: PermissionData[]) => this.permissions = data);
  }

  createPermission() {
    this.permissionData.create(this.newPermission.emailAddress).subscribe(() => {
      this.newPermission = new PermissionData();
      this.getPermissions();
    });
  }

  deletePermission(data: PermissionData) {
    this.permissionData.delete(data).subscribe(() => this.getPermissions());
  }

}
