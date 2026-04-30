import { Injectable } from '@angular/core';
import { Producto, Resena } from '../models/producto.model';
import { Categoria } from '../models/categoria.model';
import { Marca } from '../models/marca.model';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private categorias: Categoria[] = [
    { id: 1, nombre: 'Smartphones',  icono: 'bi-phone'       },
    { id: 2, nombre: 'Portátiles',   icono: 'bi-laptop'      },
    { id: 3, nombre: 'Tablets',      icono: 'bi-tablet'      },
    { id: 4, nombre: 'Televisores',  icono: 'bi-tv'          },
    { id: 5, nombre: 'Auriculares',  icono: 'bi-headphones'  },
    { id: 6, nombre: 'Smartwatches', icono: 'bi-smartwatch'  },
    { id: 7, nombre: 'Consolas',     icono: 'bi-controller'  },
    { id: 8, nombre: 'Accesorios',   icono: 'bi-bag'         },
  ];

  private marcas: Marca[] = [
    { id: 1,  nombre: 'Apple'     },
    { id: 2,  nombre: 'Samsung'   },
    { id: 3,  nombre: 'Xiaomi'    },
    { id: 4,  nombre: 'Sony'      },
    { id: 5,  nombre: 'LG'        },
    { id: 6,  nombre: 'Lenovo'    },
    { id: 7,  nombre: 'HP'        },
    { id: 8,  nombre: 'Asus'      },
    { id: 9,  nombre: 'Acer'      },
    { id: 10, nombre: 'Nintendo'  },
    { id: 11, nombre: 'Microsoft' },
    { id: 12, nombre: 'JBL'       },
    { id: 13, nombre: 'Huawei'    },
    { id: 14, nombre: 'Logitech'  },
  ];

  private productos: Producto[] = [
    // ─── SMARTPHONES ────────────────────────────────────────────────
    {
      id: 1, nombre: 'iPhone 14', categoria_id: 1, marca_id: 1,
      precio: 899, stock: 20, imagen: '/images/iphone14.jpg',
      valoracion: 4.5, num_resenas: 128,
      descripcion: 'El iPhone 14 incorpora el chip A15 Bionic de Apple para un rendimiento excepcional en tareas cotidianas y creativas. Su pantalla Super Retina XDR de 6,1" con 460 ppp garantiza colores precisos y un brillo de hasta 1.200 nits para perfecta visibilidad bajo el sol. El sistema de cámara dual con modo Acción y Cinematic Mode eleva la fotografía y el vídeo móvil a un nuevo nivel.',
      especificaciones: { 'Pantalla': '6,1" OLED Super Retina XDR, 2532×1170 px, 460 ppp', 'Procesador': 'Apple A15 Bionic (5 nm)', 'RAM': '6 GB', 'Almacenamiento': '128 / 256 / 512 GB', 'Cámara trasera': 'Dual 12 MP (principal + gran angular)', 'Cámara frontal': '12 MP TrueDepth con Face ID', 'Batería': '3.279 mAh — hasta 20 h vídeo', 'Sistema operativo': 'iOS 16 (actualizable a iOS 17)', 'Conectividad': '5G, Wi-Fi 6, Bluetooth 5.3, NFC, USB-C', 'Resistencia': 'IP68 (6 m / 30 min)', 'Dimensiones': '146,7 × 71,5 × 7,8 mm', 'Peso': '172 g' },
    },
    {
      id: 2, nombre: 'iPhone 14 Pro', categoria_id: 1, marca_id: 1,
      precio: 1199, stock: 15, imagen: '/images/iphone14pro.jpg',
      valoracion: 4.8, num_resenas: 95,
      descripcion: 'El iPhone 14 Pro introduce el revolucionario Dynamic Island, una isla interactiva que sustituye al notch y muestra notificaciones y controles de forma inteligente. Su cámara principal de 48 MP con sensor más grande captura imágenes con detalle extraordinario incluso en baja luz gracias al Photonic Engine. El chip A16 Bionic lo convierte en el smartphone más potente del mercado con pantalla ProMotion adaptativa de hasta 120 Hz.',
      especificaciones: { 'Pantalla': '6,1" OLED ProMotion 1-120 Hz, 2556×1179 px, 460 ppp', 'Procesador': 'Apple A16 Bionic (4 nm)', 'RAM': '6 GB', 'Almacenamiento': '128 / 256 / 512 GB / 1 TB', 'Cámara principal': '48 MP (f/1.78) + 12 MP ultra gran angular + 12 MP teleobjetivo 3×', 'Cámara frontal': '12 MP TrueDepth con autofocus', 'Batería': '3.200 mAh — hasta 23 h vídeo', 'Sistema operativo': 'iOS 16 (actualizable a iOS 17)', 'Conectividad': '5G, Wi-Fi 6E, Bluetooth 5.3, NFC, USB 3', 'Dynamic Island': 'Sí', 'Resistencia': 'IP68 (6 m / 30 min)', 'Peso': '206 g' },
    },
    {
      id: 3, nombre: 'Samsung Galaxy S23', categoria_id: 1, marca_id: 2,
      precio: 799, stock: 25, imagen: '/images/s23.jpg',
      valoracion: 4.4, num_resenas: 87,
      descripcion: 'El Samsung Galaxy S23 está equipado con el Snapdragon 8 Gen 2 exclusivo para Galaxy, el procesador más rápido de su generación. Su sistema de cámara triple con sensor principal de 50 MP y grabación de vídeo 8K ofrece resultados profesionales. La pantalla Dynamic AMOLED 2X de 120 Hz proporciona imágenes fluidas y vibrantes con autonomía optimizada gracias al chip de 4 nm.',
      especificaciones: { 'Pantalla': '6,1" Dynamic AMOLED 2X, 120 Hz, 2340×1080 px, 425 ppp', 'Procesador': 'Snapdragon 8 Gen 2 para Galaxy (4 nm)', 'RAM': '8 GB', 'Almacenamiento': '128 / 256 GB UFS 3.1', 'Cámara trasera': '50 MP (f/1.8) + 12 MP gran angular + 10 MP telefoto 3×', 'Cámara frontal': '12 MP (f/2.2)', 'Batería': '3.900 mAh — carga 25W, inalámbrica 15W', 'Sistema operativo': 'Android 13 con One UI 5.1', 'Conectividad': '5G, Wi-Fi 6E, Bluetooth 5.3, NFC, USB-C 3.2', 'Resistencia': 'IP68', 'Peso': '168 g' },
    },
    {
      id: 4, nombre: 'Samsung Galaxy A54', categoria_id: 1, marca_id: 2,
      precio: 349, stock: 40, imagen: '/images/a54.jpg',
      valoracion: 4.2, num_resenas: 156,
      descripcion: 'El Samsung Galaxy A54 5G es la apuesta de gama media de Samsung con pantalla Super AMOLED de 120 Hz y diseño premium sin compromisos. Su procesador Exynos 1380 con 8 GB de RAM gestiona con soltura el multitarea y los juegos más exigentes. La batería de 5.000 mAh con carga de 25W garantiza un día completo de uso intensivo, y su resistencia IP67 lo protege del agua y el polvo.',
      especificaciones: { 'Pantalla': '6,4" Super AMOLED, 120 Hz, 2340×1080 px, 403 ppp', 'Procesador': 'Exynos 1380 (5 nm)', 'RAM': '8 GB', 'Almacenamiento': '128 / 256 GB, microSD hasta 1 TB', 'Cámara trasera': '50 MP (f/1.8) + 12 MP gran angular + 5 MP macro', 'Cámara frontal': '32 MP', 'Batería': '5.000 mAh — carga rápida 25W', 'Sistema operativo': 'Android 13, One UI 5.1 (4 actualizaciones garantizadas)', 'Conectividad': '5G, Wi-Fi 802.11 a/b/g/n/ac, Bluetooth 5.3, NFC', 'Resistencia': 'IP67', 'Peso': '202 g' },
    },
    {
      id: 5, nombre: 'Xiaomi Redmi Note 12', categoria_id: 1, marca_id: 3,
      precio: 199, stock: 50, imagen: '/images/note12.jpg',
      valoracion: 4.1, num_resenas: 234,
      descripcion: 'El Xiaomi Redmi Note 12 ofrece una relación calidad-precio difícil de superar con pantalla AMOLED de 120 Hz y procesador Snapdragon 685. Su gran batería de 5.000 mAh con carga rápida de 33W asegura que nunca te quedarás sin energía en los momentos importantes. La cámara triple de 50 MP con modo nocturno avanzado captura fotos de calidad muy superior a su precio.',
      especificaciones: { 'Pantalla': '6,67" AMOLED, 120 Hz, 2400×1080 px, 395 ppp', 'Procesador': 'Snapdragon 685 (6 nm)', 'RAM': '4 / 6 / 8 GB', 'Almacenamiento': '64 / 128 / 256 GB, microSD', 'Cámara trasera': '50 MP (f/1.8) + 8 MP gran angular + 2 MP macro', 'Cámara frontal': '13 MP', 'Batería': '5.000 mAh — carga rápida 33W', 'Sistema operativo': 'Android 13 con MIUI 14', 'Conectividad': '4G LTE, Wi-Fi 802.11ac, Bluetooth 5.0, NFC', 'Resistencia': 'IP53', 'Peso': '183,5 g' },
    },
    {
      id: 6, nombre: 'Xiaomi 13 Pro', categoria_id: 1, marca_id: 3,
      precio: 1099, stock: 10, imagen: '/images/xiaomi13pro.jpg',
      valoracion: 4.6, num_resenas: 63,
      descripcion: 'El Xiaomi 13 Pro eleva la fotografía móvil a nivel profesional gracias a la colaboración con Leica, que aporta ópticas y procesado de imagen de altísima calidad. El Snapdragon 8 Gen 2 con hasta 12 GB de RAM LPDDR5X ofrece rendimiento de referencia para gaming y aplicaciones exigentes. Su pantalla LTPO AMOLED de 120 Hz adapta la tasa de refresco de forma inteligente para maximizar la batería de 4.820 mAh.',
      especificaciones: { 'Pantalla': '6,73" LTPO AMOLED, 1-120 Hz, 3200×1440 px, 522 ppp', 'Procesador': 'Snapdragon 8 Gen 2 (4 nm)', 'RAM': '12 GB LPDDR5X', 'Almacenamiento': '256 GB UFS 4.0', 'Cámara trasera': '50,3 MP IMX989 Leica (1") + 50 MP gran angular + 50 MP telefoto 3,2×', 'Cámara frontal': '32 MP', 'Batería': '4.820 mAh — carga 120W, inalámbrica 50W', 'Sistema operativo': 'Android 13 con MIUI 14', 'Conectividad': '5G, Wi-Fi 6E, Bluetooth 5.3, NFC, USB-C 3.2', 'Resistencia': 'IP68', 'Peso': '210 g' },
    },
    {
      id: 7, nombre: 'Sony Xperia 10 V', categoria_id: 1, marca_id: 4,
      precio: 399, stock: 18, imagen: '/images/xperia10v.jpg',
      valoracion: 4.0, num_resenas: 42,
      descripcion: 'El Sony Xperia 10 V destaca por su diseño ultraligero de apenas 159 g y su pantalla OLED de 6" con relación de aspecto 21:9, ideal para disfrutar de películas en formato cine. Su compatibilidad con Hi-Res Audio y LDAC garantiza una experiencia de sonido excepcional tanto con auriculares como con altavoces. La batería de 5.000 mAh con carga de 30W ofrece hasta 2 días de autonomía en uso normal.',
      especificaciones: { 'Pantalla': '6" OLED, 60 Hz, 1080×2520 px (21:9), 457 ppp', 'Procesador': 'Snapdragon 695 5G (6 nm)', 'RAM': '6 GB', 'Almacenamiento': '128 GB, microSD hasta 1 TB', 'Cámara trasera': '48 MP (f/1.8) + 8 MP gran angular + 8 MP telefoto 2×', 'Cámara frontal': '8 MP', 'Batería': '5.000 mAh — carga rápida 30W', 'Audio': 'Hi-Res Audio, LDAC, jack 3,5 mm', 'Conectividad': '5G, Wi-Fi 802.11ac, Bluetooth 5.1, NFC', 'Resistencia': 'IP68', 'Peso': '159 g' },
    },
    {
      id: 8, nombre: 'Samsung Galaxy Z Flip 5', categoria_id: 1, marca_id: 2,
      precio: 1199, stock: 12, imagen: '/images/zflip5.jpg',
      valoracion: 4.3, num_resenas: 78,
      descripcion: 'El Samsung Galaxy Z Flip 5 revoluciona el concepto de smartphone plegable con su pantalla Flex Window de 3,4", la mayor de su categoría, que permite ver notificaciones, reproducir música y usar widgets sin abrir el teléfono. Al desplegarlo, su pantalla Dynamic AMOLED 2X de 6,7" y 120 Hz ofrece una experiencia visual premium con el chip Snapdragon 8 Gen 2. La bisagra Flex mejorada permite plegar el teléfono a cualquier ángulo para selfies y vídeos manos libres únicos.',
      especificaciones: { 'Pantalla principal': '6,7" Dynamic AMOLED 2X, 120 Hz, 2640×1080 px', 'Pantalla externa': '3,4" Super AMOLED, 748×720 px', 'Procesador': 'Snapdragon 8 Gen 2 para Galaxy (4 nm)', 'RAM': '8 GB', 'Almacenamiento': '256 / 512 GB UFS 3.1', 'Cámara trasera': '12 MP (f/1.8) + 12 MP gran angular', 'Cámara frontal': '10 MP (f/2.2)', 'Batería': '3.700 mAh — carga 25W, inalámbrica 15W', 'Sistema operativo': 'Android 13, One UI 5.1', 'Conectividad': '5G, Wi-Fi 6E, Bluetooth 5.3, NFC', 'Resistencia': 'IPX8', 'Peso': '187 g' },
    },
    {
      id: 9, nombre: 'iPhone SE 2022', categoria_id: 1, marca_id: 1,
      precio: 499, stock: 30, imagen: '/images/iphonese2022.jpg',
      valoracion: 4.2, num_resenas: 91,
      descripcion: 'El iPhone SE de tercera generación combina el diseño compacto clásico de Apple con el potente chip A15 Bionic, el mismo de los iPhone 13 Pro. Es el iPhone más accesible con conectividad 5G y rendimiento de gama alta, ideal para quienes prefieren pantallas más pequeñas sin renunciar a la potencia. Su cámara de 12 MP con modo Retrato, Smart HDR 4 y grabación 4K a 60 fps ofrece resultados muy superiores a su precio.',
      especificaciones: { 'Pantalla': '4,7" Liquid Retina IPS, 60 Hz, 1334×750 px, 326 ppp', 'Procesador': 'Apple A15 Bionic (5 nm)', 'RAM': '4 GB', 'Almacenamiento': '64 / 128 / 256 GB', 'Cámara trasera': '12 MP (f/1.8) — vídeo 4K 60 fps', 'Cámara frontal': '7 MP FaceTime HD', 'Batería': '2.018 mAh — hasta 15 h vídeo', 'Autenticación': 'Touch ID lateral', 'Conectividad': '5G, Wi-Fi 6, Bluetooth 5.0, NFC', 'Resistencia': 'IP67', 'Peso': '144 g' },
    },
    {
      id: 10, nombre: 'Xiaomi Poco X5', categoria_id: 1, marca_id: 3,
      precio: 249, stock: 35, imagen: '/images/pocox5.jpg',
      valoracion: 4.1, num_resenas: 119,
      descripcion: 'El Xiaomi POCO X5 5G es la opción perfecta para quienes buscan conectividad 5G y pantalla AMOLED de calidad sin gastar demasiado. Su procesador Snapdragon 695 5G ofrece un rendimiento notable para gaming y multitarea, respaldado por hasta 8 GB de RAM y tecnología de ampliación de memoria dinámica. La pantalla de 6,67" con 120 Hz y 240 Hz táctil garantiza una experiencia de juego fluida y responsiva.',
      especificaciones: { 'Pantalla': '6,67" AMOLED, 120 Hz, 2400×1080 px, 395 ppp, 240 Hz táctil', 'Procesador': 'Snapdragon 695 5G (6 nm)', 'RAM': '6 / 8 GB LPDDR4X + 5 GB RAM virtual', 'Almacenamiento': '128 / 256 GB, microSD hasta 1 TB', 'Cámara trasera': '48 MP (f/1.79) + 8 MP gran angular + 2 MP macro', 'Cámara frontal': '13 MP', 'Batería': '5.000 mAh — carga rápida 33W', 'Sistema operativo': 'Android 12 con MIUI 13', 'Conectividad': '5G, Wi-Fi 802.11ac, Bluetooth 5.1, NFC', 'Resistencia': 'IP53', 'Peso': '189 g' },
    },

    // ─── PORTÁTILES ─────────────────────────────────────────────────
    {
      id: 11, nombre: 'MacBook Air M2', categoria_id: 2, marca_id: 1,
      precio: 1299, stock: 10, imagen: '/images/mba_m2.jpg',
      valoracion: 4.9, num_resenas: 204,
      descripcion: 'El MacBook Air con chip M2 redefine el portátil ultraligero con su diseño de 1,24 kg sin ventilador y sin costuras, capaz de ejecutar durante horas las tareas más exigentes sin emitir ningún ruido. La pantalla Liquid Retina de 13,6" con 500 nits de brillo y relación de aspecto 16:10 ofrece espacio adicional para trabajar. Con hasta 18 horas de batería continua y el chip M2 hasta 40 % más rápido que el M1, es el compañero perfecto para trabajar y crear sin límites.',
      especificaciones: { 'Pantalla': '13,6" Liquid Retina, 2560×1664 px, 224 ppp, 500 nits', 'Procesador': 'Apple M2 (8 núcleos CPU — 8/10 núcleos GPU)', 'RAM': '8 / 16 / 24 GB unificada', 'Almacenamiento': '256 GB / 512 GB / 1 TB / 2 TB SSD', 'Batería': '52,6 Wh — hasta 18 h', 'Puertos': '2× USB-C Thunderbolt 4, MagSafe 3, jack 3,5 mm', 'Cámara': '1080p FaceTime HD', 'Sistema operativo': 'macOS Ventura', 'Wi-Fi': 'Wi-Fi 6 (802.11ax)', 'Bluetooth': '5.0', 'Peso': '1,24 kg', 'Grosor': '11,3 mm' },
    },
    {
      id: 12, nombre: 'MacBook Pro 14 M2', categoria_id: 2, marca_id: 1,
      precio: 1999, stock: 8, imagen: '/images/mbp14.jpg',
      valoracion: 4.9, num_resenas: 167,
      descripcion: 'El MacBook Pro 14" con chip M2 Pro es la herramienta definitiva para profesionales creativos que necesitan potencia extrema y portabilidad. Su pantalla Liquid Retina XDR de 3.024×1.964 px con ProMotion adaptativo (1-120 Hz) y 1.000 nits de brillo sostenido ofrece representación del color de referencia para edición fotográfica y de vídeo. Con conectividad completa que incluye HDMI 2.1, lector SD y MagSafe 3, elimina la necesidad de adaptadores.',
      especificaciones: { 'Pantalla': '14,2" Liquid Retina XDR ProMotion 1-120 Hz, 3024×1964 px, 254 ppp, 1.000 nits', 'Procesador': 'Apple M2 Pro (12 núcleos CPU) / M2 Max (12 núcleos CPU)', 'RAM': '16 / 32 / 96 GB unificada', 'Almacenamiento': '512 GB / 1 TB / 2 TB / 4 TB / 8 TB SSD', 'Batería': '70 Wh — hasta 18 h', 'Puertos': '3× Thunderbolt 4, HDMI 2.1, lector SD, MagSafe 3, jack 3,5 mm', 'Cámara': '1080p FaceTime HD', 'Sistema operativo': 'macOS Ventura', 'Wi-Fi': 'Wi-Fi 6E', 'Bluetooth': '5.3', 'Peso': '1,60 kg' },
    },
    {
      id: 13, nombre: 'Lenovo IdeaPad 3', categoria_id: 2, marca_id: 6,
      precio: 499, stock: 20, imagen: '/images/ideapad3.jpg',
      valoracion: 3.9, num_resenas: 88,
      descripcion: 'El Lenovo IdeaPad 3 es un portátil de uso diario fiable y accesible, diseñado para estudiantes y usuarios que buscan un equipo capaz para tareas ofimáticas, navegación web y entretenimiento multimedia. El procesador AMD Ryzen 3 5300U con gráficos integrados Radeon ofrece suficiente rendimiento para el trabajo cotidiano, mientras que la pantalla Full HD de 15,6" proporciona una experiencia visual agradable. Su construcción sólida y conectividad completa con USB-A, USB-C y HDMI lo hacen una elección práctica.',
      especificaciones: { 'Pantalla': '15,6" IPS Full HD 1920×1080 px, antirreflejo', 'Procesador': 'AMD Ryzen 3 5300U (4 núcleos, hasta 3,8 GHz)', 'RAM': '8 GB DDR4', 'Almacenamiento': '256 GB SSD NVMe', 'Gráficos': 'AMD Radeon RX Vega 6 (integrado)', 'Batería': '35 Wh — hasta 7,5 h', 'Puertos': '2× USB-A 3.1, 1× USB-C, HDMI 1.4, lector SD, jack audio', 'Cámara': '720p HD', 'Sistema operativo': 'Windows 11 Home', 'Wi-Fi': 'Wi-Fi 6 (802.11ax)', 'Bluetooth': '5.1', 'Peso': '1,7 kg' },
    },
    {
      id: 14, nombre: 'Lenovo Legion 5', categoria_id: 2, marca_id: 6,
      precio: 1299, stock: 7, imagen: '/images/legion5.jpg',
      valoracion: 4.7, num_resenas: 112,
      descripcion: 'El Lenovo Legion 5 es el portátil gaming preferido por los entusiastas que buscan el mejor rendimiento por su dinero, combinando el AMD Ryzen 7 7745HX con la NVIDIA GeForce RTX 4060. Su pantalla IPS de 15,6" con 165 Hz y tiempo de respuesta de 3 ms garantiza imágenes fluidas sin desenfoque en los juegos más rápidos. El sistema de refrigeración Coldfront 5.0 con cuatro orificios de ventilación mantiene las temperaturas bajo control incluso en sesiones de juego prolongadas.',
      especificaciones: { 'Pantalla': '15,6" IPS, 165 Hz, 2560×1440 px (QHD), sRGB 100%', 'Procesador': 'AMD Ryzen 7 7745HX (8 núcleos, hasta 5,1 GHz)', 'RAM': '16 GB DDR5-4800 (ampliable a 32 GB)', 'Almacenamiento': '512 GB SSD NVMe PCIe 4.0', 'Gráficos': 'NVIDIA GeForce RTX 4060 8 GB GDDR6', 'Batería': '80 Wh — hasta 8 h uso normal', 'Puertos': '4× USB-A 3.2, 1× USB-C Thunderbolt 4, HDMI 2.1, RJ-45, jack audio', 'Cámara': '1080p FHD con obturador físico', 'Sistema operativo': 'Windows 11 Home', 'Wi-Fi': 'Wi-Fi 6E', 'Bluetooth': '5.1', 'Peso': '2,4 kg' },
    },
    {
      id: 15, nombre: 'HP Pavilion 15', categoria_id: 2, marca_id: 7,
      precio: 699, stock: 15, imagen: '/images/pavilion15.jpg',
      valoracion: 4.1, num_resenas: 73,
      descripcion: 'El HP Pavilion 15 ofrece un equilibrio perfecto entre rendimiento, portabilidad y precio con el procesador AMD Ryzen 5 5500U y 16 GB de RAM para manejar con fluidez el trabajo, los estudios y el entretenimiento. Su pantalla micro-edge de 15,6" Full HD con IPS proporciona colores precisos y ángulos de visión amplios, ideal para edición de fotos ligera y consumo de contenido. La batería de larga duración y el chasis de aluminio lo hacen destacar frente a la competencia en su rango de precio.',
      especificaciones: { 'Pantalla': '15,6" IPS Full HD micro-edge, 1920×1080 px, antirreflejo', 'Procesador': 'AMD Ryzen 5 5500U (6 núcleos, hasta 4,0 GHz)', 'RAM': '16 GB DDR4-3200', 'Almacenamiento': '512 GB SSD NVMe', 'Gráficos': 'AMD Radeon Vega 7 (integrado)', 'Batería': '41 Wh — hasta 8,5 h', 'Puertos': '2× USB-A 3.1, 1× USB-C, HDMI 1.4b, lector SD, jack audio', 'Cámara': '720p HP TrueVision HD', 'Sistema operativo': 'Windows 11 Home', 'Wi-Fi': 'Wi-Fi 6', 'Bluetooth': '5.0', 'Peso': '1,75 kg' },
    },
    {
      id: 16, nombre: 'HP Victus 16', categoria_id: 2, marca_id: 7,
      precio: 999, stock: 10, imagen: '/images/victus16.jpg',
      valoracion: 4.4, num_resenas: 56,
      descripcion: 'El HP Victus 16 es un portátil gaming de entrada con aspecto agresivo y prestaciones sólidas, equipado con la NVIDIA GeForce RTX 3050 Ti y el procesador Intel Core i5-12500H para jugar a los títulos actuales con buena calidad gráfica. La pantalla Full HD de 16,1" con 144 Hz reduce el desenfoque y ofrece una ventaja competitiva en juegos FPS y battle royale. Su precio competitivo lo convierte en la opción de entrada al gaming más popular de HP.',
      especificaciones: { 'Pantalla': '16,1" IPS Full HD, 144 Hz, 1920×1080 px, 300 nits', 'Procesador': 'Intel Core i5-12500H (12 núcleos, hasta 4,5 GHz)', 'RAM': '16 GB DDR4-3200 (ampliable)', 'Almacenamiento': '512 GB SSD NVMe PCIe 4.0', 'Gráficos': 'NVIDIA GeForce RTX 3050 Ti 4 GB GDDR6', 'Batería': '70,9 Wh — hasta 8,2 h', 'Puertos': '3× USB-A 3.2, 1× USB-C, HDMI 2.1, RJ-45, lector SD', 'Cámara': '720p HD con obturador de privacidad', 'Sistema operativo': 'Windows 11 Home', 'Wi-Fi': 'Wi-Fi 6', 'Bluetooth': '5.2', 'Peso': '2,29 kg' },
    },
    {
      id: 17, nombre: 'Asus TUF Gaming F15', categoria_id: 2, marca_id: 8,
      precio: 1199, stock: 9, imagen: '/images/tuf15.jpg',
      valoracion: 4.6, num_resenas: 134,
      descripcion: 'El ASUS TUF Gaming F15 es un portátil gaming certificado MIL-STD-810H que combina durabilidad extrema con rendimiento de primer nivel gracias al Intel Core i7-12700H y la NVIDIA GeForce RTX 3060. Su pantalla Full HD con IPS a 144 Hz y cobertura del 100% de sRGB es perfecta tanto para gaming como para edición de contenido. El sistema de refrigeración de doble ventilador con Anti Dust Tunnels garantiza temperatura óptima durante horas de juego intenso.',
      especificaciones: { 'Pantalla': '15,6" IPS Full HD, 144 Hz, 1920×1080 px, 3 ms, sRGB 100%', 'Procesador': 'Intel Core i7-12700H (14 núcleos, hasta 4,7 GHz)', 'RAM': '16 GB DDR4-3200 (ampliable a 32 GB)', 'Almacenamiento': '512 GB SSD NVMe PCIe 4.0', 'Gráficos': 'NVIDIA GeForce RTX 3060 6 GB GDDR6', 'Batería': '90 Wh — hasta 9 h', 'Puertos': '3× USB-A 3.2, 1× USB-C (DP), HDMI 2.0b, RJ-45, jack', 'Certificación': 'MIL-STD-810H (resistencia a impactos, temperatura...)', 'Sistema operativo': 'Windows 11 Home', 'Wi-Fi': 'Wi-Fi 6', 'Bluetooth': '5.0', 'Peso': '2,30 kg' },
    },
    {
      id: 18, nombre: 'Asus ZenBook 14 OLED', categoria_id: 2, marca_id: 8,
      precio: 999, stock: 12, imagen: '/images/zenbook14.jpg',
      valoracion: 4.5, num_resenas: 97,
      descripcion: 'El ASUS ZenBook 14 OLED combina un diseño ultradelgado de aluminio anodizado con una pantalla OLED 2.8K a 90 Hz que ofrece negros perfectos, colores HDR vibrantes y cobertura del 100% del espacio de color DCI-P3. El procesador Intel Core i7-1260P con gráficos Iris Xe proporciona rendimiento muy competente para productividad creativa en un chasis de apenas 1,39 kg. La pantalla tiene certificación PANTONE Validated y TÜV Rheinland para máxima fiabilidad del color.',
      especificaciones: { 'Pantalla': '14" OLED 2.8K (2880×1800 px), 90 Hz, 0,2 ms, DCI-P3 100%, HDR True Black 600', 'Procesador': 'Intel Core i7-1260P (12 núcleos, hasta 4,7 GHz)', 'RAM': '16 GB LPDDR5', 'Almacenamiento': '512 GB SSD NVMe PCIe 4.0', 'Gráficos': 'Intel Iris Xe (integrado)', 'Batería': '75 Wh — hasta 10 h', 'Puertos': '2× Thunderbolt 4, 1× USB-A 3.2, HDMI 2.0, microSD, jack', 'Cámara': '1080p FHD IR con Windows Hello', 'Sistema operativo': 'Windows 11 Home', 'Wi-Fi': 'Wi-Fi 6E', 'Bluetooth': '5.1', 'Peso': '1,39 kg' },
    },
    {
      id: 19, nombre: 'Acer Aspire 5', categoria_id: 2, marca_id: 9,
      precio: 549, stock: 18, imagen: '/images/aspire5.jpg',
      valoracion: 4.0, num_resenas: 145,
      descripcion: 'El Acer Aspire 5 es uno de los portátiles más vendidos en su segmento gracias a su excelente relación calidad-precio y versatilidad para el uso diario, estudios y teletrabajo. El procesador AMD Ryzen 5 5500U con 8 GB de RAM y almacenamiento SSD ofrece un arranque rápido y una respuesta ágil en todas las tareas. Su pantalla IPS Full HD con retroiluminación LED y la batería de larga duración lo convierten en un compañero fiable para todo el día.',
      especificaciones: { 'Pantalla': '15,6" IPS Full HD, 1920×1080 px, 60 Hz, antirreflejo', 'Procesador': 'AMD Ryzen 5 5500U (6 núcleos, hasta 4,0 GHz)', 'RAM': '8 GB DDR4 (1 ranura libre)', 'Almacenamiento': '512 GB SSD NVMe', 'Gráficos': 'AMD Radeon Vega 7 (integrado)', 'Batería': '56,5 Wh — hasta 9,5 h', 'Puertos': '2× USB-A 3.1, 1× USB-C 3.1, HDMI 2.0, lector SD, jack', 'Cámara': '720p HD con indicador LED', 'Sistema operativo': 'Windows 11 Home', 'Wi-Fi': 'Wi-Fi 6', 'Bluetooth': '5.0', 'Peso': '1,80 kg' },
    },
    {
      id: 20, nombre: 'Acer Nitro 5', categoria_id: 2, marca_id: 9,
      precio: 1199, stock: 6, imagen: '/images/nitro5.jpg',
      valoracion: 4.3, num_resenas: 189,
      descripcion: 'El Acer Nitro 5 es el portátil gaming mid-range más popular del mercado, con Intel Core i7-12700H y la NVIDIA GeForce RTX 3060 para jugar a los títulos AAA en alta calidad. Su pantalla QHD de 165 Hz reduce el desenfoque al mínimo para gaming competitivo, mientras que el sistema Dual Fan con 4 conductos de calor mantiene las temperaturas controladas bajo carga. Con 16 GB de RAM DDR5 y SSD PCIe Gen 4, los tiempos de carga son prácticamente nulos.',
      especificaciones: { 'Pantalla': '15,6" IPS, 165 Hz, 2560×1440 px (QHD), sRGB 100%', 'Procesador': 'Intel Core i7-12700H (14 núcleos, hasta 4,7 GHz)', 'RAM': '16 GB DDR5-4800 (ampliable a 32 GB)', 'Almacenamiento': '1 TB SSD NVMe PCIe Gen 4', 'Gráficos': 'NVIDIA GeForce RTX 3060 6 GB GDDR6', 'Batería': '82 Wh — hasta 8 h', 'Puertos': '3× USB-A 3.2, 1× USB-C 3.2 (DP), HDMI 2.1, RJ-45, lector SD', 'Cámara': '1080p FHD', 'Sistema operativo': 'Windows 11 Home', 'Wi-Fi': 'Wi-Fi 6E', 'Bluetooth': '5.1', 'Peso': '2,5 kg' },
    },

    // ─── TABLETS ────────────────────────────────────────────────────
    {
      id: 21, nombre: 'iPad 10ª Gen', categoria_id: 3, marca_id: 1,
      precio: 499, stock: 20, imagen: '/images/ipad10.jpg',
      valoracion: 4.6, num_resenas: 321,
      descripcion: 'El iPad de 10ª generación es el iPad más asequible de Apple con un rediseño completo, pantalla Liquid Retina de 10,9" y compatibilidad con 5G y Wi-Fi 6 para máxima conectividad. El chip A14 Bionic proporciona potencia suficiente para crear contenido, editar fotos, jugar y trabajar con productividad en cualquier lugar. La nueva cámara frontal horizontal de 12 MP con Centro de Escena hace que las videollamadas sean naturales y automáticas.',
      especificaciones: { 'Pantalla': '10,9" Liquid Retina IPS, 2360×1640 px, 264 ppp, 500 nits', 'Procesador': 'Apple A14 Bionic (5 nm)', 'RAM': '4 GB', 'Almacenamiento': '64 / 256 GB', 'Cámara trasera': '12 MP (f/1.8) — vídeo 4K', 'Cámara frontal': '12 MP ultra gran angular (Centro de Escena)', 'Batería': '28,65 Wh — hasta 10 h Wi-Fi', 'Conectividad': 'Wi-Fi 6 / 5G (cellular), USB-C, Bluetooth 5.2', 'Compatibilidad': 'Apple Pencil 1ª gen, Magic Keyboard Folio', 'Dimensiones': '248,6 × 179,5 × 7 mm', 'Peso': '477 g (Wi-Fi) / 481 g (cellular)' },
    },
    {
      id: 22, nombre: 'iPad Pro 11 M2', categoria_id: 3, marca_id: 1,
      precio: 999, stock: 10, imagen: '/images/ipadpro11.jpg',
      valoracion: 4.8, num_resenas: 176,
      descripcion: 'El iPad Pro 11" con chip M2 es el tablet más potente del mercado, con rendimiento equiparable a un ordenador de sobremesa gracias al chip M2 de 8 núcleos GPU y CPU. Su pantalla Liquid Retina de 120 Hz con ProMotion adapta la tasa de refresco a lo que aparece en pantalla para ahorrar batería sin sacrificar fluidez. Compatible con el Apple Pencil de 2ª generación con hover y la Magic Keyboard, es una herramienta de trabajo completa y versátil.',
      especificaciones: { 'Pantalla': '11" Liquid Retina ProMotion 10-120 Hz, 2388×1668 px, 264 ppp, 600 nits, True Tone, P3', 'Procesador': 'Apple M2 (8 núcleos CPU, 10 núcleos GPU)', 'RAM': '8 / 16 GB unificada', 'Almacenamiento': '128 / 256 / 512 GB / 1 TB / 2 TB', 'Cámara trasera': '12 MP (f/1.8) + 10 MP ultra gran angular + LiDAR Scanner', 'Cámara frontal': '12 MP TrueDepth ultra gran angular, Centro de Escena', 'Batería': '28,65 Wh — hasta 10 h Wi-Fi', 'Conectividad': 'Wi-Fi 6E / 5G, Thunderbolt 4, Bluetooth 5.3', 'Compatibilidad': 'Apple Pencil 2ª gen (hover), Magic Keyboard', 'Face ID': 'Sí', 'Peso': '466 g (Wi-Fi)' },
    },
    {
      id: 23, nombre: 'Samsung Galaxy Tab S8', categoria_id: 3, marca_id: 2,
      precio: 799, stock: 12, imagen: '/images/tabs8.jpg',
      valoracion: 4.5, num_resenas: 143,
      descripcion: 'El Samsung Galaxy Tab S8 es el tablet Android premium por excelencia con pantalla LTPS TFT de 11" a 120 Hz y el chip Snapdragon 8 Gen 1 para un rendimiento sobresaliente en juegos, edición de vídeo y productividad. Incluye el S Pen de baja latencia (2,8 ms) que convierte el tablet en una herramienta creativa excepcional para dibujantes y anotadores. Gracias a Samsung DeX puedes usarlo como un ordenador de escritorio completo conectando un monitor y teclado.',
      especificaciones: { 'Pantalla': '11" LTPS TFT, 120 Hz, 2560×1600 px, 274 ppp, 420 nits', 'Procesador': 'Snapdragon 8 Gen 1 (4 nm)', 'RAM': '8 GB LPDDR5', 'Almacenamiento': '128 / 256 GB UFS 3.1, microSD hasta 1 TB', 'Cámara trasera': '13 MP + 6 MP ultra gran angular', 'Cámara frontal': '12 MP ultra gran angular con seguimiento automático', 'Batería': '8.000 mAh — carga rápida 45W', 'Sistema operativo': 'Android 12 con One UI 4.1, DeX', 'Conectividad': 'Wi-Fi 6E, USB-C 3.2, Bluetooth 5.2, NFC', 'S Pen': 'Incluido (latencia 2,8 ms)', 'Resistencia': 'IP68', 'Peso': '503 g' },
    },
    {
      id: 24, nombre: 'Xiaomi Pad 5', categoria_id: 3, marca_id: 3,
      precio: 349, stock: 25, imagen: '/images/pad5.jpg',
      valoracion: 4.3, num_resenas: 267,
      descripcion: 'El Xiaomi Pad 5 redefine la relación calidad-precio en la gama de tablets con una pantalla WQHD+ de 11" a 120 Hz que rivaliza con opciones mucho más caras. El procesador Snapdragon 860 con 6 GB de RAM ofrece excelente rendimiento para gaming, streaming y multitarea en modo split-screen. Sus cuatro altavoces Harman Kardon con Dolby Atmos crean una experiencia de sonido envolvente que hace que ver series y películas sea un placer.',
      especificaciones: { 'Pantalla': '11" IPS LCD WQHD+, 120 Hz, 2560×1600 px, 275 ppp, Dolby Vision', 'Procesador': 'Snapdragon 860 (7 nm+)', 'RAM': '6 GB LPDDR4X', 'Almacenamiento': '128 / 256 GB UFS 3.1', 'Cámara trasera': '13 MP (f/2.0)', 'Cámara frontal': '8 MP (f/2.0)', 'Batería': '8.720 mAh — carga rápida 33W', 'Sistema operativo': 'Android 11 con MIUI for Pad', 'Conectividad': 'Wi-Fi 6 (802.11ax), USB-C 2.0, Bluetooth 5.0', 'Audio': '4 altavoces Harman Kardon, Dolby Atmos', 'Dimensiones': '254,7 × 167,2 × 6,86 mm', 'Peso': '511 g' },
    },
    {
      id: 25, nombre: 'Lenovo Tab M10 Plus', categoria_id: 3, marca_id: 6,
      precio: 199, stock: 30, imagen: '/images/tabm10.jpg',
      valoracion: 3.8, num_resenas: 94,
      descripcion: 'El Lenovo Tab M10 Plus es la tablet familiar por excelencia con pantalla FHD de 10,3" que permite disfrutar de contenido multimedia con calidad muy superior a su precio. El procesador Helio P22T optimizado para multimedia y la batería de 5.100 mAh garantizan horas de entretenimiento sin interrupciones. Ideal para toda la familia gracias al soporte de múltiples perfiles de usuario y el modo Kids Space de Google.',
      especificaciones: { 'Pantalla': '10,3" IPS Full HD, 1920×1200 px, 230 ppp, 320 nits', 'Procesador': 'MediaTek Helio P22T (12 nm)', 'RAM': '4 GB LPDDR4x', 'Almacenamiento': '64 / 128 GB, microSD hasta 256 GB', 'Cámara trasera': '8 MP (f/2.0)', 'Cámara frontal': '5 MP (f/2.2)', 'Batería': '5.100 mAh — carga 10W', 'Sistema operativo': 'Android 11 con ZUI 12.5', 'Conectividad': 'Wi-Fi 802.11ac, USB-C, Bluetooth 5.0', 'Audio': '2 altavoces Dolby Atmos', 'Dimensiones': '243 × 151,8 × 8,15 mm', 'Peso': '460 g' },
    },

    // ─── TELEVISORES ─────────────────────────────────────────────────
    {
      id: 26, nombre: 'Sony Bravia XR A80K 65"', categoria_id: 4, marca_id: 4,
      precio: 1799, stock: 5, imagen: '/images/sonyA80K.jpg',
      valoracion: 4.8, num_resenas: 87,
      descripcion: 'El Sony Bravia XR A80K de 65" con panel OLED es la elección preferida de los cinéfilos gracias al procesador Cognitive Processor XR, diseñado para imitar la forma en que el cerebro humano procesa imagen y sonido. La tecnología XR OLED Contrast PRO combina el OLED Evo con el procesador XR para amplificar el brillo hasta un 200% en zonas clave de la imagen. Su certificación Netflix Calibrated Mode y compatibilidad con Bravia CORE hacen de este televisor la pantalla de referencia para amantes del cine.',
      especificaciones: { 'Pantalla': '65" OLED Evo 4K UHD, 3840×2160 px', 'Tasa de refresco': '120 Hz', 'HDR': 'Dolby Vision, HDR10, HLG, IMAX Enhanced', 'Procesador': 'Cognitive Processor XR', 'Smart TV': 'Google TV', 'Audio': '60W — Acoustic Surface Audio+, Dolby Atmos', 'HDMI': '4× HDMI (2× HDMI 2.1 para 4K@120Hz)', 'Gaming': 'ALLM, VRR, 4K@120Hz', 'USB': '3× USB', 'Asistentes de voz': 'Google Assistant, Amazon Alexa', 'Peso sin pie': '24,5 kg' },
    },
    {
      id: 27, nombre: 'Samsung Neo QLED 8K 65"', categoria_id: 4, marca_id: 2,
      precio: 2999, stock: 3, imagen: '/images/neoQled8K.jpg',
      valoracion: 4.7, num_resenas: 42,
      descripcion: 'El Samsung Neo QLED 8K de 65" utiliza la revolucionaria tecnología Mini LED con miles de zonas de atenuación locales para un control de luz sin precedentes, combinada con la resolución 8K cuatro veces superior al 4K. El procesador Neural Quantum 8K con 16 redes neuronales convierte cualquier contenido a 8K en tiempo real, mientras que el diseño Neo Slim de 15 mm integra perfectamente el televisor en cualquier decoración. Su sistema de sonido Object Tracking Sound Pro sigue los movimientos en pantalla para audio totalmente inmersivo.',
      especificaciones: { 'Pantalla': '65" Neo QLED Mini LED 8K, 7680×4320 px', 'Tasa de refresco': '120 Hz (Motion Xcelerator Turbo Pro)', 'HDR': 'Quantum HDR 64X (2.000 nits pico)', 'Procesador': 'Neural Quantum 8K (16 redes neuronales)', 'Smart TV': 'Tizen 2022 con SmartThings', 'Audio': '80W — Object Tracking Sound Pro, Dolby Atmos', 'HDMI': '4× HDMI 2.1, 1× HDMI 2.0', 'Gaming': 'FreeSync Premium Pro, VRR, ALLM, 144 Hz gaming', 'Conectividad': 'Wi-Fi 6E integrado, Bluetooth 5.2', 'Grosor': '15 mm', 'Peso sin pie': '28,5 kg' },
    },
    {
      id: 28, nombre: 'LG OLED C2 55"', categoria_id: 4, marca_id: 5,
      precio: 1299, stock: 8, imagen: '/images/lgOledC2.jpg',
      valoracion: 4.9, num_resenas: 312,
      descripcion: 'El LG OLED C2 de 55" es considerado el mejor televisor para gaming del mercado, con panel OLED evo de auto-luminous pixels que ofrece negros perfectos, contraste infinito y respuesta de 0,1 ms. Compatible con HDMI 2.1 a 4K@120Hz, G-Sync, FreeSync Premium y ALLM, es la televisión definitiva para PlayStation 5, Xbox Series X y PC gaming. Su procesador α9 Gen5 AI optimiza la imagen y el sonido de forma inteligente según el contenido que estás viendo.',
      especificaciones: { 'Pantalla': '55" OLED evo 4K UHD, 3840×2160 px', 'Tasa de refresco': '120 Hz real', 'Tiempo de respuesta': '0,1 ms (GtG)', 'HDR': 'Dolby Vision IQ, HDR10, HLG', 'Procesador': 'α9 Gen5 AI con Deep Learning', 'Smart TV': 'webOS 22 con ThinQ AI', 'Audio': '60W — Dolby Atmos, DTS:X', 'HDMI': '4× HDMI 2.1 (4K@120Hz, VRR, ALLM)', 'Gaming': 'G-Sync Compatible, FreeSync Premium, HGIG', 'USB': '3× USB', 'Dimensiones sin pie': '1.228 × 707 × 45 mm', 'Peso sin pie': '17,2 kg' },
    },
    {
      id: 29, nombre: 'LG QNED MiniLED 55"', categoria_id: 4, marca_id: 5,
      precio: 799, stock: 10, imagen: '/images/lgQned.jpg',
      valoracion: 4.4, num_resenas: 134,
      descripcion: 'El LG QNED 4K de 55" combina la tecnología Quantum Dot NanoCell con Mini LED para ofrecer colores más puros y un nivel de control de luz muy superior a los LCD convencionales, a un precio más accesible que el OLED. Su procesador α7 Gen5 AI optimiza el contenido en tiempo real y el panel 4K a 120 Hz lo hace compatible con la mayoría de consolas y PCs gaming actuales. Compatible con AirPlay 2, Google Assistant y Amazon Alexa, se integra perfectamente con cualquier ecosistema domótico.',
      especificaciones: { 'Pantalla': '55" QNED MiniLED 4K, 3840×2160 px', 'Tasa de refresco': '120 Hz', 'HDR': 'Filmmaker Mode, HDR10, HLG, Dolby Vision', 'Procesador': 'α7 Gen5 AI', 'Smart TV': 'webOS 22', 'Audio': '40W — Dolby Atmos, DTS:X', 'HDMI': '4× HDMI (2× 2.1, 2× 2.0)', 'Gaming': 'FreeSync Premium, ALLM, G-Sync compatible', 'USB': '3× USB', 'Conectividad': 'Wi-Fi 802.11ax, Bluetooth 5.0', 'Peso sin pie': '14,2 kg' },
    },
    {
      id: 30, nombre: 'Samsung Crystal 4K 43"', categoria_id: 4, marca_id: 2,
      precio: 449, stock: 15, imagen: '/images/samsungCrystal43.jpg',
      valoracion: 4.1, num_resenas: 198,
      descripcion: 'El Samsung Crystal UHD de 43" ofrece la tecnología Crystal con procesador Crystal 4K para upscaling inteligente de cualquier contenido, siendo la pantalla ideal para el salón o el dormitorio. Su Smart TV Tizen con acceso a todas las plataformas de streaming, la app Samsung Health y la función Ambient Mode permiten aprovechar al máximo la pantalla. El modo Game Mode con tiempo de respuesta de 8 ms y soporte para 4K@60Hz lo convierte en una opción gaming económica con buenas prestaciones.',
      especificaciones: { 'Pantalla': '43" Crystal UHD 4K, 3840×2160 px', 'Tasa de refresco': '60 Hz', 'HDR': 'HDR10+', 'Procesador': 'Crystal 4K con upscaling IA', 'Smart TV': 'Tizen con SmartThings', 'Audio': '20W — Dolby Digital Plus', 'HDMI': '3× HDMI (1× 2.0, 2× 1.4)', 'Gaming': 'Game Mode — 8 ms tiempo respuesta', 'USB': '2× USB 2.0', 'Conectividad': 'Wi-Fi integrado, Bluetooth 4.2', 'Peso sin pie': '8,0 kg' },
    },

    // ─── AURICULARES ─────────────────────────────────────────────────
    {
      id: 34, nombre: 'AirPods Pro 2', categoria_id: 5, marca_id: 1,
      precio: 299, stock: 25, imagen: '/images/airpodspro2.jpg',
      valoracion: 4.7, num_resenas: 534,
      descripcion: 'Los AirPods Pro de 2ª generación elevan la cancelación activa de ruido a un nivel sin precedentes gracias al chip H2, capaz de bloquear el doble de ruido que la generación anterior en tiempo real. El audio adaptativo inteligente ajusta automáticamente cuánto sonido del entorno dejas pasar según lo que estás haciendo, combinando el modo de transparencia y la cancelación activa de forma fluida. El audio espacial personalizado con seguimiento dinámico de cabeza crea una experiencia envolvente que hace que el sonido provenga del mundo que te rodea.',
      especificaciones: { 'Tipo': 'In-ear True Wireless', 'Chip': 'Apple H2', 'Cancelación ruido': 'ANC adaptativo (2× mejor que AirPods Pro 1)', 'Modos audio': 'ANC, Transparencia, Audio adaptativo, Desactivado', 'Audio espacial': 'Dolby Atmos con seguimiento dinámico de cabeza', 'Batería auriculares': 'Hasta 6 h (ANC) — 30 h totales con estuche', 'Carga': 'Lightning / MagSafe / Qi2 / Apple Watch', 'Resistencia': 'IPX4 (auriculares y estuche)', 'Conectividad': 'Bluetooth 5.3 con chip H2', 'Control': 'Presión en el tallo + deslizamiento de volumen', 'Peso por auricular': '5,3 g' },
    },
    {
      id: 35, nombre: 'AirPods 3', categoria_id: 5, marca_id: 1,
      precio: 199, stock: 30, imagen: '/images/airpods3.jpg',
      valoracion: 4.5, num_resenas: 389,
      descripcion: 'Los AirPods de 3ª generación heredan el diseño de los AirPods Pro con vástago corto y ajuste adaptativo para mayor comodidad durante horas. El chip H1 potencia el audio espacial personalizado con seguimiento dinámico de cabeza, haciendo que la música suene como si viniera del mundo que te rodea. La carga MagSafe y la resistencia al agua IPX4 los hacen perfectos para el deporte y cualquier actividad cotidiana.',
      especificaciones: { 'Tipo': 'In-ear True Wireless (diseño abierto)', 'Chip': 'Apple H1', 'Audio espacial': 'Con seguimiento dinámico de cabeza', 'Ecualizador adaptativo': 'Sí', 'Batería auriculares': 'Hasta 6 h — 30 h totales con estuche', 'Carga': 'Lightning / MagSafe / Qi', 'Resistencia': 'IPX4', 'Conectividad': 'Bluetooth 5.0 con chip H1', 'Control': 'Presión en el vástago (reproducción, llamadas, Siri)', 'Peso por auricular': '4,28 g' },
    },
    {
      id: 38, nombre: 'JBL Tune 510BT', categoria_id: 5, marca_id: 12,
      precio: 49, stock: 40, imagen: '/images/tune510.jpg',
      valoracion: 4.0, num_resenas: 892,
      descripcion: 'Los JBL Tune 510BT son los auriculares supraaurales Bluetooth más vendidos de la marca gracias a su sonido Pure Bass JBL, autonomía de hasta 40 horas y precio imbatible. Sus almohadillas suaves y la diadema acolchada permiten usarlos durante horas sin incomodidad. El plegado compacto facilita llevarlos en cualquier mochila, y el multipoint Bluetooth permite conectarlos a dos dispositivos a la vez sin desconectar.',
      especificaciones: { 'Tipo': 'Supraural (over-ear cerrado)', 'Conectividad': 'Bluetooth 5.0 + cable 3,5 mm incluido', 'Driver': '32 mm', 'Respuesta de frecuencia': '20 Hz – 20 kHz', 'Batería': 'Hasta 40 h (5 min de carga = 2 h de uso)', 'Carga': 'USB-C', 'Multipoint': 'Sí (2 dispositivos simultáneos)', 'JBL Pure Bass': 'Sí', 'Micrófono': 'Integrado (manos libres)', 'Peso': '160 g', 'Colores': 'Blanco / Negro / Azul / Rosa' },
    },
    {
      id: 39, nombre: 'JBL Live 660NC', categoria_id: 5, marca_id: 12,
      precio: 149, stock: 25, imagen: '/images/live660.jpg',
      valoracion: 4.3, num_resenas: 321,
      descripcion: 'Los JBL Live 660NC ofrecen la experiencia completa de cancelación activa de ruido de JBL con hasta 50 horas de batería, perfectos para el trabajo, los viajes y el estudio. La tecnología JBL Adaptive Noise Cancelling con Multiple Microphone Technology analiza el entorno y ajusta la cancelación de ruido de forma automática. Con los modos Talk-Thru y Ambient Aware puedes interactuar con el entorno sin quitarte los auriculares, mientras que Google Assistant y Amazon Alexa responden a tus órdenes de voz.',
      especificaciones: { 'Tipo': 'Supraural (over-ear) inalámbrico', 'Conectividad': 'Bluetooth 5.0 + cable de audio incluido', 'Driver': '40 mm', 'ANC': 'Adaptativo con múltiples micrófonos', 'Batería': '50 h sin ANC / 38 h con ANC', 'Carga': 'USB-C (carga completa 4 h — 15 min = 3 h)', 'Modos': 'Talk-Thru, Ambient Aware', 'Asistentes de voz': 'Google Assistant, Amazon Alexa', 'Control': 'Botones físicos + app JBL Headphones', 'Peso': '268 g' },
    },
    {
      id: 40, nombre: 'Samsung Galaxy Buds 2 Pro', categoria_id: 5, marca_id: 2,
      precio: 229, stock: 18, imagen: '/images/buds2pro.jpg',
      valoracion: 4.4, num_resenas: 267,
      descripcion: 'Los Samsung Galaxy Buds 2 Pro son los auriculares premium de Samsung con ANC inteligente que bloquea hasta 3 veces más ruido que los Buds Pro originales. Su tamaño reducido y el nuevo diseño ergonómico de 3 tallas de aletas garantizan un ajuste seguro y cómodo para oídos de cualquier tamaño. El audio de 24 bits Hi-Fi y la compatibilidad con Dolby Head Tracking para audio espacial crean una experiencia sonora de alta fidelidad digna de auriculares de estudio.',
      especificaciones: { 'Tipo': 'In-ear True Wireless', 'ANC': 'Inteligente de 3 niveles (3× mejor que Buds Pro)', 'Audio': '24 bits Hi-Fi, Dolby Head Tracking, 360 Audio', 'Batería auriculares': '5 h (con ANC) / 8 h (sin ANC)', 'Batería con estuche': '18 h (con ANC) / 29 h (sin ANC)', 'Carga': 'USB-C + inalámbrica Qi', 'Resistencia': 'IPX7 auriculares — estuche IPX2', 'Conectividad': 'Bluetooth 5.3', 'Micrófonos': '3 micrófonos + cancelación de viento', 'Peso por auricular': '5,5 g' },
    },

    // ─── SMARTWATCHES ────────────────────────────────────────────────
    {
      id: 41, nombre: 'Apple Watch Series 8', categoria_id: 6, marca_id: 1,
      precio: 499, stock: 15, imagen: '/images/watch8.jpg',
      valoracion: 4.6, num_resenas: 432,
      descripcion: 'El Apple Watch Series 8 añade un sensor de temperatura de muñeca para el seguimiento del ciclo menstrual y la detección de fiebre, siendo el primer Apple Watch con esta capacidad. La detección de accidente automovilístico llama automáticamente a los servicios de emergencia si detectas un accidente grave de tráfico, incluso si no puedes hablar. Con el chip S8 bicúcleo y hasta 18 horas de batería, ofrece el máximo rendimiento para salud, fitness y conectividad todo el día.',
      especificaciones: { 'Pantalla': 'Always-On Retina LTPO (45 mm: 396×484 px / 41 mm: 352×430 px)', 'Chip': 'S8 (bicúcleo)', 'Sensores': 'ECG, SpO2, temperatura de piel, acelerómetro, giroscopio, altímetro, brújula, GPS L1/L5', 'Batería': 'Hasta 18 h (hasta 60 h modo ahorro)', 'Carga': 'Magnética Apple Watch (USB-C)', 'Resistencia': 'WR50 (50 m natación) + IP6X polvo', 'Sistema operativo': 'watchOS 9', 'Conectividad': 'Wi-Fi 802.11b/g/n, Bluetooth 5.3, NFC Apple Pay, LTE/UMTS (cellular)', 'Detecciones': 'Caída, accidente de tráfico, ruido alto', 'Tamaños': '41 mm / 45 mm', 'Peso': '32 g (aluminio 41 mm)' },
    },
    {
      id: 42, nombre: 'Apple Watch SE 2022', categoria_id: 6, marca_id: 1,
      precio: 299, stock: 20, imagen: '/images/watchse.jpg',
      valoracion: 4.4, num_resenas: 287,
      descripcion: 'El Apple Watch SE de 2ª generación es el Apple Watch más asequible de la gama actual, con el chip S8 que ofrece un 20% más de velocidad que el SE de 1ª generación. Incluye las funciones de salud más demandadas: frecuencia cardíaca, SpO2, detección de caída y GPS integrado para el deporte. Su pantalla Retina y el diseño de aluminio reciclado al 100% lo convierten en la mejor puerta de entrada al ecosistema Apple Watch.',
      especificaciones: { 'Pantalla': 'Retina LTPO (44 mm: 368×448 px / 40 mm: 324×394 px)', 'Chip': 'S8 (bicúcleo)', 'Sensores': 'Frecuencia cardíaca, SpO2, acelerómetro, giroscopio, altímetro, GPS L1', 'Batería': 'Hasta 18 h', 'Carga': 'Magnética Fast Charging', 'Resistencia': 'WR50 (50 m natación)', 'Sistema operativo': 'watchOS 9', 'Conectividad': 'Wi-Fi 802.11b/g/n, Bluetooth 5.3, NFC Apple Pay', 'Detecciones': 'Caída, ruido alto', 'Tamaños': '40 mm / 44 mm', 'Peso': '26,4 g (aluminio 40 mm)' },
    },
    {
      id: 43, nombre: 'Samsung Galaxy Watch 5', categoria_id: 6, marca_id: 2,
      precio: 299, stock: 18, imagen: '/images/watch5.jpg',
      valoracion: 4.3, num_resenas: 198,
      descripcion: 'El Samsung Galaxy Watch 5 es el smartwatch Android más completo con sensor BioActive avanzado que mide la composición corporal (masa muscular, grasa, agua), temperatura corporal, ECG y frecuencia cardíaca de forma continua. Su pantalla Sapphire Crystal resistente a arañazos y la batería mejorada un 90% respecto al Watch 4 lo hacen mucho más duradero en el día a día. Con WearOS 3.5 y Samsung One UI Watch 4.5, la experiencia de usuario es la más fluida y completa del mercado Android.',
      especificaciones: { 'Pantalla': '1,4" Super AMOLED, 450×450 px (44 mm)', 'Procesador': 'Exynos W920 Dual Core 1,18 GHz', 'RAM': '1,5 GB', 'Almacenamiento': '16 GB', 'Sensores': 'BioActive (ECG, SpO2, composición corporal, temperatura), GPS + GLONASS + Beidou + Galileo', 'Batería': '410 mAh — hasta 50 h uso mixto', 'Carga': 'Wireless Fast Charging (USB-C)', 'Resistencia': 'IP68 + 5 ATM + MIL-STD-810T', 'Sistema operativo': 'WearOS 3.5 + One UI Watch 4.5', 'Conectividad': 'Wi-Fi, Bluetooth 5.0, NFC, LTE (cellular)', 'Tamaños': '40 mm / 44 mm' },
    },
    {
      id: 44, nombre: 'Xiaomi Watch S1', categoria_id: 6, marca_id: 3,
      precio: 199, stock: 25, imagen: '/images/watchs1.jpg',
      valoracion: 4.2, num_resenas: 341,
      descripcion: 'El Xiaomi Watch S1 ofrece una combinación de elegancia y tecnología que normalmente se encuentra en relojes de precio mucho más elevado, con caja de acero inoxidable, cristal de zafiro y correa de cuero premium. Gracias a sus 117 modos deportivos y el GPS de doble banda con 5 sistemas de posicionamiento, es el reloj deportivo más versátil de Xiaomi. Su pantalla AMOLED de 1,43" con 326 ppp y la batería de 470 mAh le otorgan hasta 12 días de autonomía en uso normal.',
      especificaciones: { 'Pantalla': '1,43" AMOLED, 326 ppp, 600 nits', 'Caja': 'Acero inoxidable 316L con bisel de cristal de zafiro', 'Sensores': 'PPG (FC continua), SpO2, estrés, temperatura de piel, acelerómetro, giroscopio, barómetro, altímetro', 'GPS': 'Dual-band L1+L5 — 5 sistemas (GPS, GLONASS, Beidou, Galileo, QZSS)', 'Modos deporte': '117 modos (19 reconocidos automáticamente)', 'Batería': '470 mAh — hasta 12 días', 'Resistencia': '5 ATM', 'Sistema operativo': 'MIUI Watch', 'Conectividad': 'Bluetooth 5.2, NFC', 'Peso': '42 g' },
    },
    {
      id: 45, nombre: 'Huawei Watch GT3', categoria_id: 6, marca_id: 13,
      precio: 249, stock: 20, imagen: '/images/gt3.jpg',
      valoracion: 4.3, num_resenas: 214,
      descripcion: 'El Huawei Watch GT3 combina un diseño elegante con funciones de salud avanzadas como la monitorización continua de SpO2, la temperatura de piel y la detección automática de 100 actividades deportivas. Su motor de running inteligente analiza los parámetros de carrera y proporciona entrenamientos personalizados basados en el VO2max y el umbral de lactato. La pantalla AMOLED de alta resolución con más de 10.000 esferas descargables permite personalizarlo por completo.',
      especificaciones: { 'Pantalla': '1,43" AMOLED, 466×466 px, 326 ppp (46 mm)', 'Caja': 'Aluminio aeroespacial con corona de acero inoxidable', 'Sensores': 'TruSeen 5.0+ (FC 24/7), TruOxygen 3.0 (SpO2), temperatura de piel, barómetro, GPS dual L1+L5', 'Modos deporte': '100 modos (15 reconocidos automáticamente)', 'Batería': '455 mAh — 14 días uso normal / 7 días GPS continuo', 'Resistencia': '5 ATM + IP68', 'Sistema operativo': 'HarmonyOS 3', 'Conectividad': 'Bluetooth 5.2 LE, NFC', 'Tamaños': '42 mm / 46 mm', 'Peso': '42 g (46 mm)' },
    },

    // ─── CONSOLAS ────────────────────────────────────────────────────
    {
      id: 46, nombre: 'PlayStation 5', categoria_id: 7, marca_id: 4,
      precio: 549, stock: 10, imagen: '/images/ps5.jpg',
      valoracion: 4.9, num_resenas: 1243,
      descripcion: 'La PlayStation 5 representa el salto generacional más significativo en la historia de las consolas Sony, con el SSD ultrarrápido de 825 GB que elimina prácticamente los tiempos de carga y permite mundos de juego sin interrupciones. El mando DualSense introduce gatillos adaptativos y retroalimentación háptica avanzada que simulan la resistencia y las texturas del mundo del juego de forma inmersiva. Su GPU RDNA 2 capaz de ray tracing en tiempo real y la resolución 8K permiten gráficos cinematográficos en los últimos títulos exclusivos.',
      especificaciones: { 'CPU': 'AMD Zen 2 — 8 núcleos 16 hilos, 3,5 GHz variable', 'GPU': 'AMD RDNA 2 — 10,3 TFLOPS, 36 CUs a 2,23 GHz', 'RAM': '16 GB GDDR6', 'Almacenamiento': '825 GB SSD propietario NVMe (5.500 MB/s lectura)', 'Resolución': 'Hasta 8K / 4K@120fps / 1080p@120fps', 'Óptico': 'Ultra HD Blu-Ray 4K', 'Audio': 'Tempest 3D AudioTech', 'Mando': 'DualSense (háptica avanzada + gatillos adaptativos)', 'Conectividad': 'USB-A 3.1, USB-A 2.0, USB-C, HDMI 2.1, Ethernet, Wi-Fi 6, Bluetooth 5.1', 'Dimensiones': '390 × 104 × 260 mm', 'Peso': '4,5 kg' },
    },
    {
      id: 47, nombre: 'Xbox Series X', categoria_id: 7, marca_id: 11,
      precio: 499, stock: 12, imagen: '/images/seriesx.jpg',
      valoracion: 4.8, num_resenas: 876,
      descripcion: 'La Xbox Series X es la consola más potente del mercado con 12 TFLOPS de rendimiento GPU, capaz de ejecutar juegos a 4K@120fps con ray tracing activado. Gracias al Xbox Game Pass Ultimate tienes acceso a más de 400 juegos incluidos en la suscripción mensual, incluidos todos los títulos de Xbox Game Studios el día de lanzamiento. La retrocompatibilidad con juegos de Xbox One, Xbox 360 y Xbox original mejora los títulos más antiguos con FPS Boost y resolución mejorada.',
      especificaciones: { 'CPU': 'AMD Zen 2 — 8 núcleos 16 hilos, 3,8 GHz (3,6 GHz SMT)', 'GPU': 'AMD RDNA 2 — 12 TFLOPS, 52 CUs a 1,825 GHz', 'RAM': '16 GB GDDR6 + 10 GB GDDR6', 'Almacenamiento': '1 TB SSD NVMe (2.4 GB/s lectura)', 'Resolución': 'Hasta 8K / 4K@120fps / 1440p@120fps', 'Óptico': 'Ultra HD Blu-Ray 4K', 'Mando': 'Xbox Wireless Controller', 'Game Pass': 'Compatible con Xbox Game Pass Ultimate', 'Conectividad': '3× USB-A 3.1, HDMI 2.1, Ethernet, Wi-Fi 5, Bluetooth 5.0, Storage Expansion Card', 'Dimensiones': '301 × 151 × 151 mm', 'Peso': '4,45 kg' },
    },
    {
      id: 48, nombre: 'Nintendo Switch OLED', categoria_id: 7, marca_id: 10,
      precio: 349, stock: 20, imagen: '/images/switcholed.png',
      valoracion: 4.7, num_resenas: 2134,
      descripcion: 'La Nintendo Switch OLED es la evolución de la exitosa consola híbrida de Nintendo con una pantalla OLED de 7" con colores más vivos, negros más profundos y mayor brillo que la pantalla LCD original. El soporte ajustable de mayor tamaño permite disfrutar del modo sobremesa en cualquier superficie de forma estable, mientras que los altavoces mejorados ofrecen un sonido más rico y potente. Con más de 6.000 juegos disponibles como Zelda, Mario Kart, Animal Crossing y Super Mario Bros, es la consola familiar y portátil perfecta.',
      especificaciones: { 'Pantalla portátil': '7" OLED, 1280×720 px', 'CPU/GPU': 'NVIDIA Tegra X1+ personalizado', 'RAM': '4 GB LPDDR4', 'Almacenamiento': '64 GB (ampliable con microSD hasta 2 TB)', 'Resolución en dock': 'Hasta 1080p@60fps', 'Resolución portátil': 'Hasta 720p@60fps', 'Batería': '4.310 mAh — 4,5-9 h según juego', 'Carga': 'USB-C', 'Conectividad': 'Wi-Fi 802.11ac, Bluetooth 4.1, NFC (Joy-Con)', 'Audio': 'Altavoces estéreo con ecualización adaptativa', 'Dimensiones portátil': '242 × 102 × 13,9 mm', 'Peso portátil': '320 g' },
    },

    // ─── ACCESORIOS ──────────────────────────────────────────────────
    {
      id: 49, nombre: 'Logitech MX Master 3S', categoria_id: 8, marca_id: 14,
      precio: 89, stock: 30, imagen: '/images/mxmaster3s.jpg',
      valoracion: 4.8, num_resenas: 678,
      descripcion: 'El Logitech MX Master 3S es el ratón inalámbrico de referencia para productividad, con clics silenciosos que reducen el ruido en un 90% sin sacrificar la respuesta táctil. La rueda MagSpeed electromagnética puede desplazarse por miles de líneas en un segundo o cambiar a modo clic a clic con total precisión, adaptándose al tipo de trabajo. Compatible con hasta 3 dispositivos mediante Bluetooth o el receptor USB Logi Bolt, la batería ofrece hasta 70 días sin recargar.',
      especificaciones: { 'Sensor': 'Darkfield 8.000 DPI (100-8.000 ajustable)', 'Conectividad': 'Bluetooth Low Energy + receptor Logi Bolt USB', 'Dispositivos': 'Hasta 3 (cambio con Easy-Switch)', 'Rueda principal': 'MagSpeed electromagnética (velocidad + clics precisos)', 'Clic silencioso': '90% más silencioso (certificado)', 'Botones programables': '7 botones + rueda de desplazamiento horizontal', 'Batería': 'Li-Po 500 mAh — hasta 70 días, carga USB-C', 'Carga rápida': '1 min = 3 h de uso', 'Compatibilidad': 'Windows, macOS, iPadOS, Linux, ChromeOS', 'Ergonomía': 'Diseño para mano derecha', 'Peso': '141 g' },
    },
    {
      id: 50, nombre: 'Apple MagSafe Charger 15W', categoria_id: 8, marca_id: 1,
      precio: 39, stock: 50, imagen: '/images/magsafe.jpg',
      valoracion: 4.5, num_resenas: 1023,
      descripcion: 'El cargador MagSafe de Apple ofrece la carga inalámbrica más rápida disponible para iPhone 12 y posteriores con hasta 15W de potencia, frente a los 7,5W de los cargadores Qi estándar. El sistema de imanes integrado garantiza la alineación perfecta del cargador con el iPhone en cada uso, maximizando la eficiencia de carga y protegiendo la batería. Compatible también con el Apple Watch y los AirPods con estuche de carga inalámbrica.',
      especificaciones: { 'Potencia máxima': '15W (iPhone 12 y posteriores)', 'Compatibilidad Qi': '7,5W (otros iPhone) / 5W (otros dispositivos Qi)', 'Longitud cable': '1 metro (trenzado)', 'Conector': 'USB-C (requiere adaptador 20W+ no incluido)', 'Imanes': 'Array magnético patentado de alineación perfecta', 'Compatible con': 'iPhone 12/13/14/15 series, Apple Watch, AirPods', 'Certificación': 'Made for iPhone, Qi2', 'Peso': '22 g' },
    },
    {
      id: 51, nombre: 'Samsung 45W Super Fast Charger', categoria_id: 8, marca_id: 2,
      precio: 45, stock: 40, imagen: '/images/samsung45w.jpg',
      valoracion: 4.6, num_resenas: 445,
      descripcion: 'El adaptador de carga rápida Samsung 45W Super Fast Charging 2.0 es el cargador más rápido de Samsung, capaz de cargar la batería de un Galaxy S23 Ultra de 0 a 65% en solo 30 minutos. La tecnología Power Delivery 3.0 y el cable USB-C a USB-C de alta velocidad incluido garantizan compatibilidad total con los dispositivos Samsung Galaxy de última generación. También es compatible con otros dispositivos USB-C como portátiles, tablets y smartphones con USB Power Delivery.',
      especificaciones: { 'Potencia máxima': '45W (Samsung Super Fast Charging 2.0)', 'Estándares': 'USB Power Delivery 3.0, AFC, PPS', 'Tensión de salida': '5V/3A, 9V/2,77A, 15V/3A, 20V/2,25A', 'Conector': 'USB-C', 'Cable incluido': 'USB-C a USB-C 1m (100W, Gen 2)', 'Compatible con': 'Galaxy S21/S22/S23/S24 serie, Tab S7/S8/S9 serie, portátiles USB-C', 'Certificaciones': 'CE, FCC, RoHS', 'Dimensiones': '43 × 43 × 29 mm', 'Peso': '85 g' },
    },
    {
      id: 52, nombre: 'Xiaomi Mi Power Bank 30000mAh', categoria_id: 8, marca_id: 3,
      precio: 49, stock: 35, imagen: '/images/powerbank30k.jpg',
      valoracion: 4.4, num_resenas: 789,
      descripcion: 'La Xiaomi Mi Power Bank 3 de 30.000 mAh es la batería portátil de alta capacidad más popular del mercado, capaz de cargar hasta 3 veces un iPhone 14 Pro Max o más de 2 veces un iPad Air. Sus dos puertos USB-A de alta velocidad y el USB-C bidireccional permiten cargar hasta 3 dispositivos simultáneamente, mientras que la entrada USB-C de 18W la recarga desde cero en unas 6 horas. El indicador LED de 4 niveles muestra el estado de carga y el circuito de protección múltiple protege todos tus dispositivos.',
      especificaciones: { 'Capacidad': '30.000 mAh (real ~19.000 mAh a 5V)', 'Salida USB-A 1': '5V/3A, 9V/2A, 12V/1,5A — Quick Charge 3.0 (18W)', 'Salida USB-A 2': '5V/2,4A (12W)', 'Salida/Entrada USB-C': '5V/3A, 9V/2A, 12V/1,5A — 18W bidireccional', 'Potencia simultánea': '30W (2 puertos activos)', 'Carga de entrada': '18W (recarga completa ~5,5 h)', 'Indicador': '4 LEDs de nivel de batería', 'Protecciones': 'Sobrecarga, cortocircuito, sobrecalentamiento, sobretensión', 'Dimensiones': '175,8 × 80,7 × 27 mm', 'Peso': '630 g' },
    },
    {
      id: 53, nombre: 'Logitech K380 Teclado Bluetooth', categoria_id: 8, marca_id: 14,
      precio: 39, stock: 45, imagen: '/images/k380.jpg',
      valoracion: 4.5, num_resenas: 1234,
      descripcion: 'El Logitech K380 es el teclado Bluetooth compacto más versátil del mercado gracias a su capacidad de conectarse a 3 dispositivos simultáneamente con cambio instantáneo mediante una pulsación de botón. Su diseño compacto con teclas redondas distintivas y perfil bajo lo hace cómodo para escribir durante horas y fácil de transportar en cualquier mochila. Compatible con Windows, macOS, iOS, Android y Chrome OS, es el teclado perfecto para quien trabaja con varios dispositivos a la vez.',
      especificaciones: { 'Tipo': 'Teclado de membrana compacto TKL', 'Conectividad': 'Bluetooth 3.0 (3 canales con Easy-Switch)', 'Dispositivos simultáneos': '3 (cambio con botón de un toque)', 'Distribución': 'Española (ES)', 'Teclas especiales': '12 teclas F1-F12 + multimedia', 'Batería': '2 pilas AAA — hasta 24 meses', 'Compatibilidad': 'Windows 7+, macOS 10.12+, Android 5+, iOS 5+, ChromeOS', 'Dimensiones': '279 × 124 × 16 mm', 'Peso': '423 g', 'Colores disponibles': 'Off-White / Grafito / Rosa / Azul' },
    },
  ];

  private resenas: Resena[] = [
    { id: 1,  producto_id: 1,  usuario_id: 1, usuario_nombre: 'Carlos M.',   valoracion: 5, comentario: 'Excelente teléfono, cámara increíble y batería que dura todo el día.', fecha: '2024-03-15' },
    { id: 2,  producto_id: 1,  usuario_id: 2, usuario_nombre: 'Laura G.',    valoracion: 4, comentario: 'Muy buen smartphone, aunque el precio es elevado. Rápido y con buena cámara.', fecha: '2024-02-28' },
    { id: 3,  producto_id: 1,  usuario_id: 3, usuario_nombre: 'Pedro S.',    valoracion: 5, comentario: 'Lo mejor que he tenido. El Dynamic Island es muy práctico.', fecha: '2024-01-10' },
    { id: 4,  producto_id: 3,  usuario_id: 4, usuario_nombre: 'Ana R.',      valoracion: 4, comentario: 'Muy fluido y cámara de gran calidad. Recomendado para cualquier usuario Android.', fecha: '2024-03-20' },
    { id: 5,  producto_id: 11, usuario_id: 1, usuario_nombre: 'Carlos M.',   valoracion: 5, comentario: 'El MacBook Air M2 es simplemente perfecto. Ligero, potente y completamente silencioso.', fecha: '2024-04-01' },
    { id: 6,  producto_id: 46, usuario_id: 5, usuario_nombre: 'Miguel T.',   valoracion: 5, comentario: 'La PS5 es una bestia. Los tiempos de carga son increíblemente rápidos y el DualSense es revolucionario.', fecha: '2024-03-25' },
    { id: 7,  producto_id: 46, usuario_id: 6, usuario_nombre: 'Sara L.',     valoracion: 5, comentario: 'Gráficos alucinantes. Cada exclusivo de Sony tiene una calidad cinematográfica impresionante.', fecha: '2024-04-05' },
    { id: 8,  producto_id: 48, usuario_id: 7, usuario_nombre: 'Roberto P.',  valoracion: 5, comentario: 'La Nintendo Switch OLED es perfecta para jugar en cualquier lugar. La pantalla OLED es espectacular.', fecha: '2024-03-18' },
    { id: 9,  producto_id: 28, usuario_id: 8, usuario_nombre: 'Elena F.',    valoracion: 5, comentario: 'El LG OLED C2 ofrece la mejor imagen que he visto en un televisor. El gaming a 4K@120Hz es increíble.', fecha: '2024-02-15' },
    { id: 10, producto_id: 34, usuario_id: 9, usuario_nombre: 'Javier N.',   valoracion: 4, comentario: 'Los AirPods Pro 2 son muy cómodos y el sonido es excelente. La cancelación de ruido es espectacular.', fecha: '2024-04-10' },
    { id: 11, producto_id: 14, usuario_id: 2, usuario_nombre: 'Laura G.',    valoracion: 5, comentario: 'El Lenovo Legion 5 es una bestia para gaming. Juego a 1440p sin problemas y los juegos se ven perfectos.', fecha: '2024-04-12' },
    { id: 12, producto_id: 49, usuario_id: 3, usuario_nombre: 'Pedro S.',    valoracion: 5, comentario: 'El MX Master 3S es el mejor ratón que he probado. La rueda MagSpeed es adictiva y la batería dura semanas.', fecha: '2024-04-08' },
  ];

  getCategorias(): Categoria[] { return this.categorias; }
  getMarcas(): Marca[] { return this.marcas; }

  getProductos(): Producto[] {
    return this.productos.map(p => ({
      ...p,
      categoria: this.categorias.find(c => c.id === p.categoria_id)?.nombre,
      marca: this.marcas.find(m => m.id === p.marca_id)?.nombre,
    }));
  }

  getProductoById(id: number): Producto | undefined {
    const p = this.productos.find(p => p.id === id);
    if (!p) return undefined;
    return {
      ...p,
      categoria: this.categorias.find(c => c.id === p.categoria_id)?.nombre,
      marca: this.marcas.find(m => m.id === p.marca_id)?.nombre,
    };
  }

  getProductosByCategoria(categoriaId: number): Producto[] {
    return this.getProductos().filter(p => p.categoria_id === categoriaId);
  }

  getProductosByMarca(marcaId: number): Producto[] {
    return this.getProductos().filter(p => p.marca_id === marcaId);
  }

  buscar(query: string): Producto[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return this.getProductos().filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.descripcion.toLowerCase().includes(q) ||
      p.marca?.toLowerCase().includes(q) ||
      p.categoria?.toLowerCase().includes(q)
    );
  }

  getProductosDestacados(): Producto[] {
    return this.getProductos()
      .filter(p => (p.valoracion ?? 0) >= 4.5)
      .slice(0, 8);
  }

  getNovedades(): Producto[] {
    const all = this.getProductos();
    return all.slice(Math.max(0, all.length - 8));
  }

  getRelacionados(producto: Producto): Producto[] {
    return this.getProductos()
      .filter(p => p.categoria_id === producto.categoria_id && p.id !== producto.id)
      .slice(0, 4);
  }

  getResenasByProducto(productoId: number): Resena[] {
    return this.resenas.filter(r => r.producto_id === productoId);
  }

  addResena(resena: Omit<Resena, 'id'>): void {
    const newId = Math.max(...this.resenas.map(r => r.id)) + 1;
    this.resenas.push({ ...resena, id: newId });
    const producto = this.productos.find(p => p.id === resena.producto_id);
    if (producto) {
      const resenas = this.getResenasByProducto(resena.producto_id);
      producto.valoracion = resenas.reduce((acc, r) => acc + r.valoracion, 0) / resenas.length;
      producto.num_resenas = resenas.length;
    }
  }
}
