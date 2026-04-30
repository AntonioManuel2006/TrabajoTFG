-- ============================================
-- BASE DE DATOS TIENDA ONLINE (TFG - DAM)
-- Compatible con SQL Developer (Oracle) y MySQL
-- ============================================

-- ============================================
-- TABLAS PRINCIPALES
-- ============================================

CREATE TABLE categorias (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL,
    icono       VARCHAR(50) DEFAULT 'bi-box',
    descripcion TEXT
);

CREATE TABLE marcas (
    id     INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    pais   VARCHAR(100)
);

CREATE TABLE productos (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    nombre       VARCHAR(255) NOT NULL,
    descripcion  TEXT,
    precio       DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    stock        INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    imagen       VARCHAR(500),
    categoria_id INT,
    marca_id     INT,
    valoracion   DECIMAL(3,2) DEFAULT 0 CHECK (valoracion BETWEEN 0 AND 5),
    num_resenas  INT DEFAULT 0,
    activo       TINYINT(1) DEFAULT 1,
    fecha_alta   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL,
    FOREIGN KEY (marca_id)     REFERENCES marcas(id)     ON DELETE SET NULL
);

-- ============================================
-- USUARIOS Y DIRECCIONES
-- ============================================

CREATE TABLE usuarios (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    nombre          VARCHAR(100) NOT NULL,
    apellidos       VARCHAR(150),
    email           VARCHAR(150) UNIQUE NOT NULL,
    password        VARCHAR(255) NOT NULL,
    telefono        VARCHAR(20),
    rol             ENUM('cliente','admin') DEFAULT 'cliente',
    activo          TINYINT(1) DEFAULT 1,
    fecha_registro  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE direcciones (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id  INT NOT NULL,
    alias       VARCHAR(50) DEFAULT 'Principal',
    direccion   VARCHAR(255) NOT NULL,
    ciudad      VARCHAR(100) NOT NULL,
    provincia   VARCHAR(100) NOT NULL,
    cp          VARCHAR(10) NOT NULL,
    pais        VARCHAR(100) DEFAULT 'España',
    predeterminada TINYINT(1) DEFAULT 0,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ============================================
-- PEDIDOS
-- ============================================

CREATE TABLE pedidos (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id   INT NOT NULL,
    direccion_id INT NOT NULL,
    fecha        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    subtotal     DECIMAL(10,2) NOT NULL,
    iva          DECIMAL(10,2) NOT NULL,
    total        DECIMAL(10,2) NOT NULL,
    estado       ENUM('pendiente','confirmado','enviado','entregado','cancelado') DEFAULT 'pendiente',
    numero_pedido VARCHAR(30) UNIQUE,
    notas        TEXT,
    FOREIGN KEY (usuario_id)   REFERENCES usuarios(id)   ON DELETE RESTRICT,
    FOREIGN KEY (direccion_id) REFERENCES direcciones(id) ON DELETE RESTRICT
);

CREATE TABLE pedido_detalle (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id       INT NOT NULL,
    producto_id     INT NOT NULL,
    nombre_producto VARCHAR(255) NOT NULL,
    cantidad        INT NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal        DECIMAL(10,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
    FOREIGN KEY (pedido_id)   REFERENCES pedidos(id)   ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE RESTRICT
);

-- ============================================
-- CARRITO
-- ============================================

CREATE TABLE carrito (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id     INT NOT NULL,
    producto_id    INT NOT NULL,
    cantidad       INT NOT NULL DEFAULT 1 CHECK (cantidad > 0),
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_carrito (usuario_id, producto_id),
    FOREIGN KEY (usuario_id)  REFERENCES usuarios(id)  ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- ============================================
-- RESEÑAS
-- ============================================

CREATE TABLE resenas (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    producto_id  INT NOT NULL,
    usuario_id   INT NOT NULL,
    valoracion   TINYINT NOT NULL CHECK (valoracion BETWEEN 1 AND 5),
    comentario   TEXT,
    fecha        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verificada   TINYINT(1) DEFAULT 0,
    UNIQUE KEY uq_resena (producto_id, usuario_id),
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id)  REFERENCES usuarios(id)  ON DELETE CASCADE
);

-- ============================================
-- LISTA DE DESEOS (WISHLIST)
-- ============================================

CREATE TABLE lista_deseos (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id   INT NOT NULL,
    producto_id  INT NOT NULL,
    fecha_alta   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_deseos (usuario_id, producto_id),
    FOREIGN KEY (usuario_id)  REFERENCES usuarios(id)  ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- ============================================
-- DATOS DE EJEMPLO - CATEGORÍAS
-- ============================================

INSERT INTO categorias (nombre, icono, descripcion) VALUES
('Smartphones',   'bi-phone',      'Teléfonos inteligentes de las mejores marcas'),
('Portátiles',    'bi-laptop',     'Portátiles para trabajo, estudio y gaming'),
('Tablets',       'bi-tablet',     'Tablets para uso personal y profesional'),
('Televisores',   'bi-tv',         'Televisores 4K, OLED, QLED y más'),
('Auriculares',   'bi-headphones', 'Auriculares inalámbricos y con cable'),
('Smartwatches',  'bi-smartwatch', 'Relojes inteligentes y fitness trackers'),
('Consolas',      'bi-controller', 'Consolas y videojuegos de última generación'),
('Accesorios',    'bi-bag',        'Accesorios y periféricos para tus dispositivos');

-- ============================================
-- DATOS DE EJEMPLO - MARCAS
-- ============================================

INSERT INTO marcas (nombre, pais) VALUES
('Apple',     'Estados Unidos'),
('Samsung',   'Corea del Sur'),
('Xiaomi',    'China'),
('Sony',      'Japón'),
('LG',        'Corea del Sur'),
('Lenovo',    'China'),
('HP',        'Estados Unidos'),
('Asus',      'Taiwán'),
('Acer',      'Taiwán'),
('Nintendo',  'Japón'),
('Microsoft', 'Estados Unidos'),
('JBL',       'Estados Unidos');

-- ============================================
-- DATOS DE EJEMPLO - PRODUCTOS (50)
-- ============================================

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, categoria_id, marca_id, valoracion, num_resenas) VALUES
-- SMARTPHONES (categoria 1)
('iPhone 14',               'Smartphone Apple con pantalla Super Retina XDR de 6.1"',               899.00,  20, 'iphone14.jpg',       1, 1, 4.5, 128),
('iPhone 14 Pro',           'Versión Pro con cámara de 48MP y Dynamic Island',                     1199.00,  15, 'iphone14pro.jpg',    1, 1, 4.8,  95),
('Samsung Galaxy S23',      'Smartphone de gama alta con Snapdragon 8 Gen 2',                       799.00,  25, 's23.jpg',            1, 2, 4.4,  87),
('Samsung Galaxy A54',      'Gama media con pantalla AMOLED 120Hz',                                 349.00,  40, 'a54.jpg',            1, 2, 4.2, 156),
('Xiaomi Redmi Note 12',    'Smartphone económico con gran batería de 5000mAh',                     199.00,  50, 'note12.jpg',         1, 3, 4.1, 234),
('Xiaomi 13 Pro',           'Gama alta con cámara Leica y Snapdragon 8 Gen 2',                     1099.00,  10, 'xiaomi13pro.jpg',    1, 3, 4.6,  63),
('Sony Xperia 10 V',        'Smartphone ligero con pantalla OLED y audio Hi-Res',                   399.00,  18, 'xperia10v.jpg',      1, 4, 4.0,  42),
('Samsung Galaxy Z Flip 5', 'Smartphone plegable compacto con Snapdragon 8 Gen 2',                 1199.00,  12, 'zflip5.jpg',         1, 2, 4.3,  78),
('iPhone SE 2022',          'Modelo compacto con chip A15 Bionic',                                  499.00,  30, 'iphonese2022.jpg',   1, 1, 4.2,  91),
('Xiaomi Poco X5',          'Smartphone potente a precio reducido con 5G',                          249.00,  35, 'pocox5.jpg',         1, 3, 4.1, 119),
-- PORTÁTILES (categoria 2)
('MacBook Air M2',          'Portátil ultraligero con chip M2, 8GB RAM, 256GB SSD',                1299.00,  10, 'mba_m2.jpg',         2, 1, 4.9, 204),
('MacBook Pro 14 M2',       'Portátil profesional con pantalla Liquid Retina XDR',                 1999.00,   8, 'mbp14.jpg',          2, 1, 4.9, 167),
('Lenovo IdeaPad 3',        'Portátil económico para uso diario con Ryzen 3',                       499.00,  20, 'ideapad3.jpg',       2, 6, 3.9,  88),
('Lenovo Legion 5',         'Portátil gaming con RTX 3060 y Ryzen 7',                              1299.00,   7, 'legion5.jpg',        2, 6, 4.7, 112),
('HP Pavilion 15',          'Portátil equilibrado con Ryzen 5 y pantalla FHD',                      699.00,  15, 'pavilion15.jpg',     2, 7, 4.1,  73),
('HP Victus 16',            'Portátil gaming con RTX 3050 y panel 144Hz',                           999.00,  10, 'victus16.jpg',       2, 7, 4.4,  56),
('Asus TUF Gaming F15',     'Portátil gaming resistente con i7 y RTX 3060',                        1199.00,   9, 'tuf15.jpg',          2, 8, 4.6, 134),
('Asus ZenBook 14',         'Ultrabook premium con pantalla OLED y i7',                              999.00,  12, 'zenbook14.jpg',      2, 8, 4.5,  97),
('Acer Aspire 5',           'Portátil económico con buena autonomía y Ryzen 5',                     549.00,  18, 'aspire5.jpg',        2, 9, 4.0, 145),
('Acer Nitro 5',            'Portátil gaming con RTX 3060 y pantalla 144Hz',                       1199.00,   6, 'nitro5.jpg',         2, 9, 4.3, 189),
-- TABLETS (categoria 3)
('iPad 10ª Gen',            'Tablet versátil con chip A14 Bionic y USB-C',                          499.00,  20, 'ipad10.jpg',         3, 1, 4.6, 321),
('iPad Pro 11 M2',          'Tablet profesional con chip M2 y Liquid Retina',                       999.00,  10, 'ipadpro11.jpg',      3, 1, 4.8, 176),
('Samsung Galaxy Tab S8',   'Tablet Android de gama alta con S-Pen incluido',                       799.00,  12, 'tabs8.jpg',          3, 2, 4.5, 143),
('Xiaomi Pad 5',            'Tablet económica con pantalla 120Hz y Snapdragon 860',                 349.00,  25, 'pad5.jpg',           3, 3, 4.3, 267),
('Lenovo Tab M10',          'Tablet básica para uso familiar con batería 5100mAh',                  199.00,  30, 'tabm10.jpg',         3, 6, 3.8,  94),
-- AURICULARES (categoria 5)
('AirPods Pro 2',           'Auriculares con cancelación activa H2 y audio adaptativo',             299.00,  25, 'airpodspro2.jpg',    5, 1, 4.7, 534),
('AirPods 3',               'Auriculares inalámbricos con audio espacial y MagSafe',                199.00,  30, 'airpods3.jpg',       5, 1, 4.5, 389),
('JBL Tune 510BT',          'Auriculares Bluetooth económicos con Pure Bass Sound',                  49.00,  40, 'tune510.jpg',        5, 12, 4.0, 892),
('JBL Live 660NC',          'Auriculares con cancelación activa y 50h batería',                     149.00,  25, 'live660.jpg',        5, 12, 4.3, 321),
('Samsung Galaxy Buds 2 Pro','Auriculares premium con ANC inteligente y audio Hi-Fi',               229.00,  18, 'buds2pro.jpg',       5, 2, 4.4, 267),
-- SMARTWATCHES (categoria 6)
('Apple Watch Series 8',    'Reloj inteligente con sensor de temperatura y crash detection',        499.00,  15, 'watch8.jpg',         6, 1, 4.6, 432),
('Apple Watch SE 2022',     'Versión económica del Apple Watch con chip S8',                        299.00,  20, 'watchse.jpg',        6, 1, 4.4, 287),
('Samsung Galaxy Watch 5',  'Smartwatch con WearOS, sensor BioActive y GPS',                        299.00,  18, 'watch5.jpg',         6, 2, 4.3, 198),
('Xiaomi Watch S1',         'Reloj elegante con GPS, 117 modos deportivos y AMOLED',               199.00,  25, 'watchs1.jpg',        6, 3, 4.2, 341),
('Huawei Watch GT3',        'Smartwatch con 2 semanas de autonomía y GPS dual',                     249.00,  20, 'gt3.jpg',            6, 3, 4.3, 214),
-- CONSOLAS (categoria 7)
('PlayStation 5',           'Consola de nueva generación con SSD ultrarrápido y DualSense',         549.00,  10, 'ps5.jpg',            7, 4, 4.9, 1243),
('Xbox Series X',           'Consola de alto rendimiento con 12 teraflops y SSD 1TB',               499.00,  12, 'seriesx.jpg',        7, 11, 4.8, 876),
('Nintendo Switch OLED',    'Consola híbrida con pantalla OLED de 7 pulgadas',                     349.00,  20, 'switcholed.jpg',     7, 10, 4.7, 2134),
;

-- ============================================
-- DATOS DE EJEMPLO - USUARIOS
-- ============================================

INSERT INTO usuarios (nombre, apellidos, email, password, telefono, rol) VALUES
('Admin',  'TFG',       'admin@tfg.com',         '$2b$10$hashedpassword1', '600000000', 'admin'),
('Carlos', 'Martínez',  'carlos@example.com',    '$2b$10$hashedpassword2', '611223344', 'cliente'),
('Laura',  'García',    'laura@example.com',     '$2b$10$hashedpassword3', '622334455', 'cliente'),
('Pedro',  'Sánchez',   'pedro@example.com',     '$2b$10$hashedpassword4', '633445566', 'cliente');

-- ============================================
-- DATOS DE EJEMPLO - DIRECCIONES
-- ============================================

INSERT INTO direcciones (usuario_id, alias, direccion, ciudad, provincia, cp, pais, predeterminada) VALUES
(1, 'Casa',     'Calle Principal 1',         'Madrid',    'Madrid',    '28001', 'España', 1),
(2, 'Casa',     'Avenida Libertad 45',       'Barcelona', 'Barcelona', '08001', 'España', 1),
(3, 'Trabajo',  'Calle Gran Vía 100',        'Madrid',    'Madrid',    '28013', 'España', 1),
(4, 'Casa',     'Paseo de la Reforma 200',   'Sevilla',   'Sevilla',   '41001', 'España', 1);

-- ============================================
-- DATOS DE EJEMPLO - RESEÑAS
-- ============================================

INSERT INTO resenas (producto_id, usuario_id, valoracion, comentario, verificada) VALUES
(1,  2, 5, 'Excelente teléfono, cámara increíble y batería que dura todo el día.',      1),
(1,  3, 4, 'Muy buen smartphone, aunque el precio es elevado para lo que ofrece.',      1),
(1,  4, 5, 'Lo mejor que he tenido. El Dynamic Island es muy práctico.',                1),
(3,  2, 4, 'Muy fluido y cámara de gran calidad. Lo recomiendo sin duda.',              1),
(11, 2, 5, 'El MacBook Air M2 es simplemente perfecto. Ligero, potente y silencioso.',  1),
(46, 4, 5, 'La PS5 es una bestia. Los tiempos de carga son increíblemente rápidos.',    1),
(48, 2, 5, 'La Nintendo Switch OLED es perfecta para jugar en cualquier lugar.',        1),
(34, 4, 4, 'Los AirPods Pro 2 son muy cómodos y el sonido es excelente.',               1);

-- ============================================
-- VISTAS ÚTILES
-- ============================================

-- Vista de productos con categoría y marca
CREATE OR REPLACE VIEW v_productos AS
SELECT
    p.id,
    p.nombre,
    p.descripcion,
    p.precio,
    p.stock,
    p.imagen,
    p.valoracion,
    p.num_resenas,
    p.activo,
    c.nombre AS categoria,
    m.nombre AS marca
FROM productos p
LEFT JOIN categorias c ON p.categoria_id = c.id
LEFT JOIN marcas m     ON p.marca_id = m.id
WHERE p.activo = 1;

-- Vista de pedidos con usuario
CREATE OR REPLACE VIEW v_pedidos AS
SELECT
    p.id,
    p.numero_pedido,
    p.fecha,
    p.total,
    p.estado,
    u.nombre AS cliente_nombre,
    u.apellidos AS cliente_apellidos,
    u.email AS cliente_email,
    d.ciudad,
    d.provincia
FROM pedidos p
JOIN usuarios u    ON p.usuario_id = u.id
JOIN direcciones d ON p.direccion_id = d.id;

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX idx_productos_categoria ON productos(categoria_id);
CREATE INDEX idx_productos_marca     ON productos(marca_id);
CREATE INDEX idx_productos_precio    ON productos(precio);
CREATE INDEX idx_pedidos_usuario     ON pedidos(usuario_id);
CREATE INDEX idx_pedidos_estado      ON pedidos(estado);
CREATE INDEX idx_resenas_producto    ON resenas(producto_id);
