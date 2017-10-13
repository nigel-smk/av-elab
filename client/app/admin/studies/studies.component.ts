import { Component, OnInit } from '@angular/core';
import {StudyDataService} from '../../shared/services/study-data.service';
import {StudyData} from '../../models/study-data';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent implements OnInit {

  public studies: StudyData[] = [];
  public newStudy: StudyData = new StudyData();

  constructor(private studyData: StudyDataService) { }

  ngOnInit() {
    this.getStudies();
  }

  getStudies() {
    this.studyData.getAll().subscribe((data: StudyData[]) => this.studies = data);
  }

  createStudy() {
    this.studyData.create(this.newStudy).subscribe(() => {
      this.newStudy = new StudyData();
      this.getStudies();
    });
  }

  deleteStudy(study: StudyData) {
    this.studyData.delete(study).subscribe(() => {
      this.getStudies();
    });
  }

  openDialog(string) {
    return;
  }

}
