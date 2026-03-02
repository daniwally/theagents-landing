import { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const TrialForm = ({ isOpen, onClose, selectedPack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      await axios.post(`${API}/trial`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '' });
    } catch (error) {
      console.error('Trial submission error:', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      data-testid="trial-modal"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      
      <div 
        className="relative bg-[#0a0a0a] border border-white/10 max-w-lg w-full p-8 md:p-12 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors text-2xl"
          data-testid="trial-close-button"
        >
          ×
        </button>

        {status === 'success' ? (
          <div className="text-center py-8" data-testid="trial-success">
            <CheckCircle className="text-[#FFD700] mx-auto mb-6" size={64} />
            <h3 className="font-black text-2xl mb-4">¡Listo!</h3>
            <p className="font-light text-neutral-400 mb-6">
              Te contactamos en las próximas 24hs para activar tu trial.
              {selectedPack && ` Elegiste el ${selectedPack.name}.`}
            </p>
            <button 
              onClick={onClose}
              className="btn-primary"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8">
              <span className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700] mb-4 block">
                Trial gratuito 7 días
              </span>
              <h3 className="font-black text-3xl tracking-tight mb-2">
                Empezá ahora
              </h3>
              <p className="font-light text-neutral-400">
                Completá tus datos y te contactamos para activar tu equipo de agentes.
                {selectedPack && (
                  <span className="block text-[#FFD700] mt-2 font-mono text-sm">
                    Pack seleccionado: {selectedPack.name}
                  </span>
                )}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="trial-form">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre completo"
                  required
                  className="input-minimal"
                  data-testid="trial-input-name"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email de trabajo"
                  required
                  className="input-minimal"
                  data-testid="trial-input-email"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Empresa"
                  required
                  className="input-minimal"
                  data-testid="trial-input-company"
                />
              </div>
              
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Teléfono"
                  required
                  className="input-minimal"
                  data-testid="trial-input-phone"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500" data-testid="trial-error">
                  <AlertCircle size={16} />
                  <span className="text-sm">Hubo un error. Intentá de nuevo.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center gap-2"
                data-testid="trial-submit-button"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Enviando...
                  </>
                ) : (
                  'Activar trial gratuito'
                )}
              </button>
            </form>

            {/* Footer note */}
            <p className="text-center text-neutral-600 text-xs mt-6">
              Sin tarjeta de crédito. Sin compromiso. Sin letra chica.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
