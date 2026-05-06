package com.example.aplicaciontfg.adapters

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.aplicaciontfg.R
import com.example.aplicaciontfg.managers.ImageLoader
import com.example.aplicaciontfg.models.CarritoItem

class CheckoutItemAdapter(
    private val context: Context,
    private val items: List<CarritoItem>
) : RecyclerView.Adapter<CheckoutItemAdapter.VH>() {

    inner class VH(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val ivProduct: ImageView = itemView.findViewById(R.id.iv_product)
        val tvName: TextView = itemView.findViewById(R.id.tv_name)
        val tvQty: TextView = itemView.findViewById(R.id.tv_qty)
        val tvPrice: TextView = itemView.findViewById(R.id.tv_price)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) =
        VH(LayoutInflater.from(context).inflate(R.layout.item_checkout_product, parent, false))

    override fun onBindViewHolder(holder: VH, position: Int) {
        val item = items[position]
        ImageLoader.load(context, item.producto.imagen, holder.ivProduct)
        holder.tvName.text = if (item.producto.nombre.length > 30)
            item.producto.nombre.take(30) + "…" else item.producto.nombre
        holder.tvQty.text = "×${item.cantidad}"
        holder.tvPrice.text = "%.2f€".format(item.producto.precio * item.cantidad)
    }

    override fun getItemCount() = items.size
}
