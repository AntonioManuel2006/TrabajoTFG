package com.example.aplicaciontfg.fragments

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.aplicaciontfg.CheckoutActivity
import com.example.aplicaciontfg.LoginActivity
import com.example.aplicaciontfg.R
import com.example.aplicaciontfg.adapters.CartItemAdapter
import com.example.aplicaciontfg.databinding.FragmentCartBinding
import com.example.aplicaciontfg.managers.AuthManager
import com.example.aplicaciontfg.managers.CarritoManager

class CartFragment : Fragment() {
    private var _binding: FragmentCartBinding? = null
    private val binding get() = _binding!!
    private lateinit var adapter: CartItemAdapter

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentCartBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        adapter = CartItemAdapter(
            requireContext(),
            CarritoManager.items,
            onIncrease = { item -> CarritoManager.updateQuantity(item.producto.id, item.cantidad + 1); refresh() },
            onDecrease = { item -> CarritoManager.updateQuantity(item.producto.id, item.cantidad - 1); refresh() },
            onRemove = { item -> CarritoManager.removeFromCart(item.producto.id); refresh() }
        )

        binding.rvCartItems.layoutManager = LinearLayoutManager(requireContext())
        binding.rvCartItems.adapter = adapter

        binding.btnContinueEmpty.setOnClickListener {
            (requireActivity() as? com.example.aplicaciontfg.MainActivity)?.goToProducts()
        }

        binding.btnClearCart.setOnClickListener {
            CarritoManager.clearCart()
            refresh()
        }

        binding.btnCheckout.setOnClickListener {
            if (AuthManager.isLoggedIn()) {
                startActivity(Intent(requireContext(), CheckoutActivity::class.java))
            } else {
                startActivity(Intent(requireContext(), LoginActivity::class.java))
            }
        }

        refresh()
    }

    fun refresh() {
        val items = CarritoManager.items

        if (items.isEmpty()) {
            binding.layoutCartEmpty.visibility = View.VISIBLE
            binding.layoutCartContent.visibility = View.GONE
        } else {
            binding.layoutCartEmpty.visibility = View.GONE
            binding.layoutCartContent.visibility = View.VISIBLE
            adapter.updateList(items)
            binding.tvTotal.text = "%.2f€".format(CarritoManager.total)

            if (AuthManager.isLoggedIn()) {
                binding.btnCheckout.text = getString(R.string.cart_checkout)
            } else {
                binding.btnCheckout.text = getString(R.string.cart_login_to_checkout)
            }
        }
    }

    override fun onResume() {
        super.onResume()
        refresh()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
