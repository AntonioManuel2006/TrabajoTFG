package com.example.aplicaciontfg.fragments

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.EditorInfo
import android.widget.*
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import com.example.aplicaciontfg.ProductDetailActivity
import com.example.aplicaciontfg.R
import com.example.aplicaciontfg.SearchActivity
import com.example.aplicaciontfg.adapters.ProductAdapter
import com.example.aplicaciontfg.database.TiendaDbHelper
import com.example.aplicaciontfg.databinding.FragmentProductListBinding
import com.example.aplicaciontfg.managers.CarritoManager
import com.example.aplicaciontfg.models.Categoria
import com.example.aplicaciontfg.models.Marca
import com.example.aplicaciontfg.models.Producto
import com.google.android.material.bottomsheet.BottomSheetDialog

class ProductListFragment : Fragment() {
    private var _binding: FragmentProductListBinding? = null
    private val binding get() = _binding!!
    private lateinit var db: TiendaDbHelper
    private lateinit var adapter: ProductAdapter

    private var allProducts = listOf<Producto>()
    private var filteredProducts = listOf<Producto>()

    // Estado de filtros activos
    private var sortBy = "default"
    private var maxPrecio = 2500
    private val selectedCatIds = mutableSetOf<Int>()
    private val selectedMarcaIds = mutableSetOf<Int>()

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentProductListBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        db = TiendaDbHelper(requireContext())

        adapter = ProductAdapter(requireContext(), emptyList(),
            onProductClick = { p ->
                startActivity(Intent(requireContext(), ProductDetailActivity::class.java).apply {
                    putExtra("producto_id", p.id)
                })
            },
            onAddToCart = { p ->
                CarritoManager.addToCart(p)
                Toast.makeText(requireContext(),
                    getString(R.string.product_added_to_cart), Toast.LENGTH_SHORT).show()
            }
        )

        binding.rvProducts.layoutManager = GridLayoutManager(requireContext(), 2)
        binding.rvProducts.adapter = adapter

        setupSortSpinner()
        loadProducts()
        setupSearch()

        binding.btnFilter.setOnClickListener { showFilterBottomSheet() }
    }

    private fun loadProducts() {
        allProducts = db.getProductos()
        applyFilters()
    }

    private fun applyFilters() {
        var result = allProducts

        if (selectedCatIds.isNotEmpty())
            result = result.filter { it.categoriaId in selectedCatIds }

        if (selectedMarcaIds.isNotEmpty())
            result = result.filter { it.marcaId in selectedMarcaIds }

        result = result.filter { it.precio <= maxPrecio }

        filteredProducts = when (sortBy) {
            "nameAsc"   -> result.sortedBy { it.nombre }
            "nameDesc"  -> result.sortedByDescending { it.nombre }
            "priceAsc"  -> result.sortedBy { it.precio }
            "priceDesc" -> result.sortedByDescending { it.precio }
            else        -> result
        }

        adapter.updateList(filteredProducts)
        binding.tvCount.text = getString(R.string.results_count, filteredProducts.size)

        val hasFilters = selectedCatIds.isNotEmpty() || selectedMarcaIds.isNotEmpty() || maxPrecio < 2500
        binding.btnFilter.text = if (hasFilters) "Filtros ●" else "Filtros"

        binding.layoutEmpty.visibility = if (filteredProducts.isEmpty()) View.VISIBLE else View.GONE
        binding.rvProducts.visibility = if (filteredProducts.isEmpty()) View.GONE else View.VISIBLE
    }

    private fun showFilterBottomSheet() {
        val dialog = BottomSheetDialog(requireContext())
        val sheetView = layoutInflater.inflate(R.layout.bottom_sheet_filters, null)
        dialog.setContentView(sheetView)

        val categorias = db.getCategorias()
        val marcas = db.getMarcas()

        // --- Spinner de ordenación ---
        val sortOptions = listOf(
            getString(R.string.sort_default),
            getString(R.string.sort_name_asc),
            getString(R.string.sort_name_desc),
            getString(R.string.sort_price_asc),
            getString(R.string.sort_price_desc)
        )
        val spinnerSort = sheetView.findViewById<Spinner>(R.id.spinner_sort_sheet)
        spinnerSort.adapter = object : ArrayAdapter<String>(
            requireContext(), android.R.layout.simple_spinner_item, sortOptions
        ) {
            override fun getView(position: Int, convertView: View?, parent: ViewGroup): View =
                (super.getView(position, convertView, parent) as TextView).also {
                    it.setTextColor(android.graphics.Color.BLACK)
                }
            override fun getDropDownView(position: Int, convertView: View?, parent: ViewGroup): View =
                (super.getDropDownView(position, convertView, parent) as TextView).also {
                    it.setTextColor(android.graphics.Color.BLACK)
                }
        }.also { it.setDropDownViewResource(R.layout.item_spinner_dropdown) }
        val sortIndex = listOf("default","nameAsc","nameDesc","priceAsc","priceDesc").indexOf(sortBy)
        spinnerSort.setSelection(if (sortIndex >= 0) sortIndex else 0)

        // --- SeekBar precio ---
        val seekPrice = sheetView.findViewById<SeekBar>(R.id.seekbar_price)
        val tvPrice  = sheetView.findViewById<TextView>(R.id.tv_price_value)
        seekPrice.progress = maxPrecio
        tvPrice.text = "${maxPrecio}€"
        seekPrice.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(sb: SeekBar, progress: Int, fromUser: Boolean) {
                tvPrice.text = "${progress}€"
            }
            override fun onStartTrackingTouch(sb: SeekBar) {}
            override fun onStopTrackingTouch(sb: SeekBar) {}
        })

        // --- Checkboxes categorías ---
        val containerCats = sheetView.findViewById<LinearLayout>(R.id.container_categories)
        val catChecks = mutableMapOf<Int, CheckBox>()
        categorias.forEach { cat ->
            val cb = CheckBox(requireContext()).apply {
                text = "${cat.icono}  ${cat.nombre}"
                isChecked = cat.id in selectedCatIds
                setTextColor(requireContext().getColor(android.R.color.tab_indicator_text))
                textSize = 14f
                setPadding(0, 6, 0, 6)
            }
            catChecks[cat.id] = cb
            containerCats.addView(cb)
        }

        // --- Checkboxes marcas ---
        val containerBrands = sheetView.findViewById<LinearLayout>(R.id.container_brands)
        val marcaChecks = mutableMapOf<Int, CheckBox>()
        marcas.forEach { marca ->
            val cb = CheckBox(requireContext()).apply {
                text = marca.nombre
                isChecked = marca.id in selectedMarcaIds
                setTextColor(requireContext().getColor(android.R.color.tab_indicator_text))
                textSize = 14f
                setPadding(0, 6, 0, 6)
            }
            marcaChecks[marca.id] = cb
            containerBrands.addView(cb)
        }

        // --- Limpiar filtros ---
        sheetView.findViewById<Button>(R.id.btn_clear_filters).setOnClickListener {
            catChecks.values.forEach { it.isChecked = false }
            marcaChecks.values.forEach { it.isChecked = false }
            seekPrice.progress = 2500
            spinnerSort.setSelection(0)
        }

        // --- Aplicar ---
        sheetView.findViewById<Button>(R.id.btn_apply_filters).setOnClickListener {
            selectedCatIds.clear()
            catChecks.forEach { (id, cb) -> if (cb.isChecked) selectedCatIds.add(id) }

            selectedMarcaIds.clear()
            marcaChecks.forEach { (id, cb) -> if (cb.isChecked) selectedMarcaIds.add(id) }

            maxPrecio = seekPrice.progress
            sortBy = when (spinnerSort.selectedItemPosition) {
                1 -> "nameAsc"; 2 -> "nameDesc"; 3 -> "priceAsc"; 4 -> "priceDesc"; else -> "default"
            }

            applyFilters()
            dialog.dismiss()
        }

        dialog.show()
    }

    private fun setupSortSpinner() {
        val options = listOf(
            getString(R.string.sort_default),
            getString(R.string.sort_name_asc),
            getString(R.string.sort_name_desc),
            getString(R.string.sort_price_asc),
            getString(R.string.sort_price_desc)
        )
        val spinnerAdapter = object : ArrayAdapter<String>(
            requireContext(), android.R.layout.simple_spinner_item, options
        ) {
            override fun getView(position: Int, convertView: View?, parent: ViewGroup): View =
                (super.getView(position, convertView, parent) as TextView).also {
                    it.setTextColor(android.graphics.Color.BLACK)
                }
            override fun getDropDownView(position: Int, convertView: View?, parent: ViewGroup): View =
                (super.getDropDownView(position, convertView, parent) as TextView).also {
                    it.setTextColor(android.graphics.Color.BLACK)
                }
        }
        spinnerAdapter.setDropDownViewResource(R.layout.item_spinner_dropdown)
        binding.spinnerSort.adapter = spinnerAdapter
        binding.spinnerSort.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>?, v: View?, pos: Int, id: Long) {
                sortBy = when (pos) {
                    1 -> "nameAsc"; 2 -> "nameDesc"; 3 -> "priceAsc"; 4 -> "priceDesc"; else -> "default"
                }
                applyFilters()
            }
            override fun onNothingSelected(parent: AdapterView<*>?) {}
        }
    }

    private fun setupSearch() {
        binding.etSearch.setOnEditorActionListener { _, actionId, _ ->
            if (actionId == EditorInfo.IME_ACTION_SEARCH) {
                val query = binding.etSearch.text?.toString() ?: ""
                if (query.isNotBlank()) {
                    startActivity(Intent(requireContext(), SearchActivity::class.java).apply {
                        putExtra("query", query)
                    })
                }
                true
            } else false
        }
        binding.etSearch.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                val q = s?.toString() ?: ""
                allProducts = if (q.isBlank()) db.getProductos() else db.searchProductos(q)
                applyFilters()
            }
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
