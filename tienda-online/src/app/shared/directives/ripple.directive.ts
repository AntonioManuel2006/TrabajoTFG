import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[ripple]',
  standalone: true,
})
export class RippleDirective {
  private el = inject(ElementRef);

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent): void {
    const btn = this.el.nativeElement as HTMLElement;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255,255,255,0.35);
      transform: scale(0);
      animation: rippleAnim 0.55s linear;
      pointer-events: none;
    `;

    const prev = btn.style.position;
    if (!prev || prev === 'static') btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }
}
