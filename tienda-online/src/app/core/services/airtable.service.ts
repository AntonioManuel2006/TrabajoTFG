import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AirtableService {
  private http = inject(HttpClient);

  private readonly TOKEN = '';
  private readonly BASE_ID = 'appC2BagfAb0ujQ3w';
  private readonly TABLE = 'Usuarios';
  private readonly BASE_URL = `https://api.airtable.com/v0/${this.BASE_ID}/${encodeURIComponent(this.TABLE)}`;

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.TOKEN}`,
      'Content-Type': 'application/json',
    });
  }

  async createUser(user: {
    nombre: string;
    apellidos: string;
    email: string;
    telefono?: string;
    fecha_registro?: string;
  }): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post(
          this.BASE_URL,
          {
            fields: {
              Nombre: user.nombre,
              Apellidos: user.apellidos,
              Email: user.email,
              Telefono: user.telefono ?? '',
              'Fecha Registro': user.fecha_registro ?? new Date().toISOString().split('T')[0],
              'Analisis Compra IA': '',
            },
          },
          { headers: this.headers }
        )
      );
    } catch (e) {
      console.error('Airtable createUser error:', e);
    }
  }

  async updatePurchaseAnalysis(email: string, analysis: string): Promise<void> {
    try {
      const filterFormula = encodeURIComponent(`({Email}="${email}")`);
      const res = await firstValueFrom(
        this.http.get<{ records: { id: string }[] }>(
          `${this.BASE_URL}?filterByFormula=${filterFormula}`,
          { headers: this.headers }
        )
      );
      if (res.records?.length > 0) {
        const recordId = res.records[0].id;
        await firstValueFrom(
          this.http.patch(
            `${this.BASE_URL}/${recordId}`,
            { fields: { 'Analisis Compra IA': analysis } },
            { headers: this.headers }
          )
        );
      }
    } catch (e) {
      console.error('Airtable updatePurchaseAnalysis error:', e);
    }
  }
}
