package com.example.aplicaciontfg.managers

import android.content.Context
import android.content.SharedPreferences
import com.example.aplicaciontfg.models.CarritoItem
import com.example.aplicaciontfg.models.DireccionEnvio
import com.example.aplicaciontfg.models.Pedido
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

object PedidosManager {
    private const val PREF_NAME = "pedidos_prefs"
    private const val KEY_PEDIDOS = "pedidos"
    private lateinit var prefs: SharedPreferences
    private val gson = Gson()

    fun init(context: Context) {
        prefs = context.applicationContext.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
    }

    fun getPedidosUsuario(userId: Int): List<Pedido> {
        val json = prefs.getString("${KEY_PEDIDOS}_$userId", null) ?: return emptyList()
        return try {
            val type = object : TypeToken<List<Pedido>>() {}.type
            gson.fromJson(json, type)
        } catch (e: Exception) { emptyList() }
    }

    fun crearPedido(userId: Int, items: List<CarritoItem>, direccion: DireccionEnvio): Pedido {
        val pedidos = getPedidosUsuario(userId).toMutableList()
        val subtotal = items.sumOf { it.producto.precio * it.cantidad }
        val iva = subtotal * 0.21
        val total = subtotal + iva
        val numero = "TFG-${System.currentTimeMillis() % 1000000}"
        val fecha = java.text.SimpleDateFormat("dd/MM/yyyy HH:mm").format(java.util.Date())
        val pedido = Pedido(
            id = pedidos.size + 1,
            numeroPedido = numero,
            fecha = fecha,
            subtotal = subtotal,
            iva = iva,
            total = total,
            estado = "confirmado",
            items = items,
            direccion = direccion
        )
        pedidos.add(0, pedido)
        prefs.edit().putString("${KEY_PEDIDOS}_$userId", gson.toJson(pedidos)).apply()
        return pedido
    }
}
