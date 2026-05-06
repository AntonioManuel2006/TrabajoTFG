package com.example.aplicaciontfg.models

data class Producto(
    val id: Int,
    val nombre: String,
    val descripcion: String,
    val precio: Double,
    val stock: Int,
    val imagen: String,
    val categoriaId: Int,
    val marcaId: Int,
    val valoracion: Double,
    val numResenas: Int,
    val categoria: String = "",
    val marca: String = ""
)
