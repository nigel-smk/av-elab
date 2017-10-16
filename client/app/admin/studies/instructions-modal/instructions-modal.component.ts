import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-instructions-modal',
  templateUrl: './instructions-modal.component.html',
  styleUrls: ['./instructions-modal.component.css']
})
export class InstructionsModalComponent {

  @Input() instructions;

  constructor(public activeModal: NgbActiveModal) {}

}
