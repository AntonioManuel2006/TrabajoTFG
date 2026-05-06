package com.example.aplicaciontfg.managers

import android.util.Log
import com.example.aplicaciontfg.models.CarritoItem
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import java.util.concurrent.TimeUnit

object GeminiManager {
    private val client = OkHttpClient.Builder()
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(90, TimeUnit.SECONDS)
        .writeTimeout(30, TimeUnit.SECONDS)
        .build()
    private val gson = Gson()
    private val JSON = "application/json".toMediaType()

    private val API_KEY get() = com.example.aplicaciontfg.BuildConfig.GEMINI_KEY
    private val URL get() = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$API_KEY"

    suspend fun analyzePurchase(
        items: List<CarritoItem>,
        total: Double,
        userName: String
    ): String = withContext(Dispatchers.IO) {
        try {
            val itemsText = items.joinToString("\n") {
                "- ${it.producto.nombre} x${it.cantidad} (${"%.2f".format(it.producto.precio)}€/ud)"
            }
            val prompt = "Eres un analista de compras de una tienda online de electrónica. " +
                "Analiza la siguiente compra realizada por $userName y redacta en 2-3 frases " +
                "un perfil del cliente con sus intereses y motivaciones según los productos adquiridos:\n\n" +
                "Productos:\n$itemsText\nTotal: ${"%.2f".format(total)}€"

            val body = gson.toJson(mapOf(
                "contents" to listOf(mapOf("parts" to listOf(mapOf("text" to prompt))))
            ))
            val request = Request.Builder()
                .url(URL)
                .addHeader("Content-Type", "application/json")
                .post(body.toRequestBody(JSON))
                .build()

            val response = client.newCall(request).execute()
            val responseBody = response.body?.string() ?: return@withContext "Sin análisis disponible"
            response.close()

            Log.d("GeminiManager", "Response: $responseBody")

            @Suppress("UNCHECKED_CAST")
            val json = gson.fromJson(responseBody, Map::class.java)
            val candidates = json["candidates"] as? List<Map<String, Any>>
                ?: run {
                    Log.e("GeminiManager", "No candidates in response: $responseBody")
                    return@withContext "Sin análisis disponible"
                }
            val content = candidates[0]["content"] as? Map<String, Any>
                ?: return@withContext "Sin análisis disponible"
            val parts = content["parts"] as? List<Map<String, Any>>
                ?: return@withContext "Sin análisis disponible"

            // gemini-2.5-flash es modelo thinking: filtramos partes con "thought":true
            val textPart = parts.firstOrNull { (it["thought"] as? Boolean) != true }
                ?: parts.firstOrNull()
            textPart?.get("text") as? String ?: "Sin análisis disponible"
        } catch (e: Exception) {
            Log.e("GeminiManager", "Error calling Gemini", e)
            "Error al generar análisis con IA"
        }
    }
}
