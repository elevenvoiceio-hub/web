import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Directive({
  selector: '[appDragAndDrop]',
})
export class DragAndDrop {
  @Output() files: EventEmitter<File[]> = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) {}

  @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    let files: File[] = [];
    for (let i = 0; i < evt!.dataTransfer!.files.length; i++) {
      const file = evt!.dataTransfer!.files[i];
      files.push(file);
    }
    if (files.length > 0) {
      this.files.emit(files);
    }
  }
}
