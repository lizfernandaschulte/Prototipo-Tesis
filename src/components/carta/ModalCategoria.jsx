import { useState } from 'react'

function ModalCategoria({ onClose, onGuardar }) {
  const [nombre, setNombre] = useState('')
  const [turno, setTurno] = useState('mañana')

  function handleGuardar() {
    if (!nombre.trim()) {
      alert('Por favor escribe el nombre de la categoría')
      return
    }
    onGuardar({ nombre, turno })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Nueva Categoría</h2>
            <p className="text-xs text-gray-400">Agrega una categoría al menú</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de la categoría
          </label>
          <input
            type="text"
            placeholder="Ej. Desayunos, Ensaladas..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border border-border-input rounded-lg text-sm text-gray-700 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Turno
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setTurno('mañana')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                turno === 'mañana'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 border-border-input hover:border-primary'
              }`}
            >
              Mañana
            </button>
            <button
              onClick={() => setTurno('tarde')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                turno === 'tarde'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 border-border-input hover:border-primary'
              }`}
            >
              Tarde
            </button>
          </div>
        </div>

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
            Guardar categoría
          </button>
        </div>

      </div>
    </div>
  )
}

export default ModalCategoria