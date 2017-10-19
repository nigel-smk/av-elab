import { Component, OnInit } from '@angular/core';
import {StudyDataService} from '../../shared/services/study-data.service';
import {StudyData} from '../../models/study-data';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InstructionsModalComponent} from './instructions-modal/instructions-modal.component';
import {DeleteModalComponent} from './delete-modal/delete-modal.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent implements OnInit {

  public studies: StudyData[] = [];
  public newStudy: StudyData = new StudyData();

  private closeResult: string;

  constructor(private studyData: StudyDataService, private modalService: NgbModal, private router: Router) { }

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

  testStudy(study: StudyData) {
    this.router.navigate(['/'], { queryParams: { study: study.study, subject: 'test' } });
  }

  deleteStudy(study: StudyData) {
    this.studyData.delete(study).subscribe(() => {
      this.getStudies();
    });
  }

  openInstructionsDialog(study: StudyData) {
    const modalRef = this.modalService.open(InstructionsModalComponent);
    modalRef.componentInstance.briefing = study.briefing;

    modalRef.result.then((result) => {
      study.briefing = result;
    }, (reason) => {
      this.closeResult = `Dismissed for some reason`;
    });
  }

  openDeleteDialog(study: StudyData) {
    const modalRef = this.modalService.open(DeleteModalComponent);

    modalRef.result.then(() => {
      this.deleteStudy(study);
    });
  }

}
