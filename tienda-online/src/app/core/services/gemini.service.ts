import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CarritoItem } from '../models/carrito.model';

@Injectable({ providedIn: 'root' })
export class GeminiService {
  private http = inject(HttpClient);

  private readonly API_KEY = 'AIzaSyCTpJs9qmwD3dtu3B2cwdO8SVAbjtydRAk';
  private readonly URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.API_KEY}`;

  async analyzePurchase(items: CarritoItem[], total: number, userName: string): Promise<string> {
    const itemsText = items
      .map(i => `- ${i.producto.nombre} x${i.cantidad} (${i.producto.precio}€/ud)`)
      .join('\n');

    const prompt = `Eres un analista de compras de una tienda online de electrónica. ` +
      `Analiza la siguiente compra realizada por ${userName} y redacta en 2-3 frases ` +
      `un perfil del cliente con sus intereses y motivaciones según los productos adquiridos:\n\n` +
      `Productos:\n${itemsText}\nTotal: ${total.toFixed(2)}€`;

    try {
      const res = await firstValueFrom(
        this.http.post<{
          candidates: { content: { parts: { text: string }[] } }[];
        }>(this.URL, {
          contents: [{ parts: [{ text: prompt }] }],
        })
      );
      return res.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sin análisis disponible';
    } catch (e) {
      console.error('Gemini error:', e);
      return 'Error al generar análisis con IA';
    }
  }
}
