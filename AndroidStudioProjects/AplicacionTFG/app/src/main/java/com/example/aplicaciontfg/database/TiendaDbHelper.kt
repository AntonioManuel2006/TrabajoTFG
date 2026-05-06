package com.example.aplicaciontfg.database

import android.content.ContentValues
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import com.example.aplicaciontfg.models.Categoria
import com.example.aplicaciontfg.models.Marca
import com.example.aplicaciontfg.models.Producto
import com.example.aplicaciontfg.models.Usuario

class TiendaDbHelper(context: Context) : SQLiteOpenHelper(context, DB_NAME, null, DB_VERSION) {

    companion object {
        const val DB_NAME = "tienda_online.db"
        const val DB_VERSION = 1
    }

    override fun onCreate(db: SQLiteDatabase) {
        db.execSQL("""
            CREATE TABLE categorias (
                id INTEGER PRIMARY KEY,
                nombre TEXT NOT NULL,
                icono TEXT DEFAULT '📦',
                descripcion TEXT
            )""")

        db.execSQL("""
            CREATE TABLE marcas (
                id INTEGER PRIMARY KEY,
                nombre TEXT NOT NULL,
                pais TEXT
            )""")

        db.execSQL("""
            CREATE TABLE productos (
                id INTEGER PRIMARY KEY,
                nombre TEXT NOT NULL,
                descripcion TEXT,
                precio REAL NOT NULL,
                stock INTEGER DEFAULT 0,
                imagen TEXT,
                categoria_id INTEGER,
                marca_id INTEGER,
                valoracion REAL DEFAULT 0,
                num_resenas INTEGER DEFAULT 0,
                FOREIGN KEY(categoria_id) REFERENCES categorias(id),
                FOREIGN KEY(marca_id) REFERENCES marcas(id)
            )""")

        db.execSQL("""
            CREATE TABLE usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                apellidos TEXT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                telefono TEXT,
                fecha_registro TEXT
            )""")

        seedData(db)
    }

    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
        db.execSQL("DROP TABLE IF EXISTS usuarios")
        db.execSQL("DROP TABLE IF EXISTS productos")
        db.execSQL("DROP TABLE IF EXISTS marcas")
        db.execSQL("DROP TABLE IF EXISTS categorias")
        onCreate(db)
    }

    private fun seedData(db: SQLiteDatabase) {
        // Categorías con emojis como iconos
        val categorias = listOf(
            Triple(1, "Smartphones", "📱"),
            Triple(2, "Portátiles", "💻"),
            Triple(3, "Tablets", "📟"),
            Triple(4, "Televisores", "📺"),
            Triple(5, "Auriculares", "🎧"),
            Triple(6, "Smartwatches", "⌚"),
            Triple(7, "Consolas", "🎮"),
            Triple(8, "Accesorios", "🎒")
        )
        categorias.forEach { (id, nombre, icono) ->
            db.execSQL("INSERT INTO categorias VALUES($id, '$nombre', '$icono', 'Categoría $nombre')")
        }

        // Marcas
        val marcas = listOf(
            Triple(1, "Apple", "Estados Unidos"),
            Triple(2, "Samsung", "Corea del Sur"),
            Triple(3, "Xiaomi", "China"),
            Triple(4, "Sony", "Japón"),
            Triple(5, "LG", "Corea del Sur"),
            Triple(6, "Lenovo", "China"),
            Triple(7, "HP", "Estados Unidos"),
            Triple(8, "Asus", "Taiwán"),
            Triple(9, "Acer", "Taiwán"),
            Triple(10, "Nintendo", "Japón"),
            Triple(11, "Microsoft", "Estados Unidos"),
            Triple(12, "JBL", "Estados Unidos")
        )
        marcas.forEach { (id, nombre, pais) ->
            db.execSQL("INSERT INTO marcas VALUES($id, '$nombre', '$pais')")
        }

        // Productos (cat_id, marca_id, nombre, descripcion, precio, stock, imagen, valoracion, num_resenas)
        val productos = listOf(
            listOf(1, 1, 1, "iPhone 14", "Smartphone Apple con pantalla Super Retina XDR de 6.1\"", 899.0, 20, "iphone14.jpg", 4.5, 128),
            listOf(2, 1, 1, "iPhone 14 Pro", "Versión Pro con cámara de 48MP y Dynamic Island", 1199.0, 15, "iphone14pro.jpg", 4.8, 95),
            listOf(3, 1, 2, "Samsung Galaxy S23", "Smartphone de gama alta con Snapdragon 8 Gen 2", 799.0, 25, "s23.jpg", 4.4, 87),
            listOf(4, 1, 2, "Samsung Galaxy A54", "Gama media con pantalla AMOLED 120Hz", 349.0, 40, "a54.jpg", 4.2, 156),
            listOf(5, 1, 3, "Xiaomi Redmi Note 12", "Smartphone económico con gran batería de 5000mAh", 199.0, 50, "note12.jpg", 4.1, 234),
            listOf(6, 1, 3, "Xiaomi 13 Pro", "Gama alta con cámara Leica y Snapdragon 8 Gen 2", 1099.0, 10, "xiaomi13pro.jpg", 4.6, 63),
            listOf(7, 1, 4, "Sony Xperia 10 V", "Smartphone ligero con pantalla OLED y audio Hi-Res", 399.0, 18, "xperia10v.jpg", 4.0, 42),
            listOf(8, 1, 2, "Samsung Galaxy Z Flip 5", "Smartphone plegable compacto con Snapdragon 8 Gen 2", 1199.0, 12, "zflip5.jpg", 4.3, 78),
            listOf(9, 1, 1, "iPhone SE 2022", "Modelo compacto con chip A15 Bionic", 499.0, 30, "iphonese2022.jpg", 4.2, 91),
            listOf(10, 1, 3, "Xiaomi Poco X5", "Smartphone potente a precio reducido con 5G", 249.0, 35, "pocox5.jpg", 4.1, 119),
            listOf(11, 2, 1, "MacBook Air M2", "Portátil ultraligero con chip M2, 8GB RAM, 256GB SSD", 1299.0, 10, "mba_m2.jpg", 4.9, 204),
            listOf(12, 2, 1, "MacBook Pro 14 M2", "Portátil profesional con pantalla Liquid Retina XDR", 1999.0, 8, "mbp14.jpg", 4.9, 167),
            listOf(13, 2, 6, "Lenovo IdeaPad 3", "Portátil económico para uso diario con Ryzen 3", 499.0, 20, "ideapad3.jpg", 3.9, 88),
            listOf(14, 2, 6, "Lenovo Legion 5", "Portátil gaming con RTX 3060 y Ryzen 7", 1299.0, 7, "legion5.jpg", 4.7, 112),
            listOf(15, 2, 7, "HP Pavilion 15", "Portátil equilibrado con Ryzen 5 y pantalla FHD", 699.0, 15, "pavilion15.jpg", 4.1, 73),
            listOf(16, 2, 7, "HP Victus 16", "Portátil gaming con RTX 3050 y panel 144Hz", 999.0, 10, "victus16.jpg", 4.4, 56),
            listOf(17, 2, 8, "Asus ROG Zephyrus G14", "Gaming ultraportátil con RTX 4060 y panel 165Hz", 1499.0, 5, "tuf15.jpg", 4.8, 89),
            listOf(18, 2, 9, "Acer Aspire 5", "Portátil versátil con Intel Core i5 y pantalla FHD", 549.0, 18, "aspire5.jpg", 4.0, 67),
            listOf(19, 3, 1, "iPad 10ª Gen", "Tablet Apple con chip A14 Bionic y pantalla 10.9\"", 599.0, 20, "ipad10.jpg", 4.5, 134),
            listOf(20, 3, 1, "iPad Pro 11 M2", "Tablet pro con chip M2 y pantalla Liquid Retina", 1099.0, 8, "ipadpro11.jpg", 4.8, 92),
            listOf(21, 3, 2, "Samsung Galaxy Tab S8", "Tablet Android premium con S Pen incluido", 699.0, 12, "tabs8.jpg", 4.5, 78),
            listOf(22, 3, 3, "Xiaomi Pad 5", "Tablet con pantalla WQHD+ 120Hz y batería 8720mAh", 349.0, 22, "pad5.jpg", 4.2, 143),
            listOf(23, 3, 6, "Lenovo Tab M10", "Tablet económica para uso diario y entretenimiento", 199.0, 30, "tabm10.jpg", 3.8, 56),
            listOf(24, 5, 1, "AirPods Pro 2ª Gen", "Auriculares con cancelación de ruido activa mejorada", 299.0, 25, "airpodspro2.jpg", 4.7, 312),
            listOf(25, 5, 1, "AirPods 3ª Gen", "Auriculares con sonido espacial y resistencia al agua", 199.0, 30, "airpods3.jpg", 4.4, 187),
            listOf(26, 5, 2, "Samsung Galaxy Buds2 Pro", "Auriculares con cancelación ruido y sonido 360", 229.0, 20, "buds2pro.jpg", 4.3, 98),
            listOf(27, 5, 12, "JBL Live 660NC", "Auriculares over-ear con ANC y 50h de batería", 149.0, 25, "live660.jpg", 4.1, 76),
            listOf(28, 5, 4, "Sony WH-1000XM5", "Los mejores auriculares ANC con 30h de autonomía", 349.0, 15, "tune510.jpg", 4.9, 445),
            listOf(29, 6, 1, "Apple Watch Series 8", "Reloj inteligente con detección de caídas y ECG", 499.0, 15, "watch8.jpg", 4.6, 203),
            listOf(30, 6, 1, "Apple Watch SE 2ª Gen", "Smartwatch Apple a precio asequible con GPS", 299.0, 20, "watchse.jpg", 4.3, 156),
            listOf(31, 6, 2, "Samsung Galaxy Watch 5", "Smartwatch con monitoreo avanzado de salud", 299.0, 18, "watch5.jpg", 4.2, 112),
            listOf(32, 6, 2, "Samsung Galaxy Watch S1", "Reloj inteligente premium con seguimiento deportivo", 249.0, 22, "watchs1.jpg", 4.0, 87),
            listOf(33, 6, 2, "Samsung Galaxy Watch 3 Sport", "Reloj clásico con bisel giratorio y LTE", 399.0, 10, "gt3.jpg", 4.4, 134),
            listOf(34, 7, 4, "PlayStation 5", "La consola de nueva generación de Sony con SSD ultrarrápido", 549.0, 5, "ps5.jpg", 4.9, 567),
            listOf(35, 7, 11, "Xbox Series X", "La consola más potente de Microsoft con 4K a 120fps", 499.0, 8, "seriesx.jpg", 4.8, 423),
            listOf(36, 7, 10, "Nintendo Switch OLED", "Consola híbrida con pantalla OLED de 7 pulgadas", 349.0, 15, "switcholed.jpg", 4.7, 389),
            listOf(37, 2, 8, "Asus TUF Gaming F15", "Portátil gaming resistente con RTX 4060", 1099.0, 8, "tuf15.jpg", 4.5, 94),
            listOf(38, 2, 7, "HP Victus 15 Gaming", "Gaming accesible con RTX 3050 Ti", 849.0, 12, "victus16.jpg", 4.2, 67),
            listOf(39, 1, 2, "Samsung Galaxy A34", "Gama media con triple cámara y pantalla Super AMOLED", 329.0, 28, "a54.jpg", 4.0, 178),
            listOf(40, 1, 2, "Samsung Galaxy S23 Ultra", "El flagship definitivo con S Pen integrado y 200MP", 1399.0, 6, "s23.jpg", 4.9, 234),
            listOf(41, 3, 2, "Samsung Galaxy Tab A8", "Tablet económica para el día a día con Android 13", 279.0, 25, "tabs8.jpg", 3.9, 89),
            listOf(42, 5, 2, "Samsung Galaxy Buds Live", "Auriculares con forma de judías y ANC", 149.0, 20, "buds2pro.jpg", 3.8, 112),
            listOf(43, 6, 2, "Samsung Galaxy Watch 5 Pro", "Smartwatch profesional con titanio y GPS", 449.0, 8, "watch5.jpg", 4.5, 67),
            listOf(44, 1, 1, "iPhone 15", "Nuevo iPhone con Dynamic Island y USB-C", 999.0, 20, "iphone14.jpg", 4.7, 156),
            listOf(45, 1, 1, "iPhone 15 Pro", "iPhone 15 Pro con chip A17 Pro y botón Acción", 1299.0, 10, "iphone14pro.jpg", 4.9, 98),
            listOf(46, 2, 9, "Acer Nitro 5", "Gaming accesible con RTX 3050 y pantalla 144Hz", 799.0, 10, "nitro5.jpg", 4.3, 145),
            listOf(47, 2, 6, "Lenovo Legion 5 Pro", "Gaming premium con RTX 4070 y 165Hz", 1799.0, 4, "legion5.jpg", 4.8, 78),
            listOf(48, 2, 8, "Asus ZenBook 14", "Ultrabook elegante con OLED y Ryzen 7", 999.0, 9, "zenbook14.jpg", 4.5, 112),
            listOf(49, 2, 9, "Acer Predator Helios", "Bestia gaming con RTX 4080 para máximo rendimiento", 2499.0, 3, "aspire5.jpg", 4.9, 45),
            listOf(50, 7, 10, "Nintendo Switch Lite", "Consola portátil compacta para jugar en cualquier lugar", 219.0, 20, "switcholed.jpg", 4.5, 287)
        )

        productos.forEach { p ->
            val desc = (p[4] as String).replace("'", "''")
            val nombre = (p[3] as String).replace("'", "''")
            db.execSQL("""INSERT INTO productos VALUES(
                ${p[0]}, '$nombre', '$desc', ${p[5]}, ${p[6]}, '${p[7]}', ${p[1]}, ${p[2]}, ${p[8]}, ${p[9]}
            )""")
        }

        // Usuarios demo
        db.execSQL("""INSERT INTO usuarios(nombre,apellidos,email,password,telefono,fecha_registro)
            VALUES('Admin','TFG','admin@tfg.com','1234','600000000','2024-01-01')""")
        db.execSQL("""INSERT INTO usuarios(nombre,apellidos,email,password,telefono,fecha_registro)
            VALUES('Carlos','Martínez','carlos@example.com','1234','611223344','2024-02-15')""")
    }

    fun getCategorias(): List<Categoria> {
        val result = mutableListOf<Categoria>()
        val db = readableDatabase
        val cursor = db.rawQuery("SELECT * FROM categorias ORDER BY id", null)
        cursor.use {
            while (it.moveToNext()) {
                result.add(Categoria(
                    id = it.getInt(0),
                    nombre = it.getString(1),
                    icono = it.getString(2),
                    descripcion = it.getString(3) ?: ""
                ))
            }
        }
        return result
    }

    fun getMarcas(): List<Marca> {
        val result = mutableListOf<Marca>()
        val db = readableDatabase
        val cursor = db.rawQuery("SELECT * FROM marcas ORDER BY nombre", null)
        cursor.use {
            while (it.moveToNext()) {
                result.add(Marca(
                    id = it.getInt(0),
                    nombre = it.getString(1),
                    pais = it.getString(2) ?: ""
                ))
            }
        }
        return result
    }

    fun getProductos(): List<Producto> {
        return queryProductos("SELECT p.*, c.nombre as cat_nombre, m.nombre as marca_nombre FROM productos p " +
                "LEFT JOIN categorias c ON p.categoria_id = c.id " +
                "LEFT JOIN marcas m ON p.marca_id = m.id ORDER BY p.id")
    }

    fun getProductosByCategoria(categoriaId: Int): List<Producto> {
        return queryProductos("SELECT p.*, c.nombre as cat_nombre, m.nombre as marca_nombre FROM productos p " +
                "LEFT JOIN categorias c ON p.categoria_id = c.id " +
                "LEFT JOIN marcas m ON p.marca_id = m.id WHERE p.categoria_id = $categoriaId ORDER BY p.id")
    }

    fun getProductoById(id: Int): Producto? {
        val list = queryProductos("SELECT p.*, c.nombre as cat_nombre, m.nombre as marca_nombre FROM productos p " +
                "LEFT JOIN categorias c ON p.categoria_id = c.id " +
                "LEFT JOIN marcas m ON p.marca_id = m.id WHERE p.id = $id LIMIT 1")
        return list.firstOrNull()
    }

    fun searchProductos(query: String): List<Producto> {
        val q = query.replace("'", "''")
        return queryProductos("SELECT p.*, c.nombre as cat_nombre, m.nombre as marca_nombre FROM productos p " +
                "LEFT JOIN categorias c ON p.categoria_id = c.id " +
                "LEFT JOIN marcas m ON p.marca_id = m.id " +
                "WHERE LOWER(p.nombre) LIKE LOWER('%$q%') OR LOWER(m.nombre) LIKE LOWER('%$q%') " +
                "OR LOWER(c.nombre) LIKE LOWER('%$q%') ORDER BY p.valoracion DESC")
    }

    private fun queryProductos(sql: String): List<Producto> {
        val result = mutableListOf<Producto>()
        val db = readableDatabase
        val cursor = db.rawQuery(sql, null)
        cursor.use {
            while (it.moveToNext()) {
                result.add(Producto(
                    id = it.getInt(it.getColumnIndexOrThrow("id")),
                    nombre = it.getString(it.getColumnIndexOrThrow("nombre")),
                    descripcion = it.getString(it.getColumnIndexOrThrow("descripcion")) ?: "",
                    precio = it.getDouble(it.getColumnIndexOrThrow("precio")),
                    stock = it.getInt(it.getColumnIndexOrThrow("stock")),
                    imagen = it.getString(it.getColumnIndexOrThrow("imagen")) ?: "",
                    categoriaId = it.getInt(it.getColumnIndexOrThrow("categoria_id")),
                    marcaId = it.getInt(it.getColumnIndexOrThrow("marca_id")),
                    valoracion = it.getDouble(it.getColumnIndexOrThrow("valoracion")),
                    numResenas = it.getInt(it.getColumnIndexOrThrow("num_resenas")),
                    categoria = it.getString(it.getColumnIndex("cat_nombre")) ?: "",
                    marca = it.getString(it.getColumnIndex("marca_nombre")) ?: ""
                ))
            }
        }
        return result
    }

    fun getDestacados(): List<Producto> {
        return queryProductos("SELECT p.*, c.nombre as cat_nombre, m.nombre as marca_nombre FROM productos p " +
                "LEFT JOIN categorias c ON p.categoria_id = c.id " +
                "LEFT JOIN marcas m ON p.marca_id = m.id ORDER BY p.valoracion DESC LIMIT 8")
    }

    fun getNovedades(): List<Producto> {
        return queryProductos("SELECT p.*, c.nombre as cat_nombre, m.nombre as marca_nombre FROM productos p " +
                "LEFT JOIN categorias c ON p.categoria_id = c.id " +
                "LEFT JOIN marcas m ON p.marca_id = m.id ORDER BY p.id DESC LIMIT 8")
    }

    fun loginUsuario(email: String, password: String): Usuario? {
        val db = readableDatabase
        val e = email.replace("'", "''")
        val p = password.replace("'", "''")
        val cursor = db.rawQuery(
            "SELECT * FROM usuarios WHERE email='$e' AND password='$p' LIMIT 1", null)
        cursor.use {
            if (it.moveToFirst()) {
                return Usuario(
                    id = it.getInt(0),
                    nombre = it.getString(1),
                    apellidos = it.getString(2) ?: "",
                    email = it.getString(3),
                    password = "",
                    telefono = it.getString(5) ?: "",
                    fechaRegistro = it.getString(6) ?: ""
                )
            }
        }
        return null
    }

    fun emailExists(email: String): Boolean {
        val db = readableDatabase
        val e = email.replace("'", "''")
        val cursor = db.rawQuery("SELECT id FROM usuarios WHERE email='$e' LIMIT 1", null)
        val exists = cursor.moveToFirst()
        cursor.close()
        return exists
    }

    fun registerUsuario(nombre: String, apellidos: String, email: String,
                        password: String, telefono: String): Usuario? {
        if (emailExists(email)) return null
        val db = writableDatabase
        val values = ContentValues().apply {
            put("nombre", nombre)
            put("apellidos", apellidos)
            put("email", email)
            put("password", password)
            put("telefono", telefono)
            put("fecha_registro", java.text.SimpleDateFormat("yyyy-MM-dd").format(java.util.Date()))
        }
        val id = db.insert("usuarios", null, values)
        return if (id != -1L) Usuario(
            id = id.toInt(), nombre = nombre, apellidos = apellidos,
            email = email, password = "", telefono = telefono,
            fechaRegistro = values.getAsString("fecha_registro")
        ) else null
    }
}
