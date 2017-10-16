import { Component, OnInit } from '@angular/core';
import {StudyDataService} from '../../shared/services/study-data.service';
import {StudyData} from '../../models/study-data';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InstructionsModalComponent} from './instructions-modal/instructions-modal.component';
import {DeleteModalComponent} from './delete-modal/delete-modal.component';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css']
})
export class StudiesComponent implements OnInit {

  public studies: StudyData[] = [];
  public newStudy: StudyData = new StudyData();

  private closeResult: string;

  constructor(private studyData: StudyDataService, private modalService: NgbModal) { }

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

  // TODO use component approach
  openInstructionsDialog(study: StudyData) {
    const modalRef = this.modalService.open(InstructionsModalComponent);
    modalRef.componentInstance.instructions = study.instructions;

    modalRef.result.then((result) => {
      study.instructions = result;
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
