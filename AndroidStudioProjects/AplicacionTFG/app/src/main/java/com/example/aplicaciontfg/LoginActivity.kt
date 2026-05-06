package com.example.aplicaciontfg

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import com.example.aplicaciontfg.database.TiendaDbHelper
import com.example.aplicaciontfg.databinding.ActivityLoginBinding
import com.example.aplicaciontfg.managers.AuthManager

class LoginActivity : BaseActivity() {
    private lateinit var binding: ActivityLoginBinding
    private lateinit var db: TiendaDbHelper

    override fun onCreate(savedInstanceState: Bundle?) {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)
        db = TiendaDbHelper(this)
        AuthManager.init(this)

        // El icono de retroceso y título están en el XML, solo manejamos el click
        binding.toolbar.setNavigationOnClickListener { goToMain() }
        if (AuthManager.isLoggedIn()) {
            goToMain()
            return
        }

        binding.btnLogin.setOnClickListener { attemptLogin() }
        binding.tvGoRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }

    private fun attemptLogin() {
        val email = binding.etEmail.text?.toString()?.trim() ?: ""
        val password = binding.etPassword.text?.toString() ?: ""

        if (email.isEmpty() || password.isEmpty()) {
            binding.layoutError.visibility = View.VISIBLE
            return
        }

        val user = db.loginUsuario(email, password)
        if (user != null) {
            AuthManager.login(user)
            binding.layoutError.visibility = View.GONE
            goToMain()
        } else {
            binding.layoutError.visibility = View.VISIBLE
        }
    }

    private fun goToMain() {
        startActivity(Intent(this, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
        })
        finish()
    }
}
