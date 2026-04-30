---
name: sevilla-used-car-search
description: Busca y analiza coches de segunda mano en Sevilla, verificando especificaciones, ITV y estado para una compra segura.
license: MIT
metadata:
  category: automotive
  locale: es-ES
  location: Sevilla, Spain
  phase: v1
---

# Búsqueda de Coches de Ocasión en Sevilla

## Qué hace esta skill
Busca vehículos de segunda mano disponibles exclusivamente en **Sevilla y provincia**, aplicando filtros de seguridad mecánica y legal para minimizar riesgos de estafa o averías ocultas.

- Filtra por **Coches en Sevilla** (máximo 50-100km a la redonda).
- Prioriza vehículos con **ITV en vigor** y **Libro de mantenimiento**.
- Analiza la relación entre **Kilometraje y Año** (evitando coches con desgaste excesivo no declarado).
- Desglosa especificaciones: **Caballos (CV)**, Etiqueta Ambiental (C, Eco, 0), Combustible y Tipo de Cambio.

## Criterios de Selección de Proveedores (Sevilla)

| Proveedor | Por qué se usa | Nivel de Confianza |
| --- | --- | --- |
| **Portales de Ocasión (Sevilla)** | Permiten filtrar por código postal (410XX) y ver fotos reales. | Alto (si es profesional) |
| **Webs de Concesionarios Locales** | Ofrecen garantía legal de 1 año mínima. | Muy Alto |
| **Particulares** | Solo se muestran si incluyen descripción detallada de la ITV y estado. | Medio |

## Cuándo usar
- "Busco un Seat León en Sevilla con menos de 100.000km."
- "¿Qué coches con etiqueta ECO hay en Sevilla por menos de 15.000€?"
- "Busco un coche de más de 150cv en Sevilla que tenga la ITV pasada."

## Entradas requeridas (Inputs)
1. **Modelo/Marca:** (Ej: Toyota Auris, VW Golf).
2. **Presupuesto Máximo:** (Opcional, pero recomendado).
3. **Potencia deseada:** (En CV).

## Workflow de Seguridad (Anti-Sustos)
1. **Localización:** Filtrar estrictamente por provincia de **Sevilla**.
2. **Filtro de Potencia/Specs:** Extraer caballos (CV), cilindrada y tipo de combustible.
3. **Validación de "Sustos":**
   - Comprobar mención explícita de **ITV vigente**.
   - Revisar si el vendedor es profesional (Garantía incluida).
   - Verificar **Etiqueta Ambiental** (Crucial para entrar al centro de Sevilla/ZBE).
4. **Cálculo de Desgaste:** Si el coche tiene >200,000km o >15 años, añadir una nota de advertencia mecánica.

## Estructura de Respuesta
La IA responderá de forma organizada:

- **Resumen del Mercado en Sevilla:** (Ej: "He encontrado 8 resultados en Sevilla Capital y Dos Hermanas").
- **Listado de Vehículos:**
  - **Modelo y Año:** (Ej: Ford Focus 2019).
  - **Especificaciones:** CV, Km, Etiqueta DGT.
  - **Estado Legal:** ITV vigente (Sí/No), Garantía incluida.
  - **Precio:** Precio al contado vs. Financiado.
- **Checklist de Seguridad:** Breve consejo sobre qué preguntar al vendedor de ese anuncio específico (ej: "Pide el informe de la DGT para este coche").

## Notas de Fallo
- Si el anuncio no menciona la ITV, la IA debe marcarlo como "Estado de ITV: No especificado (Preguntar)".
- Si el precio es sospechosamente bajo para el mercado de Sevilla, marcar como "Posible Gancho/Estafa".
