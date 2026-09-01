import { useState } from 'react'

function CartaPage() {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [especificaciones, setEspecificaciones] = useState([])

  return (
    <div className="min-h-screen bg-bg-page">
      
      {/* Header */}
      <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Carta del menú</h1>
          <p className="text-sm text-gray-500">Gestiona los platillos y categorías de tu restaurante.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            + Categoría
          </button>
          <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            + Especificaciones
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover">
            + Nuevo producto
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="px-8 py-6">
        {productos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <span className="text-6xl mb-4">🍽️</span>
            <p className="text-lg font-medium">No hay productos aún</p>
            <p className="text-sm">Comienza agregando una categoría y luego un producto</p>
          </div>
        ) : (
          <p>Aquí irá la tabla de productos</p>
        )}
      </div>

    </div>
  )
}

export default CartaPage