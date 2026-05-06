package com.example.aplicaciontfg.adapters

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.aplicaciontfg.R
import com.example.aplicaciontfg.managers.ImageLoader
import com.example.aplicaciontfg.models.Producto

class ProductAdapter(
    private val context: Context,
    private var productos: List<Producto>,
    private val onProductClick: (Producto) -> Unit,
    private val onAddToCart: (Producto) -> Unit
) : RecyclerView.Adapter<ProductAdapter.ProductViewHolder>() {

    inner class ProductViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val ivProduct: ImageView = itemView.findViewById(R.id.iv_product)
        val tvBrand: TextView = itemView.findViewById(R.id.tv_brand)
        val tvName: TextView = itemView.findViewById(R.id.tv_name)
        val tvDescription: TextView = itemView.findViewById(R.id.tv_description)
        val tvPrice: TextView = itemView.findViewById(R.id.tv_price)
        val tvStockBadge: TextView = itemView.findViewById(R.id.tv_stock_badge)
        val starsRow: LinearLayout = itemView.findViewById(R.id.stars_row)
        val tvReviewsCount: TextView = itemView.findViewById(R.id.tv_reviews_count)
        val btnAddToCart: Button = itemView.findViewById(R.id.btn_add_to_cart)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProductViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.item_product_card, parent, false)
        return ProductViewHolder(view)
    }

    override fun onBindViewHolder(holder: ProductViewHolder, position: Int) {
        val p = productos[position]

        ImageLoader.load(context, p.imagen, holder.ivProduct)
        holder.tvBrand.text = p.marca
        holder.tvName.text = p.nombre
        holder.tvDescription.text = p.descripcion
        holder.tvPrice.text = "%.2f€".format(p.precio)

        if (p.stock > 0) {
            holder.tvStockBadge.text = context.getString(R.string.product_stock)
            holder.tvStockBadge.setBackgroundResource(R.drawable.bg_badge_success)
        } else {
            holder.tvStockBadge.text = context.getString(R.string.product_out_of_stock)
            holder.tvStockBadge.setBackgroundResource(R.drawable.bg_badge_danger)
        }

        holder.starsRow.removeAllViews()
        val stars = p.valoracion.toInt()
        repeat(stars) {
            val star = ImageView(context)
            star.setImageResource(R.drawable.ic_star_filled)
            star.layoutParams = LinearLayout.LayoutParams(32, 32)
            holder.starsRow.addView(star)
        }
        repeat(5 - stars) {
            val star = ImageView(context)
            star.setImageResource(R.drawable.ic_star_empty)
            star.layoutParams = LinearLayout.LayoutParams(32, 32)
            holder.starsRow.addView(star)
        }
        holder.tvReviewsCount.text = "(${p.numResenas})"

        holder.btnAddToCart.isEnabled = p.stock > 0
        holder.btnAddToCart.setOnClickListener { onAddToCart(p) }
        holder.itemView.setOnClickListener { onProductClick(p) }
    }

    override fun getItemCount() = productos.size

    fun updateList(newList: List<Producto>) {
        productos = newList
        notifyDataSetChanged()
    }
}
