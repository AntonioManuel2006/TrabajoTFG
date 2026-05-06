# TecnoMarket — App Android (TFG DAM)

Aplicación de tienda online de electrónica desarrollada como Trabajo de Fin de Grado del ciclo de Desarrollo de Aplicaciones Multiplataforma (DAM).

---

## Descripción

TecnoMarket es una app Android nativa que simula una tienda online de productos tecnológicos. Permite explorar productos, filtrarlos por categoría y marca, añadirlos al carrito, realizar pedidos y gestionar la cuenta de usuario.

Incluye integración con **Airtable** para registrar usuarios y con **Google Gemini** para generar automáticamente un análisis de perfil de compra con IA al confirmar un pedido.

---

## Características

- **Pantalla de inicio** con hero section, categorías, productos destacados, novedades y banners promocionales
- **Catálogo de productos** con búsqueda, filtros por categoría/marca/precio y ordenación
- **Detalle de producto** con galería, descripción, valoraciones y productos relacionados
- **Carrito de compra** con gestión de cantidades y resumen de pedido
- **Checkout** con formulario de envío y confirmación de pedido simulada
- **Mis Pedidos** con historial completo
- **Perfil de usuario** con registro, inicio de sesión y cierre de sesión
- **Cambio de idioma** Español / English desde la pantalla de inicio
- **Integración Airtable** — guarda cada nuevo usuario registrado en la base de datos
- **Integración Gemini AI** — genera un análisis del perfil de compra del cliente al confirmar un pedido y lo almacena en Airtable

---

## Tecnologías

| Tecnología | Uso |
|---|---|
| Kotlin | Lenguaje principal |
| Android SDK (API 24–36) | Plataforma |
| Material Design 3 | Componentes de UI |
| ViewBinding | Acceso a vistas |
| SQLite + SQLiteOpenHelper | Base de datos local |
| OkHttp | Llamadas HTTP (Airtable, Gemini) |
| Kotlin Coroutines | Operaciones asíncronas |
| Gson | Serialización JSON |
| Glide | Carga de imágenes |
| Airtable REST API | Registro de usuarios en la nube |
| Google Gemini 2.5 Flash | Análisis de compras con IA |

---

## Estructura del proyecto

```
app/src/main/java/com/example/aplicaciontfg/
├── activities/
│   ├── MainActivity.kt          # Navegación principal con BottomNav
│   ├── LoginActivity.kt
│   ├── RegisterActivity.kt
│   ├── ProductDetailActivity.kt
│   ├── CategoryActivity.kt
│   ├── SearchActivity.kt
│   ├── CheckoutActivity.kt
│   └── OrdersActivity.kt
├── fragments/
│   ├── HomeFragment.kt
│   ├── ProductListFragment.kt
│   ├── CartFragment.kt
│   └── ProfileFragment.kt
├── managers/
│   ├── AuthManager.kt
│   ├── CarritoManager.kt
│   ├── PedidosManager.kt
│   ├── LanguageManager.kt       # Cambio de idioma ES/EN
│   ├── AirtableManager.kt       # Integración Airtable
│   └── GeminiManager.kt         # Análisis IA con Gemini
├── adapters/
├── models/
└── database/
    └── TiendaDbHelper.kt        # SQLite con productos, categorías y usuarios
```

---

## Configuración de las APIs

Las claves de las APIs **no están en el código** por seguridad. Se leen desde `local.properties`, que nunca se sube al repositorio.

Añade las siguientes líneas a tu archivo `local.properties`:

```properties
airtable.token=TU_AIRTABLE_PERSONAL_ACCESS_TOKEN
gemini.key=TU_GEMINI_API_KEY
```

- **Airtable token** → [airtable.com/create/tokens](https://airtable.com/create/tokens)
- **Gemini API key** → [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

La tabla de Airtable debe llamarse `Usuarios` y tener los campos:
`Nombre`, `Apellidos`, `Email`, `Telefono`, `Fecha Registro`, `Analisis Compra IA`

---

## Requisitos

- Android Studio Hedgehog o superior
- JDK 11
- Android SDK API 24 o superior
- Conexión a internet (para Airtable y Gemini)

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/AntonioManuel2006/TrabajoTFG.git
cd TrabajoTFG

# Añadir las claves en local.properties (ver sección anterior)

# Abrir en Android Studio y ejecutar en emulador o dispositivo físico
```

---

## Credenciales de demo

La app incluye un usuario de demostración:

| Campo | Valor |
|---|---|
| Email | admin@tfg.com |
| Contraseña | 1234 |

---

## Relación con la versión web

Este proyecto es la versión Android de la tienda online desarrollada también como parte del TFG en Angular. Ambas versiones comparten la misma base de datos Airtable y el mismo sistema de análisis con Gemini.

---

## Autor

**Antonio Manuel Garcés Luna**  
TFG — Desarrollo de Aplicaciones Multiplataforma (DAM) · 2026
