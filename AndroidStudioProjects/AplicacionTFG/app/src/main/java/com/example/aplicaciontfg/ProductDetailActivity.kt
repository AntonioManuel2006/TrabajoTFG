package com.example.aplicaciontfg

import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.aplicaciontfg.database.TiendaDbHelper
import com.example.aplicaciontfg.databinding.ActivityProductDetailBinding
import com.example.aplicaciontfg.managers.CarritoManager
import com.example.aplicaciontfg.managers.ImageLoader
import com.google.android.material.tabs.TabLayout

class ProductDetailActivity : BaseActivity() {
    private lateinit var binding: ActivityProductDetailBinding
    private lateinit var db: TiendaDbHelper
    private var cantidad = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        super.onCreate(savedInstanceState)
        binding = ActivityProductDetailBinding.inflate(layoutInflater)
        setContentView(binding.root)
        db = TiendaDbHelper(this)

        val productoId = intent.getIntExtra("producto_id", -1)
        if (productoId == -1) { finish(); return }

        val producto = db.getProductoById(productoId)
        if (producto == null) { finish(); return }

        binding.toolbar.title = producto.nombre
        binding.toolbar.setNavigationOnClickListener { finish() }
        ImageLoader.load(this, producto.imagen, binding.ivProduct)

        binding.tvBrandBadge.text = producto.marca
        binding.tvProductName.text = producto.nombre
        binding.tvPrice.text = "%.2f€".format(producto.precio)
        binding.tvDescription.text = producto.descripcion
        binding.tvFullDescription.text = producto.descripcion

        if (producto.stock > 0) {
            binding.tvStockBadge.text = getString(R.string.product_stock)
            binding.tvStockBadge.setBackgroundResource(R.drawable.bg_badge_success)
        } else {
            binding.tvStockBadge.text = getString(R.string.product_out_of_stock)
            binding.tvStockBadge.setBackgroundResource(R.drawable.bg_badge_danger)
            binding.btnAddToCart.isEnabled = false
        }

        binding.tvCategory.text = producto.categoria

        // Estrellas
        binding.starsContainer.removeAllViews()
        repeat(producto.valoracion.toInt()) {
            val star = ImageView(this)
            star.setImageResource(R.drawable.ic_star_filled)
            star.layoutParams = LinearLayout.LayoutParams(36, 36)
            binding.starsContainer.addView(star)
        }
        repeat(5 - producto.valoracion.toInt()) {
            val star = ImageView(this)
            star.setImageResource(R.drawable.ic_star_empty)
            star.layoutParams = LinearLayout.LayoutParams(36, 36)
            binding.starsContainer.addView(star)
        }
        binding.tvRating.text = "%.1f (${producto.numResenas} reseñas)".format(producto.valoracion)

        // Cantidad
        binding.tvQuantity.text = cantidad.toString()
        binding.btnDecrease.setOnClickListener {
            if (cantidad > 1) { cantidad--; binding.tvQuantity.text = cantidad.toString() }
        }
        binding.btnIncrease.setOnClickListener {
            if (cantidad < producto.stock) { cantidad++; binding.tvQuantity.text = cantidad.toString() }
        }

        binding.btnAddToCart.setOnClickListener {
            CarritoManager.addToCart(producto, cantidad)
            Toast.makeText(this, getString(R.string.product_added_to_cart), Toast.LENGTH_SHORT).show()
        }

        // Tabs
        binding.tabLayout.addTab(binding.tabLayout.newTab().setText(R.string.product_description))
        binding.tabLayout.addTab(binding.tabLayout.newTab().setText(R.string.product_reviews))
        binding.tabLayout.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
            override fun onTabSelected(tab: TabLayout.Tab?) {
                when (tab?.position) {
                    0 -> { binding.tabDescription.visibility = View.VISIBLE; binding.tabReviews.visibility = View.GONE }
                    1 -> { binding.tabDescription.visibility = View.GONE; binding.tabReviews.visibility = View.VISIBLE }
                }
            }
            override fun onTabUnselected(tab: TabLayout.Tab?) {}
            override fun onTabReselected(tab: TabLayout.Tab?) {}
        })
    }
}
