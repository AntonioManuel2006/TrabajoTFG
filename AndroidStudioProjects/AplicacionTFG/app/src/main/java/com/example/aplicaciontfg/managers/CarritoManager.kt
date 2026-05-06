package com.example.aplicaciontfg.managers

import android.content.Context
import android.content.SharedPreferences
import com.example.aplicaciontfg.models.CarritoItem
import com.example.aplicaciontfg.models.Producto
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

object CarritoManager {
    private const val PREF_NAME = "carrito_prefs"
    private const val KEY_ITEMS = "cart_items"
    private lateinit var prefs: SharedPreferences
    private val gson = Gson()
    private val _items = mutableListOf<CarritoItem>()
    private var initialized = false

    val items: List<CarritoItem> get() = _items.toList()

    val total: Double get() = _items.sumOf { it.producto.precio * it.cantidad }

    val cantidadTotal: Int get() = _items.sumOf { it.cantidad }

    fun init(context: Context) {
        if (initialized) return
        prefs = context.applicationContext.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
        loadCart()
        initialized = true
    }

    private fun loadCart() {
        val json = prefs.getString(KEY_ITEMS, null) ?: return
        try {
            val type = object : TypeToken<List<CarritoItem>>() {}.type
            val loaded: List<CarritoItem> = gson.fromJson(json, type)
            _items.clear()
            _items.addAll(loaded)
        } catch (e: Exception) {
            _items.clear()
        }
    }

    private fun saveCart() {
        prefs.edit().putString(KEY_ITEMS, gson.toJson(_items)).apply()
    }

    fun addToCart(producto: Producto, cantidad: Int = 1) {
        val idx = _items.indexOfFirst { it.producto.id == producto.id }
        if (idx >= 0) {
            _items[idx] = _items[idx].copy(cantidad = _items[idx].cantidad + cantidad)
        } else {
            _items.add(CarritoItem(producto, cantidad))
        }
        saveCart()
    }

    fun removeFromCart(productoId: Int) {
        _items.removeAll { it.producto.id == productoId }
        saveCart()
    }

    fun updateQuantity(productoId: Int, cantidad: Int) {
        if (cantidad <= 0) { removeFromCart(productoId); return }
        val idx = _items.indexOfFirst { it.producto.id == productoId }
        if (idx >= 0) { _items[idx] = _items[idx].copy(cantidad = cantidad); saveCart() }
    }

    fun clearCart() {
        _items.clear()
        saveCart()
    }

    fun hasItem(productoId: Int): Boolean = _items.any { it.producto.id == productoId }
}
