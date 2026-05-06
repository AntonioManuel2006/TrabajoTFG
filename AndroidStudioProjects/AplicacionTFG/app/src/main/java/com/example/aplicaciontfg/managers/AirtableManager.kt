package com.example.aplicaciontfg.managers

import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import java.net.URLEncoder

object AirtableManager {
    private val client = OkHttpClient()
    private val gson = Gson()
    private val JSON = "application/json".toMediaType()

    private val TOKEN get() = com.example.aplicaciontfg.BuildConfig.AIRTABLE_TOKEN
    private const val BASE_ID = "appC2BagfAb0ujQ3w"
    private const val TABLE = "Usuarios"
    private val BASE_URL = "https://api.airtable.com/v0/$BASE_ID/$TABLE"

    suspend fun createUser(
        nombre: String,
        apellidos: String,
        email: String,
        telefono: String,
        fechaRegistro: String
    ) = withContext(Dispatchers.IO) {
        try {
            val body = gson.toJson(mapOf(
                "fields" to mapOf(
                    "Nombre" to nombre,
                    "Apellidos" to apellidos,
                    "Email" to email,
                    "Telefono" to telefono,
                    "Fecha Registro" to fechaRegistro,
                    "Analisis Compra IA" to ""
                )
            ))
            val request = Request.Builder()
                .url(BASE_URL)
                .addHeader("Authorization", "Bearer $TOKEN")
                .addHeader("Content-Type", "application/json")
                .post(body.toRequestBody(JSON))
                .build()
            client.newCall(request).execute().close()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    suspend fun updatePurchaseAnalysis(email: String, analysis: String) = withContext(Dispatchers.IO) {
        try {
            val filter = URLEncoder.encode("{Email}=\"$email\"", "UTF-8")
            val findRequest = Request.Builder()
                .url("$BASE_URL?filterByFormula=$filter")
                .addHeader("Authorization", "Bearer $TOKEN")
                .get()
                .build()
            val response = client.newCall(findRequest).execute()
            val responseBody = response.body?.string() ?: return@withContext
            response.close()

            @Suppress("UNCHECKED_CAST")
            val json = gson.fromJson(responseBody, Map::class.java)
            val records = json["records"] as? List<Map<String, Any>> ?: return@withContext
            if (records.isEmpty()) return@withContext
            val recordId = records[0]["id"] as? String ?: return@withContext

            val patchBody = gson.toJson(mapOf(
                "fields" to mapOf("Analisis Compra IA" to analysis)
            ))
            val patchRequest = Request.Builder()
                .url("$BASE_URL/$recordId")
                .addHeader("Authorization", "Bearer $TOKEN")
                .addHeader("Content-Type", "application/json")
                .patch(patchBody.toRequestBody(JSON))
                .build()
            client.newCall(patchRequest).execute().close()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}
