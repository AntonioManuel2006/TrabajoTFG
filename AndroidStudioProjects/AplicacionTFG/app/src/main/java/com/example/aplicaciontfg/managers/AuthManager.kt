package com.example.aplicaciontfg.managers

import android.content.Context
import android.content.SharedPreferences
import com.example.aplicaciontfg.models.Usuario
import com.google.gson.Gson

object AuthManager {
    private const val PREF_NAME = "auth_prefs"
    private const val KEY_USER = "current_user"
    private lateinit var prefs: SharedPreferences
    private val gson = Gson()

    fun init(context: Context) {
        prefs = context.applicationContext.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
    }

    fun login(user: Usuario) {
        prefs.edit().putString(KEY_USER, gson.toJson(user)).apply()
    }

    fun logout() {
        prefs.edit().remove(KEY_USER).apply()
    }

    fun isLoggedIn(): Boolean = prefs.contains(KEY_USER)

    fun getUser(): Usuario? {
        val json = prefs.getString(KEY_USER, null) ?: return null
        return try { gson.fromJson(json, Usuario::class.java) } catch (e: Exception) { null }
    }
}
