import { useState, useEffect } from 'react'

function ModalProducto({ onClose, onGuardar, categorias, especificaciones, productoEditar }) {
  const [nombre, setNombre] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [costoUnitario, setCostoUnitario] = useState('')
  const [costoVenta, setCostoVenta] = useState('')
  const [insumos, setInsumos] = useState('')
  const [especificacionesSeleccionadas, setEspecificacionesSeleccionadas] = useState([])
  const [activo, setActivo] = useState(true)
  const [foto, setFoto] = useState(null)
  const [fotoPreview, setFotoPreview] = useState(null)
  const [descripcion, setDescripcion] = useState('')

  useEffect(() => {
    if (productoEditar) {
      setNombre(productoEditar.nombre)
      setCategoriaId(productoEditar.categoriaId)
      setCostoUnitario(productoEditar.costoUnitario)
      setCostoVenta(productoEditar.costoVenta)
      setInsumos(productoEditar.insumos)
      setEspecificacionesSeleccionadas(productoEditar.especificaciones)
      setActivo(productoEditar.activo)
      setFotoPreview(productoEditar.foto)
      setDescripcion(productoEditar.descripcion)
    }
  }, [productoEditar])

  function handleFoto(e) {
    const archivo = e.target.files[0]
    if (archivo) {
      setFoto(archivo)
      setFotoPreview(URL.createObjectURL(archivo))
    }
  }

  function toggleEspecificacion(esp) {
    if (especificacionesSeleccionadas.find(e => e.id === esp.id)) {
      setEspecificacionesSeleccionadas(especificacionesSeleccionadas.filter(e => e.id !== esp.id))
    } else {
      setEspecificacionesSeleccionadas([...especificacionesSeleccionadas, esp])
    }
  }

  function handleGuardar() {
    if (!nombre.trim()) {
      alert('El nombre es obligatorio')
      return
    }
    if (!categoriaId) {
      alert('Selecciona una categoría')
      return
    }
    if (!costoVenta) {
      alert('El costo de venta es obligatorio')
      return
    }
    onGuardar({
      id: productoEditar ? productoEditar.id : Date.now(),
      nombre,
      categoriaId,
      costoUnitario,
      costoVenta,
      insumos,
      especificaciones: especificacionesSeleccionadas,
      activo,
      foto: fotoPreview,
      descripcion,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              {productoEditar ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <p className="text-xs text-gray-400">
              {productoEditar ? 'Modifica los datos del platillo' : 'Agrega un platillo al menú'}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        {/* Foto */}
        <div className="mb-4 flex flex-col items-center">
          <div
            className="w-24 h-24 rounded-xl border-2 border-dashed border-border-input flex items-center justify-center overflow-hidden mb-2 cursor-pointer hover:border-primary"
            onClick={() => document.getElementById('inputFoto').click()}
          >
            {fotoPreview ? (
              <img src={fotoPreview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <span className="text-2xl">📷</span>
                <span className="text-xs mt-1">Subir foto</span>
              </div>
            )}
          </div>
          <input id="inputFoto" type="file" accept="image/*" className="hidden" onChange={handleFoto} />
        </div>

        {/* Nombre */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del producto</label>
          <input
            type="text"
            placeholder="Ej. Tacos de bistec..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border border-border-input rounded-lg text-sm text-gray-700 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Categoría */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="w-full px-4 py-2 border border-border-input rounded-lg text-sm text-gray-700 focus:outline-none focus:border-primary"
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre} — {cat.turno}
              </option>
            ))}
          </select>
        </div>

        {/* Costos */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Costo unitario</label>
            <input
              type="number"
              placeholder="$ 0.00"
              value={costoUnitario}
              onChange={(e) => setCostoUnitario(e.target.value)}
              className="w-full px-4 py-2 border border-border-input rounded-lg text-sm text-gray-700 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Costo de venta</label>
            <input
              type="number"
              placeholder="$ 0.00"
              value={costoVenta}
              onChange={(e) => setCostoVenta(e.target.value)}
              className="w-full px-4 py-2 border border-border-input rounded-lg text-sm text-gray-700 focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Insumos */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Insumos</label>
          <input
            type="text"
            placeholder="Ej. Tortilla, carne, cebolla..."
            value={insumos}
            onChange={(e) => setInsumos(e.target.value)}
            className="w-full px-4 py-2 border border-border-input rounded-lg text-sm text-gray-700 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            placeholder="Describe el platillo..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-border-input rounded-lg text-sm text-gray-700 focus:outline-none focus:border-primary resize-none"
          />
        </div>

        {/* Especificaciones */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Especificaciones</label>
          {especificaciones.length === 0 ? (
            <p className="text-xs text-gray-400">No hay especificaciones. Agrégalas primero.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {especificaciones.map(esp => (
                <button
                  key={esp.id}
                  onClick={() => toggleEspecificacion(esp)}
                  className={`px-3 py-1 rounded-full text-sm border transition-all ${
                    especificacionesSeleccionadas.find(e => e.id === esp.id)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-600 border-border-input hover:border-primary'
                  }`}
                >
                  {esp.nombre}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Activo */}
        <div className="mb-6 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Producto activo</label>
          <button
            onClick={() => setActivo(!activo)}
            className={`w-12 h-6 rounded-full transition-all ${activo ? 'bg-primary' : 'bg-gray-300'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow transition-all mx-0.5 ${activo ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-border-input rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="flex-1 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover"
          >
            {productoEditar ? 'Guardar cambios' : 'Guardar producto'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default ModalProducto