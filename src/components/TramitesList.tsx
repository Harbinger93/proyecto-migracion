import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, FileText, Globe, Users, Heart, Briefcase } from 'lucide-react';

interface Procedure {
  id: string;
  title: string;
  description: string;
  categories: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const PROCEDURES: Procedure[] = [
  {
    id: 'residencia',
    title: 'Autorización de Residencia',
    description: 'Obtén tu permiso de residencia en España de forma legal y segura.',
    categories: ['residencia'],
    icon: FileText
  },
  {
    id: 'nacionalidad',
    title: 'Nacionalidad Española',
    description: 'Consigue la nacionalidad española cumpliendo los requisitos necesarios.',
    categories: ['nacionalidad'],
    icon: Globe
  },
  {
    id: 'arraigo',
    title: 'Arraigo (Social, Laboral, Familiar)',
    description: 'Regulariza tu situación por arraigo social, laboral o familiar.',
    categories: ['arraigo', 'residencia'],
    icon: Users
  },
  {
    id: 'reagrupacion',
    title: 'Reagrupación Familiar',
    description: 'Trae a tu familia contigo a España de forma legal.',
    categories: ['familiar'],
    icon: Heart
  },
  {
    id: 'trabajo',
    title: 'Autorización de Trabajo',
    description: 'Consigue permiso para trabajar legalmente en España.',
    categories: ['trabajo'],
    icon: Briefcase
  }
];

const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'residencia', name: 'Residencia' },
  { id: 'nacionalidad', name: 'Nacionalidad' },
  { id: 'arraigo', name: 'Arraigo' },
  { id: 'familiar', name: 'Familiar' },
  { id: 'trabajo', name: 'Trabajo' }
];

export default function TramitesList() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  console.log('[TramitesList] Hydrated');

  const filteredProcedures = useMemo(() => {
    return PROCEDURES.filter(proc => {
      const matchesSearch = proc.title.toLowerCase().includes(search.toLowerCase()) || 
                            proc.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || proc.categories.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="flex flex-col gap-10">
      
      {/* Search & Filters Container */}
      <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
        
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar trámite..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border hover:border-teal-700/30 focus:border-teal-700 dark:focus:border-teal-500 rounded-xl pl-12 pr-6 py-4.5 text-sm sm:text-base outline-none transition-all shadow-xs placeholder-muted-foreground/60"
            aria-label="Buscar trámite"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer px-2 py-1 rounded-md bg-muted/50"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Categories filters */}
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-teal-750 text-white shadow-md shadow-teal-500/10' 
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

      </div>

      {/* Results Count */}
      <div className="text-center sm:text-left font-semibold text-muted-foreground text-sm max-w-5xl mx-auto w-full border-b border-border/40 pb-4">
        {filteredProcedures.length} {filteredProcedures.length === 1 ? 'trámite encontrado' : 'trámites encontrados'}
      </div>

      {/* Procedures Cards Grid */}
      {filteredProcedures.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto w-full">
          {filteredProcedures.map((proc, index) => {
            const Icon = proc.icon;
            return (
              <div
                key={proc.id}
                className="bg-card border border-border hover:border-teal-700/30 dark:hover:border-teal-500/30 rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover-premium-card animate-in fade-in-50 slide-in-from-bottom-2 duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div>
                  {/* Icon Container */}
                  <div className="h-12 w-12 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6 border border-teal-100/50 dark:border-teal-900/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-teal-950 dark:text-white mb-3">
                    {proc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {proc.description}
                  </p>
                </div>
                
                <a
                  href="/contacto"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 dark:text-teal-400 group-hover:underline mt-auto"
                >
                  Ver detalles 
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-card border border-dashed border-border rounded-2xl max-w-xl mx-auto w-full flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-teal-50 dark:bg-teal-950/20 text-teal-700 dark:text-teal-400 flex items-center justify-center text-lg">
            🔍
          </div>
          <div>
            <h4 className="font-bold text-teal-950 dark:text-white text-base">No se encontraron trámites</h4>
            <p className="text-sm text-muted-foreground mt-1 px-4">
              Prueba a buscar con otros términos o cambia la categoría de filtro.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
