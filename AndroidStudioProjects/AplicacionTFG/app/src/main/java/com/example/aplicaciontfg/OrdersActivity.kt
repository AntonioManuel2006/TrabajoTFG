package com.example.aplicaciontfg

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.aplicaciontfg.adapters.OrderAdapter
import com.example.aplicaciontfg.databinding.ActivityOrdersBinding
import com.example.aplicaciontfg.managers.AuthManager
import com.example.aplicaciontfg.managers.PedidosManager

class OrdersActivity : BaseActivity() {
    private lateinit var binding: ActivityOrdersBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        super.onCreate(savedInstanceState)
        binding = ActivityOrdersBinding.inflate(layoutInflater)
        setContentView(binding.root)
        AuthManager.init(this)
        PedidosManager.init(this)

        binding.toolbar.setNavigationOnClickListener { finish() }
        if (!AuthManager.isLoggedIn()) {
            binding.layoutNotLogged.visibility = View.VISIBLE
            binding.layoutEmpty.visibility = View.GONE
            binding.rvOrders.visibility = View.GONE
            binding.btnLogin.setOnClickListener {
                startActivity(Intent(this, LoginActivity::class.java))
            }
            return
        }

        val userId = AuthManager.getUser()?.id ?: 1
        val pedidos = PedidosManager.getPedidosUsuario(userId)

        if (pedidos.isEmpty()) {
            binding.layoutNotLogged.visibility = View.GONE
            binding.layoutEmpty.visibility = View.VISIBLE
            binding.rvOrders.visibility = View.GONE
            binding.btnShop.setOnClickListener {
                startActivity(Intent(this, MainActivity::class.java).apply {
                    flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                })
                finish()
            }
        } else {
            binding.layoutNotLogged.visibility = View.GONE
            binding.layoutEmpty.visibility = View.GONE
            binding.rvOrders.visibility = View.VISIBLE
            binding.rvOrders.layoutManager = LinearLayoutManager(this)
            binding.rvOrders.adapter = OrderAdapter(this, pedidos)
        }
    }
}
