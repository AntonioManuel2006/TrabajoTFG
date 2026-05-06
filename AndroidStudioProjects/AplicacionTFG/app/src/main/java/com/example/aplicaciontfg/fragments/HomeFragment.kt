package com.example.aplicaciontfg.fragments

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.aplicaciontfg.CategoryActivity
import com.example.aplicaciontfg.ProductDetailActivity
import com.example.aplicaciontfg.adapters.CategoryAdapter
import com.example.aplicaciontfg.adapters.ProductAdapter
import com.example.aplicaciontfg.database.TiendaDbHelper
import com.example.aplicaciontfg.databinding.FragmentHomeBinding
import com.example.aplicaciontfg.managers.CarritoManager
import com.example.aplicaciontfg.managers.LanguageManager

class HomeFragment : Fragment() {
    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!
    private lateinit var db: TiendaDbHelper

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        db = TiendaDbHelper(requireContext())

        // El hero arranca desde el top: añadir padding del status bar al SwipeRefreshLayout
        ViewCompat.setOnApplyWindowInsetsListener(binding.swipeRefresh) { v, insets ->
            val top = insets.getInsets(WindowInsetsCompat.Type.statusBars()).top
            v.updatePadding(top = top)
            insets
        }

        setupLanguageButton()
        setupCategorias()
        setupDestacados()
        setupNovedades()
        setupBanners()

        binding.swipeRefresh.setColorSchemeResources(com.example.aplicaciontfg.R.color.primary)
        binding.swipeRefresh.setOnRefreshListener {
            setupDestacados()
            setupNovedades()
            binding.swipeRefresh.isRefreshing = false
        }
    }

    private fun setupLanguageButton() {
        val currentLang = LanguageManager.getLanguage(requireContext())
        binding.btnLanguage.text = if (currentLang == LanguageManager.LANG_ES) "EN" else "ES"
        binding.btnLanguage.setOnClickListener {
            LanguageManager.toggle(requireContext())
            requireActivity().recreate()
        }
    }

    private fun setupCategorias() {
        val categorias = db.getCategorias()
        binding.rvCategories.layoutManager =
            LinearLayoutManager(requireContext(), LinearLayoutManager.HORIZONTAL, false)
        binding.rvCategories.adapter = CategoryAdapter(requireContext(), categorias) { cat ->
            startActivity(Intent(requireContext(), CategoryActivity::class.java).apply {
                putExtra("categoria_id", cat.id)
                putExtra("categoria_nombre", cat.nombre)
            })
        }
    }

    private fun setupDestacados() {
        val productos = db.getDestacados()
        binding.rvFeatured.layoutManager = GridLayoutManager(requireContext(), 2)
        binding.rvFeatured.adapter = ProductAdapter(requireContext(), productos,
            onProductClick = { p ->
                startActivity(Intent(requireContext(), ProductDetailActivity::class.java).apply {
                    putExtra("producto_id", p.id)
                })
            },
            onAddToCart = { p ->
                CarritoManager.addToCart(p)
                Toast.makeText(requireContext(),
                    getString(com.example.aplicaciontfg.R.string.product_added_to_cart),
                    Toast.LENGTH_SHORT).show()
            }
        )
        binding.tvViewAllFeatured.setOnClickListener {
            (parentFragment as? Fragment)?.let { }
            (requireActivity() as? com.example.aplicaciontfg.MainActivity)?.goToProducts()
        }
    }

    private fun setupNovedades() {
        val productos = db.getNovedades()
        binding.rvNewArrivals.layoutManager = GridLayoutManager(requireContext(), 2)
        binding.rvNewArrivals.adapter = ProductAdapter(requireContext(), productos,
            onProductClick = { p ->
                startActivity(Intent(requireContext(), ProductDetailActivity::class.java).apply {
                    putExtra("producto_id", p.id)
                })
            },
            onAddToCart = { p ->
                CarritoManager.addToCart(p)
                Toast.makeText(requireContext(),
                    getString(com.example.aplicaciontfg.R.string.product_added_to_cart),
                    Toast.LENGTH_SHORT).show()
            }
        )
        binding.tvViewAllNew.setOnClickListener {
            (requireActivity() as? com.example.aplicaciontfg.MainActivity)?.goToProducts()
        }
    }

    private fun setupBanners() {
        binding.bannerSmartphones.setOnClickListener {
            startActivity(Intent(requireContext(), CategoryActivity::class.java).apply {
                putExtra("categoria_id", 1)
                putExtra("categoria_nombre", "Smartphones")
            })
        }
        binding.bannerGaming.setOnClickListener {
            startActivity(Intent(requireContext(), CategoryActivity::class.java).apply {
                putExtra("categoria_id", 7)
                putExtra("categoria_nombre", "Consolas")
            })
        }
        binding.btnHeroProducts.setOnClickListener {
            (requireActivity() as? com.example.aplicaciontfg.MainActivity)?.goToProducts()
        }
        binding.btnHeroGaming.setOnClickListener {
            startActivity(Intent(requireContext(), CategoryActivity::class.java).apply {
                putExtra("categoria_id", 7)
                putExtra("categoria_nombre", "Consolas")
            })
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
