package com.example.aplicaciontfg.managers

import android.content.Context
import android.net.Uri
import android.widget.ImageView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.example.aplicaciontfg.R

object ImageLoader {
    fun load(context: Context, imageName: String, imageView: ImageView) {
        val assetUri = Uri.parse("file:///android_asset/images/$imageName")
        Glide.with(context)
            .load(assetUri)
            .placeholder(R.drawable.ic_product_placeholder)
            .error(R.drawable.ic_product_placeholder)
            .diskCacheStrategy(DiskCacheStrategy.ALL)
            .centerInside()
            .into(imageView)
    }
}
