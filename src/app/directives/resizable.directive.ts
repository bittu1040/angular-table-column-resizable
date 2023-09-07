import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResizable]'
})
export class ResizableDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event']) //@HostListener decorator to listen for the mousedown event on the element that the directive is applied to. 
  onMouseDown(event: MouseEvent) {

    // Prevent default behavior to avoid text selection during resizing
    event.preventDefault();

    //This line records the initial horizontal position (X-coordinate) of the mouse pointer when the mousedown event is triggered.
    const initialX = event.pageX;

    //This line finds the closest ancestor th (table header) element to the current element where the directive is applied. 
    const column = this.el.nativeElement.closest('th'); 

    //This line stores the initial width of the column, which is determined by its offsetWidth.
    const initialWidth = column.offsetWidth;

    const mouseMoveListener = (moveEvent: MouseEvent) => {
      const offsetX = moveEvent.pageX - initialX;
      const newWidth = Math.max(100, initialWidth + offsetX); // Minimum width

      this.renderer.setStyle(column, 'width', `${newWidth}px`);
    };

    const mouseUpListener = () => {
      window.removeEventListener('mousemove', mouseMoveListener);
      window.removeEventListener('mouseup', mouseUpListener);
    };

    window.addEventListener('mousemove', mouseMoveListener);
    window.addEventListener('mouseup', mouseUpListener);
  }


}





// You can use this also, different way 
/*
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appResizable]'
})
export class ResizableDirective {

  private startX: number | any;
  private startWidth: number | any;

  constructor(private el: ElementRef) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.startX = event.pageX;
    this.startWidth = this.el.nativeElement.offsetWidth;
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.startX) {
      const diff = event.pageX - this.startX;
      this.el.nativeElement.style.width = this.startWidth + diff + 'px';
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.startX = undefined;
    this.startWidth = undefined;
  }

}
*/
