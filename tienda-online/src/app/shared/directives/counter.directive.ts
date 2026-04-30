import {
  Directive, ElementRef, Input, OnInit, inject, numberAttribute
} from '@angular/core';

@Directive({
  selector: '[counter]',
  standalone: true,
})
export class CounterDirective implements OnInit {
  @Input({ transform: numberAttribute }) counter = 0;
  @Input({ transform: numberAttribute }) counterDuration = 1800;
  @Input() counterSuffix = '';

  private el = inject(ElementRef);
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    const target = this.counter;
    const el = this.el.nativeElement as HTMLElement;

    this.observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      this.observer.disconnect();

      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / this.counterDuration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString('es-ES') + this.counterSuffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });

    this.observer.observe(el);
  }
}
