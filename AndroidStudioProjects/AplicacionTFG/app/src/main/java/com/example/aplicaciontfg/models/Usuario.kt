package com.example.aplicaciontfg.models

data class Usuario(
    val id: Int,
    val nombre: String,
    val apellidos: String,
    val email: String,
    val password: String,
    val telefono: String,
    val fechaRegistro: String
)
