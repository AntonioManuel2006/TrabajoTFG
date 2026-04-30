import {
  Directive, ElementRef, Input, OnInit, OnDestroy, inject, numberAttribute
} from '@angular/core';

@Directive({
  selector: '[reveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() reveal: any;
  @Input({ transform: numberAttribute }) revealDelay = 0;
  @Input() revealFrom: 'bottom' | 'left' | 'right' | 'top' = 'bottom';

  private el = inject(ElementRef);
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    const el = this.el.nativeElement as HTMLElement;

    const initialMap = {
      bottom: 'translateY(50px)',
      top:    'translateY(-50px)',
      left:   'translateX(-50px)',
      right:  'translateX(50px)',
    };

    el.style.opacity = '0';
    el.style.transform = initialMap[this.revealFrom];
    el.style.transition = `opacity 0.6s ease ${this.revealDelay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${this.revealDelay}ms`;
    el.style.willChange = 'opacity, transform';

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translate(0)';
          this.observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
