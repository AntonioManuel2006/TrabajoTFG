package com.example.aplicaciontfg

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import com.example.aplicaciontfg.managers.LanguageManager

abstract class BaseActivity : AppCompatActivity() {
    override fun attachBaseContext(newBase: Context) {
        super.attachBaseContext(LanguageManager.wrapContext(newBase))
    }
}
