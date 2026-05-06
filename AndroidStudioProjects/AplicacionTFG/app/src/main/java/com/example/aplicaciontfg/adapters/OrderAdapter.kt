package com.example.aplicaciontfg.adapters

import android.content.Context
import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.aplicaciontfg.R
import com.example.aplicaciontfg.managers.ImageLoader
import com.example.aplicaciontfg.models.CarritoItem
import com.example.aplicaciontfg.models.Pedido

class OrderAdapter(
    private val context: Context,
    private var pedidos: List<Pedido>
) : RecyclerView.Adapter<OrderAdapter.OrderViewHolder>() {

    inner class OrderViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tvOrderNumber: TextView = itemView.findViewById(R.id.tv_order_number)
        val tvDate: TextView = itemView.findViewById(R.id.tv_date)
        val tvTotal: TextView = itemView.findViewById(R.id.tv_total)
        val tvStatus: TextView = itemView.findViewById(R.id.tv_status)
        val rvItems: RecyclerView = itemView.findViewById(R.id.rv_order_items)
        val tvAddress: TextView = itemView.findViewById(R.id.tv_address)
        val tvSubtotal: TextView = itemView.findViewById(R.id.tv_subtotal)
        val tvIva: TextView = itemView.findViewById(R.id.tv_iva)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): OrderViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.item_order, parent, false)
        return OrderViewHolder(view)
    }

    override fun onBindViewHolder(holder: OrderViewHolder, position: Int) {
        val pedido = pedidos[position]

        holder.tvOrderNumber.text = "#${pedido.numeroPedido}"
        holder.tvDate.text = pedido.fecha
        holder.tvTotal.text = "%.2f€".format(pedido.total)
        holder.tvSubtotal.text = "%.2f€".format(pedido.subtotal)
        holder.tvIva.text = "%.2f€".format(pedido.iva)

        val (label, bg, fg) = when (pedido.estado) {
            "confirmado" -> Triple("✓ Confirmado", Color.parseColor("#D1FAE5"), Color.parseColor("#10B981"))
            "enviado" -> Triple("→ Enviado", Color.parseColor("#DBEAFE"), Color.parseColor("#3B82F6"))
            "entregado" -> Triple("✓ Entregado", Color.parseColor("#D1FAE5"), Color.parseColor("#059669"))
            "cancelado" -> Triple("✕ Cancelado", Color.parseColor("#FEE2E2"), Color.parseColor("#EF4444"))
            else -> Triple("⏳ Pendiente", Color.parseColor("#FEF3C7"), Color.parseColor("#F59E0B"))
        }
        holder.tvStatus.text = label
        holder.tvStatus.setBackgroundColor(bg)
        holder.tvStatus.setTextColor(fg)

        val addr = pedido.direccion
        holder.tvAddress.text = "${addr.direccion}\n${addr.cp} ${addr.ciudad}, ${addr.provincia}\n${addr.pais}"

        holder.rvItems.layoutManager = LinearLayoutManager(context)
        holder.rvItems.adapter = OrderItemsAdapter(context, pedido.items)
        holder.rvItems.isNestedScrollingEnabled = false
    }

    override fun getItemCount() = pedidos.size

    fun updateList(newList: List<Pedido>) {
        pedidos = newList
        notifyDataSetChanged()
    }
}

class OrderItemsAdapter(
    private val context: Context,
    private val items: List<CarritoItem>
) : RecyclerView.Adapter<OrderItemsAdapter.VH>() {

    inner class VH(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val ivProduct: ImageView = itemView.findViewById(R.id.iv_product)
        val tvName: TextView = itemView.findViewById(R.id.tv_name)
        val tvBrandQty: TextView = itemView.findViewById(R.id.tv_brand_qty)
        val tvTotal: TextView = itemView.findViewById(R.id.tv_total)
        val tvUnitPrice: TextView = itemView.findViewById(R.id.tv_unit_price)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) =
        VH(LayoutInflater.from(context).inflate(R.layout.item_order_product, parent, false))

    override fun onBindViewHolder(holder: VH, position: Int) {
        val item = items[position]
        ImageLoader.load(context, item.producto.imagen, holder.ivProduct)
        holder.tvName.text = item.producto.nombre
        holder.tvBrandQty.text = "${item.producto.marca} · ×${item.cantidad}"
        holder.tvTotal.text = "%.2f€".format(item.producto.precio * item.cantidad)
        holder.tvUnitPrice.text = "%.2f€/ud.".format(item.producto.precio)
    }

    override fun getItemCount() = items.size
}
