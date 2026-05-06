package com.example.aplicaciontfg

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.coroutines.GlobalScope
import com.example.aplicaciontfg.adapters.CheckoutItemAdapter
import com.example.aplicaciontfg.database.TiendaDbHelper
import com.example.aplicaciontfg.databinding.ActivityCheckoutBinding
import com.example.aplicaciontfg.managers.AirtableManager
import com.example.aplicaciontfg.managers.AuthManager
import com.example.aplicaciontfg.managers.CarritoManager
import com.example.aplicaciontfg.managers.GeminiManager
import com.example.aplicaciontfg.managers.PedidosManager
import com.example.aplicaciontfg.models.DireccionEnvio
import kotlinx.coroutines.launch

class CheckoutActivity : BaseActivity() {
    private lateinit var binding: ActivityCheckoutBinding
    private lateinit var db: TiendaDbHelper

    override fun onCreate(savedInstanceState: Bundle?) {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        super.onCreate(savedInstanceState)
        binding = ActivityCheckoutBinding.inflate(layoutInflater)
        setContentView(binding.root)
        db = TiendaDbHelper(this)
        AuthManager.init(this)
        PedidosManager.init(this)

        binding.toolbar.setNavigationOnClickListener { finish() }
        val user = AuthManager.getUser()
        if (user != null) {
            binding.etNombre.setText(user.nombre)
            binding.etApellidos.setText(user.apellidos)
            binding.etEmail.setText(user.email)
            binding.etTelefono.setText(user.telefono)
        }

        val items = CarritoManager.items
        val subtotal = CarritoManager.total
        val iva = subtotal * 0.21
        val total = subtotal * 1.21

        binding.rvCheckoutItems.layoutManager = LinearLayoutManager(this)
        binding.rvCheckoutItems.adapter = CheckoutItemAdapter(this, items)
        binding.tvSubtotal.text = "%.2f€".format(subtotal)
        binding.tvIva.text = "%.2f€".format(iva)
        binding.tvTotal.text = "%.2f€".format(total)

        binding.btnPlaceOrder.setOnClickListener { placeOrder(total) }

        binding.btnViewOrders.setOnClickListener {
            startActivity(Intent(this, OrdersActivity::class.java))
            finish()
        }
        binding.btnBackHome.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
            })
            finish()
        }
    }

    private fun placeOrder(total: Double) {
        val nombre = binding.etNombre.text?.toString()?.trim() ?: ""
        val apellidos = binding.etApellidos.text?.toString()?.trim() ?: ""
        val email = binding.etEmail.text?.toString()?.trim() ?: ""
        val direccion = binding.etDireccion.text?.toString()?.trim() ?: ""
        val ciudad = binding.etCiudad.text?.toString()?.trim() ?: ""
        val provincia = binding.etProvincia.text?.toString()?.trim() ?: ""
        val cp = binding.etCp.text?.toString()?.trim() ?: ""
        val pais = binding.etPais.text?.toString()?.trim() ?: "España"

        if (nombre.isEmpty() || apellidos.isEmpty() || email.isEmpty() ||
            direccion.isEmpty() || ciudad.isEmpty() || provincia.isEmpty() || cp.isEmpty()) {
            binding.tvFormError.visibility = View.VISIBLE
            return
        }

        binding.tvFormError.visibility = View.GONE
        val user = AuthManager.getUser()
        val userId = user?.id ?: 1
        val capturedItems = CarritoManager.items.toList()

        val pedido = PedidosManager.crearPedido(
            userId = userId,
            items = capturedItems,
            direccion = DireccionEnvio(direccion, ciudad, provincia, cp, pais)
        )

        CarritoManager.clearCart()

        binding.layoutForm.visibility = View.GONE
        binding.layoutSuccess.visibility = View.VISIBLE
        binding.tvOrderNumber.text = "#${pedido.numeroPedido}"
        binding.tvOrderTotal.text = "Total: %.2f€".format(pedido.total)

        if (user != null) {
            @Suppress("OPT_IN_USAGE")
            GlobalScope.launch(kotlinx.coroutines.Dispatchers.IO) {
                val nombreCompleto = "${user.nombre} ${user.apellidos}"
                val analysis = GeminiManager.analyzePurchase(capturedItems, pedido.total, nombreCompleto)
                AirtableManager.updatePurchaseAnalysis(user.email, analysis)
            }
        }
    }
}
