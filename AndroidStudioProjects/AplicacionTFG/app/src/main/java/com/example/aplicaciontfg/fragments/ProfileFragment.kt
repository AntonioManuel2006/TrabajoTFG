package com.example.aplicaciontfg.fragments

import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import androidx.fragment.app.Fragment
import com.example.aplicaciontfg.LoginActivity
import com.example.aplicaciontfg.OrdersActivity
import com.example.aplicaciontfg.R
import com.example.aplicaciontfg.RegisterActivity
import com.example.aplicaciontfg.databinding.FragmentProfileBinding
import com.example.aplicaciontfg.managers.AuthManager

class ProfileFragment : Fragment() {
    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        refresh()

        binding.btnLogin.setOnClickListener {
            startActivity(Intent(requireContext(), LoginActivity::class.java))
        }
        binding.btnRegister.setOnClickListener {
            startActivity(Intent(requireContext(), RegisterActivity::class.java))
        }
        binding.btnMyOrders.setOnClickListener {
            startActivity(Intent(requireContext(), OrdersActivity::class.java))
        }
        binding.btnLogout.setOnClickListener {
            AlertDialog.Builder(requireContext())
                .setTitle(getString(R.string.logout_confirm))
                .setMessage(getString(R.string.logout_confirm_msg))
                .setPositiveButton(getString(R.string.ok)) { _, _ ->
                    AuthManager.logout()
                    refresh()
                }
                .setNegativeButton(getString(R.string.cancel), null)
                .show()
        }
    }

    private fun refresh() {
        if (AuthManager.isLoggedIn()) {
            val user = AuthManager.getUser()!!
            binding.layoutNotLogged.visibility = View.GONE
            binding.layoutLogged.visibility = View.VISIBLE
            binding.tvUserName.text = "${user.nombre} ${user.apellidos}"
            binding.tvUserEmail.text = user.email
            binding.tvAvatarLetter.text = user.nombre.firstOrNull()?.uppercaseChar()?.toString() ?: "U"
            binding.tvMemberSince.text = "Miembro desde ${user.fechaRegistro}"
        } else {
            binding.layoutNotLogged.visibility = View.VISIBLE
            binding.layoutLogged.visibility = View.GONE
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
