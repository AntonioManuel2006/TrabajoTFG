import { Directive, ElementRef, HostListener, OnDestroy, inject } from '@angular/core';

@Directive({
  selector: '[tilt]',
  standalone: true,
})
export class TiltDirective implements OnDestroy {
  private el = inject(ElementRef);
  private raf = 0;

  @HostListener('mousemove', ['$event'])
  onMove(e: MouseEvent): void {
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(() => {
      const card = this.el.nativeElement as HTMLElement;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rotX = -dy * 8;
      const rotY = dx * 8;
      card.style.transform =
        `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`;
      card.style.transition = 'transform 0.1s ease';
    });
  }

  @HostListener('mouseleave')
  onLeave(): void {
    cancelAnimationFrame(this.raf);
    const card = this.el.nativeElement as HTMLElement;
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
  }
}
