package com.example.aplicaciontfg

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.view.inputmethod.EditorInfo
import android.view.inputmethod.InputMethodManager
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import androidx.recyclerview.widget.GridLayoutManager
import com.example.aplicaciontfg.adapters.ProductAdapter
import com.example.aplicaciontfg.database.TiendaDbHelper
import com.example.aplicaciontfg.databinding.ActivitySearchBinding
import com.example.aplicaciontfg.managers.CarritoManager

class SearchActivity : BaseActivity() {
    private lateinit var binding: ActivitySearchBinding
    private lateinit var db: TiendaDbHelper
    private lateinit var adapter: ProductAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        super.onCreate(savedInstanceState)
        binding = ActivitySearchBinding.inflate(layoutInflater)
        setContentView(binding.root)
        db = TiendaDbHelper(this)

        // Inset status bar: la searchToolbar (LinearLayout) recibe paddingTop
        ViewCompat.setOnApplyWindowInsetsListener(binding.searchToolbar) { v, insets ->
            val top = insets.getInsets(WindowInsetsCompat.Type.statusBars()).top
            v.updatePadding(top = top)
            v.minimumHeight = resources.getDimensionPixelSize(R.dimen.toolbar_height) + top
            insets
        }

        binding.btnBack.setOnClickListener { finish() }

        adapter = ProductAdapter(this, emptyList(),
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

        binding.rvResults.layoutManager = GridLayoutManager(this, 2)
        binding.rvResults.adapter = adapter

        val initialQuery = intent.getStringExtra("query") ?: ""
        if (initialQuery.isNotBlank()) {
            binding.etSearch.setText(initialQuery)
            performSearch(initialQuery)
        }

        binding.etSearch.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) { performSearch(s?.toString() ?: "") }
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })

        binding.etSearch.setOnEditorActionListener { _, actionId, _ ->
            if (actionId == EditorInfo.IME_ACTION_SEARCH) {
                val imm = getSystemService(INPUT_METHOD_SERVICE) as InputMethodManager
                imm.hideSoftInputFromWindow(binding.etSearch.windowToken, 0)
                true
            } else false
        }

        binding.etSearch.requestFocus()
        val imm = getSystemService(INPUT_METHOD_SERVICE) as InputMethodManager
        imm.showSoftInput(binding.etSearch, InputMethodManager.SHOW_IMPLICIT)
    }

    private fun performSearch(query: String) {
        if (query.isBlank()) {
            binding.tvResultsCount.text = ""
            binding.layoutNoResults.visibility = View.GONE
            binding.rvResults.visibility = View.GONE
            adapter.updateList(emptyList())
            return
        }

        val results = db.searchProductos(query)
        binding.tvResultsCount.text = "${results.size} resultados para \"$query\""

        if (results.isEmpty()) {
            binding.layoutNoResults.visibility = View.VISIBLE
            binding.rvResults.visibility = View.GONE
            binding.tvNoResults.text = getString(R.string.no_results_search, query)
        } else {
            binding.layoutNoResults.visibility = View.GONE
            binding.rvResults.visibility = View.VISIBLE
        }
        adapter.updateList(results)
    }
}
