import { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useLang } from '../context/LanguageContext';
import t from '../translations';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const TrialForm = ({ isOpen, onClose, selectedPack }) => {
  const { lang } = useLang();
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);
    try {
      await axios.post(`${API}/trial`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '' });
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose} data-testid="trial-modal">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <div className="relative bg-[#0a0a0a] border border-white/10 max-w-lg w-full p-8 md:p-12 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors text-2xl" data-testid="trial-close-button">&times;</button>

        {status === 'success' ? (
          <div className="text-center py-8" data-testid="trial-success">
            <CheckCircle className="text-[#FFD700] mx-auto mb-6" size={64} />
            <h3 className="font-black text-2xl mb-4">{t.trial.successTitle[lang]}</h3>
            <p className="font-light text-neutral-400 mb-6">
              {t.trial.successMsg[lang]}
              {selectedPack && ` ${t.trial.packSelected[lang]} ${selectedPack.name}.`}
            </p>
            <button onClick={onClose} className="btn-primary">{t.trial.successClose[lang]}</button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <span className="font-bold text-xs tracking-[0.2em] uppercase text-[#FFD700] mb-4 block">{t.trial.label[lang]}</span>
              <h3 className="font-black text-3xl tracking-tight mb-2">{t.trial.title[lang]}</h3>
              <p className="font-light text-neutral-400">
                {t.trial.subtitle[lang]}
                {selectedPack && <span className="block text-[#FFD700] mt-2 font-mono text-sm">{t.trial.packSelected[lang]} {selectedPack.name}</span>}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="trial-form">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t.trial.nameInput[lang]} required className="input-minimal" data-testid="trial-input-name" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t.trial.emailInput[lang]} required className="input-minimal" data-testid="trial-input-email" />
              <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder={t.trial.companyInput[lang]} required className="input-minimal" data-testid="trial-input-company" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t.trial.phoneInput[lang]} required className="input-minimal" data-testid="trial-input-phone" />
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500" data-testid="trial-error">
                  <AlertCircle size={16} /><span className="text-sm">{t.trial.errorMsg[lang]}</span>
                </div>
              )}
              <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2" data-testid="trial-submit-button">
                {isLoading ? (<><Loader2 className="animate-spin" size={18} />{t.trial.sending[lang]}</>) : t.trial.submit[lang]}
              </button>
            </form>
            <p className="text-center text-neutral-600 text-xs mt-6">{t.trial.footnote[lang]}</p>
          </>
        )}
      </div>
    </div>
  );
};
