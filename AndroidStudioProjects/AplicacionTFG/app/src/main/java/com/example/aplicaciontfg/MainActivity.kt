package com.example.aplicaciontfg

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import com.example.aplicaciontfg.databinding.ActivityMainBinding
import com.example.aplicaciontfg.fragments.CartFragment
import com.example.aplicaciontfg.fragments.HomeFragment
import com.example.aplicaciontfg.fragments.ProductListFragment
import com.example.aplicaciontfg.fragments.ProfileFragment
import com.example.aplicaciontfg.managers.AuthManager
import com.example.aplicaciontfg.managers.CarritoManager
import com.example.aplicaciontfg.managers.PedidosManager

class MainActivity : BaseActivity() {
    private lateinit var binding: ActivityMainBinding
    private val homeFragment = HomeFragment()
    private val productListFragment = ProductListFragment()
    private val cartFragment = CartFragment()
    private val profileFragment = ProfileFragment()

    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        WindowCompat.setDecorFitsSystemWindows(window, false)
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        AuthManager.init(this)
        CarritoManager.init(this)
        PedidosManager.init(this)

        ViewCompat.setOnApplyWindowInsetsListener(binding.root) { _, insets ->
            val bars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            val bottomNavHeight = resources.getDimensionPixelSize(R.dimen.bottom_nav_height)
            // Padding inferior del contenedor + barra de navegación del sistema
            binding.fragmentContainer.updatePadding(bottom = bottomNavHeight + bars.bottom)
            binding.bottomNav.updatePadding(bottom = bars.bottom)
            // Propagar insets al fragmentContainer para que cada fragment gestione su toolbar
            ViewCompat.dispatchApplyWindowInsets(binding.fragmentContainer, insets)
            WindowInsetsCompat.CONSUMED
        }

        setupNavigation()
        if (savedInstanceState == null) loadFragment(homeFragment)
    }

    private fun setupNavigation() {
        binding.bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_home -> { loadFragment(homeFragment); true }
                R.id.nav_products -> { loadFragment(productListFragment); true }
                R.id.nav_cart -> { loadFragment(cartFragment); true }
                R.id.nav_account -> { loadFragment(profileFragment); true }
                else -> false
            }
        }
    }

    private fun loadFragment(fragment: androidx.fragment.app.Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragment_container, fragment)
            .commit()
    }

    fun goToProducts() {
        binding.bottomNav.selectedItemId = R.id.nav_products
    }

    fun goToCart() {
        binding.bottomNav.selectedItemId = R.id.nav_cart
    }

    override fun onResume() {
        super.onResume()
        if (cartFragment.isAdded) cartFragment.refresh()
    }
}
