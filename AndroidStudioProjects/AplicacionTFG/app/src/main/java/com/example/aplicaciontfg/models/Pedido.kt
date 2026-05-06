package com.example.aplicaciontfg.models

data class DireccionEnvio(
    val direccion: String,
    val ciudad: String,
    val provincia: String,
    val cp: String,
    val pais: String
)

data class Pedido(
    val id: Int,
    val numeroPedido: String,
    val fecha: String,
    val subtotal: Double,
    val iva: Double,
    val total: Double,
    val estado: String,
    val items: List<CarritoItem>,
    val direccion: DireccionEnvio
)
