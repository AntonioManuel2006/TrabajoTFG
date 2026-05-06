package com.example.aplicaciontfg.managers

import android.content.Context
import android.content.res.Configuration
import java.util.Locale
import java.util.Locale.forLanguageTag

object LanguageManager {
    private const val PREFS = "app_settings"
    private const val KEY_LANG = "language"
    const val LANG_ES = "es"
    const val LANG_EN = "en"

    fun getLanguage(context: Context): String =
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .getString(KEY_LANG, LANG_ES) ?: LANG_ES

    fun setLanguage(context: Context, lang: String) {
        context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
            .edit().putString(KEY_LANG, lang).apply()
    }

    fun toggle(context: Context): String {
        val next = if (getLanguage(context) == LANG_ES) LANG_EN else LANG_ES
        setLanguage(context, next)
        return next
    }

    fun wrapContext(base: Context): Context {
        val lang = getLanguage(base)
        val locale = forLanguageTag(lang)
        Locale.setDefault(locale)
        val config = Configuration(base.resources.configuration)
        config.setLocale(locale)
        return base.createConfigurationContext(config)
    }
}
