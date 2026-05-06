package com.example.aplicaciontfg

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import androidx.lifecycle.lifecycleScope
import com.example.aplicaciontfg.database.TiendaDbHelper
import com.example.aplicaciontfg.databinding.ActivityRegisterBinding
import com.example.aplicaciontfg.managers.AirtableManager
import com.example.aplicaciontfg.managers.AuthManager
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class RegisterActivity : BaseActivity() {
    private lateinit var binding: ActivityRegisterBinding
    private lateinit var db: TiendaDbHelper

    override fun onCreate(savedInstanceState: Bundle?) {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)
        db = TiendaDbHelper(this)
        AuthManager.init(this)

        // El icono de retroceso y título están en el XML, solo manejamos el click
        binding.toolbar.setNavigationOnClickListener {
            startActivity(Intent(this, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
            })
            finish()
        }
        binding.btnRegister.setOnClickListener { attemptRegister() }
        binding.tvGoLogin.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }

        binding.etPassword.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) { updatePasswordStrength(s?.toString() ?: "") }
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })
    }

    private fun updatePasswordStrength(password: String) {
        if (password.isEmpty()) { binding.layoutPwdStrength.visibility = View.GONE; return }
        binding.layoutPwdStrength.visibility = View.VISIBLE
        var strength = 0
        if (password.length >= 6) strength++
        if (password.any { it.isUpperCase() } || password.any { it.isDigit() }) strength++
        if (password.length >= 10 && password.any { !it.isLetterOrDigit() }) strength++
        binding.progressPwd.progress = strength
        val (label, color) = when (strength) {
            1 -> Pair(getString(R.string.password_strength_weak), android.graphics.Color.parseColor("#EF4444"))
            2 -> Pair(getString(R.string.password_strength_medium), android.graphics.Color.parseColor("#F59E0B"))
            3 -> Pair(getString(R.string.password_strength_strong), android.graphics.Color.parseColor("#10B981"))
            else -> Pair(getString(R.string.password_strength_weak), android.graphics.Color.parseColor("#EF4444"))
        }
        binding.tvPwdStrength.text = label
        binding.tvPwdStrength.setTextColor(color)
    }

    private fun attemptRegister() {
        val nombre = binding.etNombre.text?.toString()?.trim() ?: ""
        val apellidos = binding.etApellidos.text?.toString()?.trim() ?: ""
        val email = binding.etEmail.text?.toString()?.trim() ?: ""
        val password = binding.etPassword.text?.toString() ?: ""
        val confirm = binding.etConfirmPassword.text?.toString() ?: ""
        val telefono = binding.etTelefono.text?.toString()?.trim() ?: ""

        if (nombre.isEmpty() || apellidos.isEmpty() || email.isEmpty() || password.isEmpty()) {
            showError(getString(R.string.register_fill_required)); return
        }
        if (password != confirm) { showError(getString(R.string.register_passwords_no_match)); return }

        val user = db.registerUsuario(nombre, apellidos, email, password, telefono)
        if (user != null) {
            AuthManager.login(user)
            val fechaRegistro = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(Date())
            lifecycleScope.launch {
                AirtableManager.createUser(nombre, apellidos, email, telefono, fechaRegistro)
            }
            startActivity(Intent(this, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            })
        } else {
            showError(getString(R.string.register_email_exists))
        }
    }

    private fun showError(msg: String) {
        binding.tvError.text = msg
        binding.tvError.visibility = View.VISIBLE
    }
}
