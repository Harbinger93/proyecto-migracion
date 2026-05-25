import React, { useState, useMemo } from 'react';

interface Testimonial {
  id: number;
  name: string;
  country: string;
  procedure: string;
  stars: number;
  text: string;
  category: string; // matches filter id
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'María González',
    country: 'Venezuela',
    procedure: 'Arraigo Social',
    stars: 5,
    text: '“Excelente servicio. Me ayudaron con todo el proceso de arraigo social y siempre estuvieron disponibles para resolver mis dudas. ¡100% recomendado!”',
    category: 'arraigo-social',
    initials: 'MG'
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    country: 'Colombia',
    procedure: 'Residencia',
    stars: 5,
    text: '“Muy profesionales y cercanos. Gracias a su ayuda conseguí mi residencia en tiempo récord. El trato fue excepcional desde el primer día.”',
    category: 'residencia',
    initials: 'CM'
  },
  {
    id: 3,
    name: 'Ana Silva',
    country: 'Brasil',
    procedure: 'Reagrupación Familiar',
    stars: 5,
    text: '“Finalmente pude traer a mi familia a España. El equipo fue muy paciente y me explicó cada paso del proceso. Estoy muy agradecida.”',
    category: 'reagrupacion-familiar',
    initials: 'AS'
  },
  {
    id: 4,
    name: 'Jorge Ramírez',
    country: 'Perú',
    procedure: 'Nacionalidad',
    stars: 5,
    text: '“Conseguí la nacionalidad española gracias a su asesoramiento. Me prepararon perfectamente para los exámenes y tramitaron todo correctamente.”',
    category: 'nacionalidad',
    initials: 'JR'
  },
  {
    id: 5,
    name: 'Lucía Fernández',
    country: 'Argentina',
    procedure: 'Arraigo Laboral',
    stars: 5,
    text: '“Servicio rápido y eficiente. Me resolvieron todas las dudas y el proceso fue mucho más sencillo de lo que imaginaba. Totalmente recomendable.”',
    category: 'arraigo-laboral',
    initials: 'LF'
  },
  {
    id: 6,
    name: 'Pedro Sánchez',
    country: 'Ecuador',
    procedure: 'Residencia',
    stars: 5,
    text: '“Trato humano y profesional. Siempre me sentí acompañado durante todo el proceso. Gracias por hacer mi sueño realidad.”',
    category: 'residencia',
    initials: 'PS'
  }
];

const FILTERS = [
  { id: 'all', name: 'Todos' },
  { id: 'arraigo-social', name: 'Arraigo Social' },
  { id: 'residencia', name: 'Residencia' },
  { id: 'reagrupacion-familiar', name: 'Reagrupación Familiar' },
  { id: 'nacionalidad', name: 'Nacionalidad' },
  { id: 'arraigo-laboral', name: 'Arraigo Laboral' }
];

export default function TestimonialList() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredTestimonials = useMemo(() => {
    return selectedFilter === 'all' 
      ? TESTIMONIALS 
      : TESTIMONIALS.filter(t => t.category === selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="flex flex-col gap-16">
      
      {/* Stats Summary Row (Premium Design) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto w-full text-center border-y border-border/40 py-10">
        <div className="flex flex-col gap-1 shrink-0">
          <span className="text-4xl sm:text-5xl font-black text-teal-850 dark:text-teal-400 leading-none">
            +500
          </span>
          <span className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">
            Clientes satisfechos
          </span>
        </div>
        <div className="flex flex-col gap-1 shrink-0 border-y sm:border-y-0 sm:border-x border-border/30 py-6 sm:py-0">
          <span className="text-4xl sm:text-5xl font-black text-teal-850 dark:text-teal-400 leading-none">
            98%
          </span>
          <span className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">
            Tasa de éxito
          </span>
        </div>
        <div className="flex flex-col gap-1 shrink-0">
          <span className="text-4xl sm:text-5xl font-black text-teal-850 dark:text-teal-400 leading-none">
            10+
          </span>
          <span className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">
            Años de experiencia
          </span>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col gap-4 items-center">
        <span className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider">
          Filtrar por tipo de trámite
        </span>
        <div className="flex flex-wrap gap-2 justify-center max-w-3xl">
          {FILTERS.map(f => {
            const isSelected = selectedFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-teal-750 text-white shadow-md shadow-teal-500/10' 
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              >
                {f.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Testimonials grid with dynamic items */}
      {filteredTestimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
          {filteredTestimonials.map((item, index) => (
            <div
              key={item.id}
              className="bg-card border border-border hover:border-teal-700/20 dark:hover:border-teal-500/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-2 duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-0.5 text-amber-500 mb-4 text-base">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                {/* Review Text */}
                <p className="text-sm sm:text-base text-teal-950 dark:text-teal-100 italic leading-relaxed mb-8">
                  {item.text}
                </p>
              </div>
              
              {/* Reviewer Info */}
              <div className="flex items-center gap-3 border-t border-border/60 pt-4 mt-auto">
                <div className="h-10 w-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold text-sm shrink-0 border border-teal-100/30 dark:border-teal-900/30">
                  {item.initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-teal-950 dark:text-white leading-tight">
                    {item.name}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {item.country} • {item.procedure}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card border border-dashed border-border rounded-2xl max-w-xl mx-auto w-full flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-teal-50 dark:bg-teal-950/20 text-teal-700 dark:text-teal-400 flex items-center justify-center text-lg">
            💬
          </div>
          <div>
            <h4 className="font-bold text-teal-950 dark:text-white text-base">No hay testimonios en esta categoría</h4>
            <p className="text-sm text-muted-foreground mt-1 px-4">
              Prueba a filtrar por otra categoría para leer testimonios reales.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
