import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[sidenote]'
})
export class SidenoteDirective {
  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  @HostListener('click', ['$event.target']) onClick(elm: HTMLElement) {
    // console.log('Click ', elm.nativeElement.getAttribute('sidenote'));
    console.log('Click ', elm.getAttribute('sidenote'));
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
