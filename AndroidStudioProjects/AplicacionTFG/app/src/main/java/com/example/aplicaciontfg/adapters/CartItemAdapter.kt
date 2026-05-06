package com.example.aplicaciontfg.adapters

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.aplicaciontfg.R
import com.example.aplicaciontfg.managers.ImageLoader
import com.example.aplicaciontfg.models.CarritoItem

class CartItemAdapter(
    private val context: Context,
    private var items: List<CarritoItem>,
    private val onIncrease: (CarritoItem) -> Unit,
    private val onDecrease: (CarritoItem) -> Unit,
    private val onRemove: (CarritoItem) -> Unit
) : RecyclerView.Adapter<CartItemAdapter.CartViewHolder>() {

    inner class CartViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val ivProduct: ImageView = itemView.findViewById(R.id.iv_product)
        val tvName: TextView = itemView.findViewById(R.id.tv_name)
        val tvBrand: TextView = itemView.findViewById(R.id.tv_brand)
        val tvPriceTotal: TextView = itemView.findViewById(R.id.tv_price_total)
        val tvPriceUnit: TextView = itemView.findViewById(R.id.tv_price_unit)
        val tvQuantity: TextView = itemView.findViewById(R.id.tv_quantity)
        val btnIncrease: Button = itemView.findViewById(R.id.btn_increase)
        val btnDecrease: Button = itemView.findViewById(R.id.btn_decrease)
        val btnRemove: Button = itemView.findViewById(R.id.btn_remove)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CartViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.item_cart, parent, false)
        return CartViewHolder(view)
    }

    override fun onBindViewHolder(holder: CartViewHolder, position: Int) {
        val item = items[position]
        ImageLoader.load(context, item.producto.imagen, holder.ivProduct)
        holder.tvName.text = item.producto.nombre
        holder.tvBrand.text = item.producto.marca
        holder.tvPriceTotal.text = "%.2f€".format(item.producto.precio * item.cantidad)
        holder.tvPriceUnit.text = "%.2f€ / ud.".format(item.producto.precio)
        holder.tvQuantity.text = item.cantidad.toString()
        holder.btnIncrease.setOnClickListener { onIncrease(item) }
        holder.btnDecrease.setOnClickListener { onDecrease(item) }
        holder.btnRemove.setOnClickListener { onRemove(item) }
    }

    override fun getItemCount() = items.size

    fun updateList(newItems: List<CarritoItem>) {
        items = newItems
        notifyDataSetChanged()
    }
}
