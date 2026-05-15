# Proyecto Fin de Grado — Documentación
**Ciclo Formativo de Grado Superior — Desarrollo de Aplicaciones Multiplataforma (2º Curso)**

---

# TecnoMarket

### Plataforma de comercio electrónico multiplataforma con inteligencia artificial

---

**Nombre:** Antonio Manuel  
**Apellidos:** —  
**Curso:** 2025–2026

---

---

## Índice

1. [Introducción](#1-introducción)
2. [Requisitos para el Desarrollo](#2-requisitos-para-el-desarrollo)
   - 2.1 Requisitos principales
   - 2.2 Requisitos opcionales
   - 2.3 Dependencias
3. [Puesta en marcha y uso](#3-puesta-en-marcha-y-uso)
   - 3.1 Estructura del código y archivos
   - 3.2 Conceptos clave
   - 3.3 Base de Datos (Esquema)
   - 3.4 Procesos principales
4. [Posibles ampliaciones](#4-posibles-ampliaciones)
5. [Valoración personal](#5-valoración-personal)
6. [Apéndices](#6-apéndices)

---

## 1. Introducción

**TecnoMarket** es una plataforma de comercio electrónico especializada en productos tecnológicos (ordenadores, smartphones, tablets, auriculares, etc.). El proyecto se ha desarrollado en dos versiones complementarias:

- **Aplicación Android nativa** (Kotlin + Android SDK)
- **Aplicación Web** (Angular 21 + TypeScript)

Ambas versiones comparten el mismo modelo de negocio y backend en la nube, demostrando el enfoque multiplataforma propio de un ciclo DAM.

El elemento diferenciador del proyecto es la integración de **Inteligencia Artificial** mediante la API de Google Gemini: al finalizar una compra, el sistema analiza automáticamente el historial del usuario y genera un perfil de compra personalizado que queda almacenado en la nube (Airtable).

Las funcionalidades principales son:

- Catálogo de productos con búsqueda, filtros y ordenación
- Carrito de compra y proceso de checkout
- Historial de pedidos
- Registro y autenticación de usuarios
- Soporte de idiomas Español / Inglés
- Análisis de perfil de compra con IA (Google Gemini)
- Sincronización de datos de usuario en la nube (Airtable)

---

## 2. Requisitos para el Desarrollo

### 2.1 Requisitos principales

#### App Android
| Requisito | Versión mínima |
|-----------|---------------|
| Android Studio | Ladybug (2024.2) o superior |
| JDK | 17 |
| Android SDK | API 24 (Android 7.0) |
| Android SDK Target | API 36 (Android 15) |
| Kotlin | 2.0+ |
| Gradle | 8.x |
| Dispositivo / Emulador | Android 7.0 o superior |

#### App Web (Angular)
| Requisito | Versión mínima |
|-----------|---------------|
| Node.js | 22.x LTS |
| npm | 11.x |
| Angular CLI | 21.x |
| Navegador | Chrome 120 / Firefox 120 / Edge 120 |

#### Cuentas y servicios externos (ambas plataformas)
- Cuenta en **Airtable** (plan gratuito suficiente) con base de datos configurada
- Clave de API de **Google Gemini** (Google AI Studio, plan gratuito disponible)

### 2.2 Requisitos opcionales

- **Git** para clonar el repositorio y gestionar versiones
- **Postman** o similar para probar las llamadas a la API de Airtable
- Conexión a Internet activa durante la ejecución (para las llamadas a Airtable y Gemini)

### 2.3 Dependencias

Las dependencias principales se gestionan automáticamente:

- **Android:** Gradle descarga las dependencias al compilar (`OkHttp`, `Gson`, `Glide`, `Material Components`)
- **Web:** `npm install` instala todos los paquetes declarados en `package.json` (`@angular/core`, `rxjs`, `bootstrap`, etc.)

Los ficheros de claves API (`local.properties` en Android, `environment.ts` en Angular) **no están en el repositorio** y deben crearse manualmente antes de compilar (ver sección 3).

---

## 3. Puesta en marcha y uso

### Configuración previa (ambas plataformas)

Antes de ejecutar cualquiera de las dos versiones, hay que crear los siguientes ficheros con las claves reales:

**Android** → `local.properties` (en la raíz del proyecto):
```
AIRTABLE_API_KEY=tuClaveAirtable
GEMINI_API_KEY=tuClaveGemini
AIRTABLE_BASE_ID=tuBaseId
```

**Web** → `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  airtableApiKey: 'tuClaveAirtable',
  geminiApiKey: 'tuClaveGemini',
  airtableBaseId: 'tuBaseId'
};
```

### Ejecutar la App Android
1. Abrir el proyecto `AplicacionTFG` en Android Studio
2. Esperar a que Gradle sincronice las dependencias
3. Crear `local.properties` con las claves API (ver arriba)
4. Conectar dispositivo físico o iniciar emulador (API ≥ 24)
5. Pulsar **Run ▶**

**Credenciales de demo:** `admin@tfg.com` / `1234`

### Ejecutar la App Web
```bash
cd tienda-online
npm install
ng serve
# Abrir http://localhost:4200
```

### Manual de usuario básico

| Acción | Pasos |
|--------|-------|
| Ver catálogo | Pantalla principal → sección Productos |
| Buscar producto | Icono lupa → escribir nombre o categoría |
| Añadir al carrito | Detalle de producto → botón "Añadir al carrito" |
| Finalizar compra | Carrito → Checkout → rellenar datos de envío → Confirmar |
| Ver pedidos | Menú → Mis Pedidos |
| Cambiar idioma | Menú → icono bandera (ES / EN) |
| Ver análisis IA | Se genera automáticamente tras confirmar un pedido |

---

### 3.1 Estructura del código y archivos

#### App Android (`AplicacionTFG/app/src/main/`)

```
java/com/example/aplicaciontfg/
├── activities/          → Pantallas principales (Login, Registro, Detalle, Checkout…)
├── fragments/           → Secciones del menú inferior (Home, Catálogo, Carrito, Perfil)
├── managers/            → Lógica de negocio (Auth, Carrito, Pedidos, Airtable, Gemini, Idioma)
├── adapters/            → Adaptadores RecyclerView (Productos, Carrito, Pedidos)
├── models/              → Clases de datos (Producto, Usuario, Pedido, CarritoItem…)
└── database/            → TiendaDbHelper.kt (SQLite)

res/
├── layout/              → Ficheros XML de interfaz
├── drawable/            → Iconos, splash screen, selector de estados
├── values/              → Strings ES, colores, estilos
└── values-en/           → Strings EN (internacionalización)
```

#### App Web (`tienda-online/src/app/`)

```
components/              → 14 componentes de UI (home, product-list, cart, checkout…)
core/
├── services/            → Servicios Angular (auth, productos, carrito, airtable, gemini…)
├── models/              → Interfaces TypeScript
└── guards/              → Protección de rutas (AuthGuard)
shared/
├── pipes/               → Pipes reutilizables
└── directives/          → Directivas personalizadas
app.routes.ts            → Configuración de rutas
```

---

### 3.2 Conceptos clave

#### Android — Arquitectura en capas

La app Android sigue una arquitectura en capas sencilla:

- **Capa de presentación:** `Activities` y `Fragments` gestionan la UI y los eventos del usuario. Se usa `ViewBinding` para acceder a las vistas de forma segura, evitando `findViewById`.
- **Capa de lógica:** Los `Managers` (clases singleton) encapsulan la lógica de negocio y las llamadas a APIs. Esto desacopla la UI de los datos.
- **Capa de datos:** `TiendaDbHelper` gestiona la base de datos SQLite local; `AirtableManager` y `GeminiManager` se comunican con los servicios en la nube.

El patrón de comunicación entre UI y lógica usa **Kotlin Coroutines** con `lifecycleScope.launch` para no bloquear el hilo principal durante las llamadas de red.

#### Web Angular — Arquitectura de servicios

La app Angular usa la arquitectura propia del framework:

- **Componentes:** Unidad básica de UI. Cada pantalla es un componente independiente con su propio HTML, CSS y lógica TypeScript.
- **Servicios + Inyección de dependencias:** Los servicios (p. ej. `CarritoService`, `AirtableService`) son instancias singleton inyectadas donde se necesitan. Los datos se comparten mediante **RxJS Observables** (`BehaviorSubject`).
- **Router:** Gestiona la navegación SPA sin recargas de página. Las rutas protegidas usan `AuthGuard`.
- **HttpClient:** Módulo Angular para llamadas HTTP asíncronas a Airtable y Gemini.

#### Internacionalización (i18n)

Ambas versiones soportan Español e Inglés. En Android se usan carpetas de recursos `values/` y `values-en/` con el mismo fichero `strings.xml`. En Angular se ha implementado un `TranslateService` propio que carga el idioma activo desde `localStorage`.

#### Integración Airtable

Airtable se usa como base de datos en la nube para usuarios. Las llamadas se realizan directamente desde el cliente mediante la REST API de Airtable con autenticación por Bearer Token. La tabla principal `Usuarios` almacena: nombre, apellidos, email, teléfono, fecha de registro y el análisis de IA.

#### Integración Google Gemini

Tras completar un pedido, `GeminiManager` / `GeminiService` envía a la API de Gemini un resumen del historial de compras del usuario. Gemini devuelve un análisis en texto libre del perfil de compra (preferencias de marca, rango de precios, categorías frecuentes). Este análisis se almacena en Airtable junto al perfil del usuario.

---

### 3.3 Base de Datos (Esquema)

#### SQLite local (Android)

La base de datos local `tecnomarket.db` contiene los datos del catálogo y las operaciones del usuario:

```
┌─────────────┐     ┌──────────────────┐     ┌──────────────┐
│  categorias │     │    productos     │     │   marcas     │
├─────────────┤     ├──────────────────┤     ├──────────────┤
│ id (PK)     │◄────│ id (PK)          │────►│ id (PK)      │
│ nombre      │     │ nombre           │     │ nombre       │
│ icono       │     │ descripcion      │     └──────────────┘
└─────────────┘     │ precio           │
                    │ stock            │
                    │ imagen_url       │
                    │ id_categoria (FK)│
                    │ id_marca (FK)    │
                    │ valoracion       │
                    └──────────────────┘
                            │
                            │
┌──────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   usuarios   │     │     pedidos      │     │  detalle_pedido  │
├──────────────┤     ├──────────────────┤     ├──────────────────┤
│ id (PK)      │◄────│ id (PK)          │◄────│ id (PK)          │
│ nombre       │     │ id_usuario (FK)  │     │ id_pedido (FK)   │
│ apellidos    │     │ fecha            │     │ id_producto (FK) │
│ email        │     │ total            │     │ cantidad         │
│ telefono     │     │ direccion_envio  │     │ precio_unitario  │
│ password     │     │ estado           │     └──────────────────┘
└──────────────┘     └──────────────────┘
```

#### Airtable — Nube (ambas plataformas)

Tabla `Usuarios`:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Nombre | Texto corto | Nombre del usuario |
| Apellidos | Texto corto | Apellidos |
| Email | Email | Identificador único |
| Telefono | Teléfono | Número de contacto |
| Fecha Registro | Fecha | Momento de registro |
| Analisis Compra IA | Texto largo | Análisis generado por Gemini |

---

### 3.4 Procesos principales

#### Proceso 1 — Registro de usuario con sincronización en la nube

```
Usuario rellena formulario de registro
          │
          ▼
AuthManager.register() / auth.service.ts
  1. Validar campos (email, contraseña, teléfono)
  2. Comprobar que el email no existe en SQLite / localStorage
  3. Guardar usuario en SQLite (Android) / localStorage (Web)
  4. Llamar a AirtableManager.registrarUsuario()
     └─ POST https://api.airtable.com/v0/{baseId}/Usuarios
        { Nombre, Apellidos, Email, Telefono, Fecha Registro }
  5. Si Airtable devuelve 200 → éxito
  6. Redirigir al Home con sesión iniciada
```

#### Proceso 2 — Análisis IA tras confirmar pedido

Este es el proceso más relevante del proyecto desde el punto de vista técnico:

```
Usuario pulsa "Confirmar Pedido" en Checkout
          │
          ▼
PedidosManager.finalizarPedido()
  1. Guardar pedido en SQLite / localStorage
  2. Vaciar carrito
  3. Mostrar pantalla de confirmación
  4. En segundo plano (Coroutine / async):
     │
     ▼
GeminiManager.analizarPerfilCompra(usuario, historialPedidos)
  1. Construir prompt con el historial de compras:
     "Analiza el perfil de compra del usuario {nombre}.
      Ha comprado: {lista de productos, categorías, importes}.
      Genera un análisis breve de sus preferencias..."
  2. POST https://generativelanguage.googleapis.com/v1beta/models/
        gemini-2.5-flash:generateContent
     { contents: [{ parts: [{ text: prompt }] }] }
  3. Extraer texto de la respuesta JSON
     └─ response.candidates[0].content.parts[0].text
  4. Guardar análisis en Airtable:
     PATCH https://api.airtable.com/v0/{baseId}/Usuarios/{recordId}
     { "Analisis Compra IA": textoAnalisis }
```

#### Proceso 3 — Búsqueda y filtrado de productos

```
Usuario escribe en buscador o selecciona filtros
          │
          ▼
ProductosService / ProductListFragment
  1. Recoger parámetros: texto, categoría, marca, precio min/max, orden
  2. Construir query SQL (Android):
     SELECT * FROM productos
     WHERE nombre LIKE '%texto%'
     AND id_categoria = ? AND precio BETWEEN ? AND ?
     ORDER BY precio ASC
  3. Web: filtrar array en memoria con Array.filter() + sort()
  4. Actualizar RecyclerView / lista de componentes con resultados
  5. Mostrar contador de resultados encontrados
```

---

## 4. Posibles ampliaciones

El proyecto tiene margen de mejora en varias áreas:

1. **Pasarela de pago real** — Integrar Stripe o PayPal para procesar pagos reales en lugar de simular el checkout.

2. **Sistema de valoraciones** — Permitir que los usuarios puntúen y reseñen los productos que han comprado, con almacenamiento en Airtable o Supabase.

3. **Notificaciones push** — Usar Firebase Cloud Messaging (FCM) para enviar notificaciones de estado de pedido (confirmado, enviado, entregado).

4. **Panel de administración** — Interfaz web para que el administrador gestione el catálogo de productos, stock y pedidos sin tocar la base de datos directamente.

5. **Recomendaciones IA** — Ampliar el uso de Gemini para mostrar recomendaciones de productos personalizadas en el Home, basadas en el historial del usuario.

6. **Modo offline** — Implementar caché local en la app Android con Room (sustituyendo el SQLiteOpenHelper actual) para que la aplicación funcione sin conexión y sincronice al recuperarla.

7. **Autenticación OAuth** — Añadir login con Google / GitHub usando Firebase Auth, eliminando la gestión manual de contraseñas.

8. **Versión iOS** — Migrar la lógica de negocio Android a **Kotlin Multiplatform** para compartir código entre Android e iOS.

---

## 5. Valoración personal

El desarrollo de TecnoMarket ha sido una experiencia muy completa que ha abarcado prácticamente todos los módulos del ciclo DAM: programación orientada a objetos, bases de datos, acceso a datos, desarrollo de interfaces, y sistemas de gestión empresarial.

**Principales aprendizajes:**

El mayor reto técnico fue la integración de la API de Google Gemini. Los primeros intentos fallaban por problemas de timeout y porque el modelo `gemini-2.5-flash` usa una arquitectura de "thinking" que requiere una configuración específica (`thinkingConfig: { thinkingBudget: 0 }` para respuestas rápidas). Una vez resuelto, la funcionalidad quedó muy sólida.

Implementar el soporte bilingüe en Android requirió reorganizar todos los recursos de texto desde el principio, algo que habría sido mucho más sencillo de haber planificado desde el inicio del proyecto.

Desarrollar la misma aplicación en dos tecnologías diferentes (Kotlin/Android y Angular/TypeScript) permitió comparar directamente los enfoques: la inyección de dependencias de Angular es muy elegante para proyectos grandes, mientras que los Managers de Android ofrecen más control a bajo nivel.

**Dificultades encontradas:**

- Sincronización asíncrona entre la UI y las llamadas de red (resuelto con Coroutines en Android y RxJS en Angular)
- Gestión de claves API de forma segura sin exponerlas en el repositorio
- Consistencia de datos entre SQLite local y Airtable en la nube
- Gestión del estado del carrito compartido entre fragmentos en Android

En general, el proyecto ha resultado más ambicioso de lo esperado inicialmente, pero ha servido para consolidar los conocimientos del ciclo y explorar tecnologías de nivel profesional como la integración de IA generativa en aplicaciones móviles y web.

---

## 6. Apéndices

### A. Repositorio Git

El código fuente está disponible en GitHub:

- **App Android (TFG):** `https://github.com/AntonioManuel2006/AplicacionTFG`
- **App Web (Angular):** Incluida en el mismo repositorio, carpeta `tienda-online/`

### B. Tecnologías y versiones completas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Kotlin | 2.0 | Lenguaje principal Android |
| Android SDK | API 24–36 | Plataforma móvil |
| Material Design | 3 | Componentes UI Android |
| OkHttp | 4.12 | Cliente HTTP Android |
| Gson | 2.10 | Serialización JSON Android |
| Glide | 4.16 | Carga de imágenes Android |
| Angular | 21.0 | Framework web |
| TypeScript | 5.9 | Lenguaje web |
| RxJS | 7.8 | Programación reactiva web |
| Bootstrap | 5.3 | Estilos web |
| Airtable API | v0 | Base de datos en la nube |
| Google Gemini | 2.5 Flash | Análisis IA |

### C. Estructura de la base de datos Airtable

La base de Airtable se llama **TecnoMarket** y contiene la tabla **Usuarios** con los campos descritos en la sección 3.3. Para replicar el entorno, crear la base con exactamente esos nombres de campo ya que el código los referencia directamente.

### D. Capturas de pantalla

*(Incluir capturas de las pantallas principales: Home, Catálogo, Detalle de Producto, Carrito, Checkout, Pedidos, Perfil y el análisis generado por IA)*

---

*Documentación generada para el Proyecto Fin de Grado — DAM 2025–2026*
