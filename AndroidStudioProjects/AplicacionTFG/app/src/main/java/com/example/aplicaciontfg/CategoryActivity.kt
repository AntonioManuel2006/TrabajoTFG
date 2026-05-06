package com.example.aplicaciontfg

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import androidx.recyclerview.widget.GridLayoutManager
import com.example.aplicaciontfg.adapters.ProductAdapter
import com.example.aplicaciontfg.database.TiendaDbHelper
import com.example.aplicaciontfg.databinding.ActivityCategoryBinding
import com.example.aplicaciontfg.managers.CarritoManager

class CategoryActivity : BaseActivity() {
    private lateinit var binding: ActivityCategoryBinding
    private lateinit var db: TiendaDbHelper

    override fun onCreate(savedInstanceState: Bundle?) {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        super.onCreate(savedInstanceState)
        binding = ActivityCategoryBinding.inflate(layoutInflater)
        setContentView(binding.root)
        db = TiendaDbHelper(this)

        val categoriaId = intent.getIntExtra("categoria_id", 1)
        val categoriaNombre = intent.getStringExtra("categoria_nombre") ?: "Categoría"

        binding.toolbar.title = categoriaNombre
        binding.toolbar.setNavigationOnClickListener { finish() }
        val productos = db.getProductosByCategoria(categoriaId)
        binding.tvCount.text = "${productos.size} productos en $categoriaNombre"

        if (productos.isEmpty()) {
            binding.layoutEmpty.visibility = View.VISIBLE
            binding.rvProducts.visibility = View.GONE
        } else {
            binding.layoutEmpty.visibility = View.GONE
            binding.rvProducts.visibility = View.VISIBLE
            binding.rvProducts.layoutManager = GridLayoutManager(this, 2)
            binding.rvProducts.adapter = ProductAdapter(this, productos,
                onProductClick = { p ->
                    startActivity(Intent(this, ProductDetailActivity::class.java).apply {
                        putExtra("producto_id", p.id)
                    })
                },
                onAddToCart = { p ->
                    CarritoManager.addToCart(p)
                    Toast.makeText(this, getString(R.string.product_added_to_cart), Toast.LENGTH_SHORT).show()
                }
            )
        }
    }
}
