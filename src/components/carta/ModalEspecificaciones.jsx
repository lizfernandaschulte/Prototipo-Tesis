import { useState } from 'react'

function ModalEspecificaciones({ onClose, especificaciones, onGuardar }) {
  const [nueva, setNueva] = useState('')

  function handleAgregar() {
    if (!nueva.trim()) {
      alert('Por favor escribe una especificación')
      return
    }
    if (especificaciones.find(e => e.nombre.toLowerCase() === nueva.toLowerCase())) {
      alert('Esa especificación ya existe')
      return
    }
    onGuardar({ id: Date.now(), nombre: nueva.trim() })
    setNueva('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAgregar()
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Especificaciones</h2>
            <p className="text-xs text-gray-400">Agrega opciones como: Sin huevo, Sin picante...</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        {/* Input para agregar */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Ej. Sin cebolla, Sin gluten..."
            value={nueva}
            onChange={(e) => setNueva(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-2 border border-border-input rounded-lg text-sm text-gray-700 focus:outline-none focus:border-primary"
          />
          <button
            onClick={handleAgregar}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover"
          >
            + Agregar
          </button>
        </div>

        {/* Lista de especificaciones */}
        <div className="max-h-48 overflow-y-auto mb-6">
          {especificaciones.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              No hay especificaciones aún
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {especificaciones.map(esp => (
                <span
                  key={esp.id}
                  className="flex items-center gap-1 px-3 py-1 bg-primary-light text-primary text-sm rounded-full"
                >
                  {esp.nombre}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="w-full py-2 border border-border-input rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          Listo
        </button>

      </div>
    </div>
  )
}

export default ModalEspecificaciones