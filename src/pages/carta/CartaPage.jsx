import { useState } from 'react'
import ModalCategoria from '../../components/carta/ModalCategoria'
import ModalEspecificaciones from '../../components/carta/ModalEspecificaciones'
import ModalProducto from '../../components/carta/ModalProducto'

function CartaPage() {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [especificaciones, setEspecificaciones] = useState([])
  const [modalCategoria, setModalCategoria] = useState(false)
  const [modalEspecificaciones, setModalEspecificaciones] = useState(false)
  const [modalProducto, setModalProducto] = useState(false)
  const [productoEditar, setProductoEditar] = useState(null)

  function handleGuardarCategoria(nuevaCategoria) {
    setCategorias([...categorias, { id: Date.now(), ...nuevaCategoria }])
  }

  function handleGuardarEspecificacion(nuevaEsp) {
    setEspecificaciones([...especificaciones, nuevaEsp])
  }

  function handleGuardarProducto(nuevoProducto) {
    setProductos([...productos, nuevoProducto])
  }

  function handleEditarProducto(productoActualizado) {
    setProductos(productos.map(p =>
      p.id === productoActualizado.id ? productoActualizado : p
    ))
  }

  return (
    <div className="min-h-screen bg-bg-page">

      {/* Header */}
      <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Carta del menú</h1>
          <p className="text-sm text-gray-500">Gestiona los platillos y categorías de tu restaurante.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setModalCategoria(true)}
            className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            + Categoría
          </button>
          <button
            onClick={() => setModalEspecificaciones(true)}
            className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            + Especificaciones
          </button>
          <button
            onClick={() => {
              setProductoEditar(null)
              setModalProducto(true)
            }}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover"
          >
            + Nuevo producto
          </button>
        </div>
      </div>

      {/* Contenido — Tabla de productos */}
      <div className="px-8 py-6">
        {productos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <span className="text-6xl mb-4">🍽️</span>
            <p className="text-lg font-medium">No hay productos aún</p>
            <p className="text-sm">Comienza agregando una categoría y luego un producto</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Nombre</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Categoría</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Costo unitario</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Costo de venta</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Insumos</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Especificaciones</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Estado</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod, index) => {
                  const categoria = categorias.find(c => c.id === parseInt(prod.categoriaId))
                  return (
                    <tr key={prod.id} className={`border-b border-border ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="px-6 py-4 font-medium text-gray-800">{prod.nombre}</td>
                      <td className="px-6 py-4 text-gray-600">{categoria ? `${categoria.nombre} (${categoria.turno})` : '—'}</td>
                      <td className="px-6 py-4 text-gray-600">${prod.costoUnitario || '—'}</td>
                      <td className="px-6 py-4 text-gray-600">${prod.costoVenta}</td>
                      <td className="px-6 py-4 text-gray-600">{prod.insumos || '—'}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {prod.especificaciones.length === 0 ? (
                            <span className="text-gray-400">—</span>
                          ) : (
                            prod.especificaciones.map(esp => (
                              <span key={esp.id} className="px-2 py-0.5 bg-primary-light text-primary text-xs rounded-full">
                                {esp.nombre}
                              </span>
                            ))
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${prod.activo ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                          {prod.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setProductoEditar(prod)
                              setModalProducto(true)
                            }}
                            className="text-primary hover:text-primary-hover"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                          </button>
                          <button
                            onClick={() => setProductos(productos.filter(p => p.id !== prod.id))}
                            className="text-red-400 hover:text-red-600"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                              <path d="M10 11v6M14 11v6"/>
                              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modales */}
      {modalCategoria && (
        <ModalCategoria
          onClose={() => setModalCategoria(false)}
          onGuardar={handleGuardarCategoria}
        />
      )}
      {modalEspecificaciones && (
        <ModalEspecificaciones
          onClose={() => setModalEspecificaciones(false)}
          especificaciones={especificaciones}
          onGuardar={handleGuardarEspecificacion}
        />
      )}
      {modalProducto && (
        <ModalProducto
          onClose={() => {
            setModalProducto(false)
            setProductoEditar(null)
          }}
          onGuardar={productoEditar ? handleEditarProducto : handleGuardarProducto}
          categorias={categorias}
          especificaciones={especificaciones}
          productoEditar={productoEditar}
        />
      )}

    </div>
  )
}

export default CartaPage