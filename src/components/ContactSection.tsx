import React, { useState } from 'react';
import { Send, Check, Loader2, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import SimpleMap from './ui/SimpleMap';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = 'El nombre es obligatorio';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'El formato del email no es válido';
    }
    
    if (!formData.phone.trim()) {
      tempErrors.phone = 'El teléfono es obligatorio';
    } else if (!/^[+0-9\s-]{9,20}$/.test(formData.phone)) {
      tempErrors.phone = 'Introduce un número de teléfono válido';
    }
    
    if (!formData.type) tempErrors.type = 'Selecciona un tipo de trámite';
    if (!formData.message.trim()) tempErrors.message = 'El mensaje no puede estar vacío';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setServerError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!result.success) {
        setServerError(result.errors?.[0] || 'Error al enviar el mensaje');
        setStatus('error');
        return;
      }

      window.open(result.whatsappUrl, '_blank');
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', type: '', message: '' });
    } catch {
      setServerError('Error de conexión. Intenta de nuevo.');
      setStatus('error');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto w-full items-start">
      
      {/* Left Column: Contact details & Interactive Map */}
      <div className="lg:col-span-5 flex flex-col gap-8">
        
        <h3 className="font-bold text-xl text-teal-950 dark:text-white border-b border-border/40 pb-3">
          Información de contacto
        </h3>

        <div className="flex flex-col gap-4">
          
          {/* WhatsApp Card */}
          <div className="bg-card border border-border/80 rounded-xl p-5 flex items-start gap-4 hover:shadow-xs transition-shadow">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 flex items-center justify-center text-lg shrink-0 border border-emerald-100/30 dark:border-emerald-900/30">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">WhatsApp</span>
              <a href="https://wa.me/34600000000" target="_blank" rel="noopener noreferrer" className="font-bold text-teal-950 dark:text-white hover:text-teal-700 dark:hover:text-teal-400 text-sm sm:text-base mt-0.5">
                +34 600 000 000
              </a>
              <span className="text-xs text-muted-foreground mt-1">La forma más rápida de contactarnos</span>
            </div>
          </div>

          {/* Teléfono Card */}
          <div className="bg-card border border-border/80 rounded-xl p-5 flex items-start gap-4 hover:shadow-xs transition-shadow">
            <div className="h-10 w-10 rounded-xl bg-teal-50 dark:bg-teal-950/20 text-teal-700 dark:text-teal-400 flex items-center justify-center text-lg shrink-0 border border-teal-100/30 dark:border-teal-900/30">
              <Phone className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Teléfono</span>
              <a href="tel:+34600000000" className="font-bold text-teal-950 dark:text-white hover:text-teal-700 dark:hover:text-teal-400 text-sm sm:text-base mt-0.5">
                +34 600 000 000
              </a>
              <span className="text-xs text-muted-foreground mt-1">Lun - Vie: 9:00 - 18:00</span>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-card border border-border/80 rounded-xl p-5 flex items-start gap-4 hover:shadow-xs transition-shadow">
            <div className="h-10 w-10 rounded-xl bg-teal-50 dark:bg-teal-950/20 text-teal-700 dark:text-teal-400 flex items-center justify-center text-lg shrink-0 border border-teal-100/30 dark:border-teal-900/30">
              <Mail className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email</span>
              <a href="mailto:info@somosmigrantes.com" className="font-bold text-teal-950 dark:text-white hover:text-teal-700 dark:hover:text-teal-400 text-sm sm:text-base mt-0.5">
                info@somosmigrantes.com
              </a>
              <span className="text-xs text-muted-foreground mt-1">Respondemos en menos de 24h</span>
            </div>
          </div>

          {/* Dirección Card */}
          <div className="bg-card border border-border/80 rounded-xl p-5 flex items-start gap-4 hover:shadow-xs transition-shadow">
            <div className="h-10 w-10 rounded-xl bg-teal-50 dark:bg-teal-950/20 text-teal-700 dark:text-teal-400 flex items-center justify-center text-lg shrink-0 border border-teal-100/30 dark:border-teal-900/30">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Dirección</span>
              <span className="font-bold text-teal-950 dark:text-white text-sm sm:text-base mt-0.5">
                Calle Ejemplo 123, 28001 Madrid
              </span>
              <span className="text-xs text-muted-foreground mt-1">Cita previa requerida</span>
            </div>
          </div>

        </div>

        {/* Interactive Map Block */}
        <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-border/80 shadow-md relative">
          <SimpleMap
            center={[-3.70379, 40.416775]}
            zoom={14}
            className="w-full h-full"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-teal-500 opacity-60"></span>
              <span className="relative inline-flex rounded-xl h-[1.125rem] w-[1.125rem] bg-teal-700 border-2 border-white dark:border-teal-950 shadow-lg"></span>
            </div>
            <div className="mt-1 px-2 py-0.5 rounded-md bg-card/80 backdrop-blur-sm border border-border/60 text-xs font-semibold text-teal-700 dark:text-teal-400 shadow-xs whitespace-nowrap">
              SomosMigrantes
            </div>
          </div>
        </div>

        {/* Respond note */}
        <div className="text-center font-bold text-teal-800 dark:text-teal-400 text-sm mt-1 animate-pulse">
          👉 Respondemos en menos de 24h
        </div>

      </div>

      {/* Right Column: Message Form */}
      <div className="lg:col-span-7 bg-card border border-border/80 rounded-2xl p-6 sm:p-10 shadow-xs relative">
        
        {status === 'success' ? (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-5 animate-in zoom-in-95 duration-300">
            <div className="h-16 w-16 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 flex items-center justify-center border-2 border-emerald-500 shadow-lg shrink-0">
              <Check className="h-8 w-8" />
            </div>
            <div>
              <h4 className="text-2xl font-extrabold text-teal-950 dark:text-white">¡Mensaje enviado con éxito!</h4>
              <p className="text-sm text-muted-foreground mt-2 px-6 max-w-md">
                Gracias por ponerte en contacto con nosotros. Analizaremos tu situación y te responderemos en un plazo máximo de 24 horas.
              </p>
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 inline-flex items-center gap-2 border-2 border-teal-700 dark:border-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/20 text-teal-800 dark:text-teal-400 font-bold px-6 py-2.5 rounded-xl text-sm cursor-pointer"
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            <h3 className="font-bold text-xl text-teal-950 dark:text-white border-b border-border/40 pb-3">
              Envíanos un mensaje
            </h3>

            {/* Nombre completo */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-bold text-teal-950 dark:text-white">
                Nombre completo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-card border ${errors.name ? 'border-destructive' : 'border-border'} focus:border-teal-700 dark:focus:border-teal-500 rounded-lg px-4 py-3 text-sm sm:text-base outline-none transition-all`}
                disabled={status === 'loading'}
              />
              {errors.name && <span className="text-xs font-bold text-destructive">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-bold text-teal-950 dark:text-white">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-card border ${errors.email ? 'border-destructive' : 'border-border'} focus:border-teal-700 dark:focus:border-teal-500 rounded-lg px-4 py-3 text-sm sm:text-base outline-none transition-all`}
                disabled={status === 'loading'}
              />
              {errors.email && <span className="text-xs font-bold text-destructive">{errors.email}</span>}
            </div>

            {/* Teléfono */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-sm font-bold text-teal-950 dark:text-white">
                Teléfono *
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="+34 600 000 000"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full bg-card border ${errors.phone ? 'border-destructive' : 'border-border'} focus:border-teal-700 dark:focus:border-teal-500 rounded-lg px-4 py-3 text-sm sm:text-base outline-none transition-all`}
                disabled={status === 'loading'}
              />
              {errors.phone && <span className="text-xs font-bold text-destructive">{errors.phone}</span>}
            </div>

            {/* Tipo de trámite */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="type" className="text-sm font-bold text-teal-950 dark:text-white">
                Tipo de trámite *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full bg-card border ${errors.type ? 'border-destructive' : 'border-border'} focus:border-teal-700 dark:focus:border-teal-500 rounded-lg px-4 py-3 text-sm sm:text-base outline-none transition-all appearance-none cursor-pointer`}
                disabled={status === 'loading'}
              >
                <option value="">Selecciona un trámite</option>
                <option value="residencia">Autorización de Residencia</option>
                <option value="nacionalidad">Nacionalidad Española</option>
                <option value="arraigo">Arraigo (Social, Laboral, Familiar)</option>
                <option value="reagrupacion">Reagrupación Familiar</option>
                <option value="trabajo">Autorización de Trabajo</option>
              </select>
              {errors.type && <span className="text-xs font-bold text-destructive">{errors.type}</span>}
            </div>

            {/* Mensaje */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-bold text-teal-950 dark:text-white">
                Mensaje *
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Cuéntanos tu situación..."
                value={formData.message}
                onChange={handleChange}
                className={`w-full bg-card border ${errors.message ? 'border-destructive' : 'border-border'} focus:border-teal-700 dark:focus:border-teal-500 rounded-lg px-4 py-3 text-sm sm:text-base outline-none transition-all resize-y`}
                disabled={status === 'loading'}
              ></textarea>
              {errors.message && <span className="text-xs font-bold text-destructive">{errors.message}</span>}
            </div>

            {/* Server Error Display */}
            {serverError && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3 text-sm font-semibold text-destructive">
                {serverError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-500/10 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Enviando mensaje...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Enviar mensaje</span>
                </>
              )}
            </button>

            {/* Bottom Disclaimer */}
            <p className="text-center text-xs text-muted-foreground leading-relaxed mt-2">
              Al enviar este formulario, aceptas nuestra <a href="#" className="underline hover:text-foreground">política de privacidad</a>.
            </p>

          </form>
        )}

      </div>

    </div>
  );
}
