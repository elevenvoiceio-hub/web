import { Component, output, ViewChild } from '@angular/core';
import { DragAndDrop } from '../../../core/directive/drap-and-drop/drag-and-drop';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUpload } from '@ng-icons/lucide';

@Component({
  selector: 'app-drag-drop-upload',
  imports: [DragAndDrop, NgIcon],
  templateUrl: './drag-drop-upload.html',
  styleUrl: './drag-drop-upload.css',
  viewProviders: [provideIcons({ lucideUpload })],
})
export class DragDropUpload {
  @ViewChild('fileInput') myFileInput!: any;

  filesDropped = output<any>();

  onFilesSelected($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files) {
      this.filesDropped.emit(Array.from(input.files));
    }
    this.myFileInput.nativeElement.value = '';
  }
}
