import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  categories: string[];
}

const FAQS: FaqItem[] = [
  {
    id: 1,
    question: '¿Cuánto tiempo tarda un trámite de residencia?',
    answer: 'El tiempo varía según el tipo de residencia, pero generalmente oscila entre 3 y 6 meses desde la presentación de la solicitud hasta la resolución. En algunos casos puede ser más rápido o más lento dependiendo de la carga de trabajo de la oficina de extranjería.',
    categories: ['residencia']
  },
  {
    id: 2,
    question: '¿Puedo trabajar mientras espero la resolución?',
    answer: 'Depende del tipo de solicitud. Si presentas una renovación de residencia y trabajo antes de que caduque, puedes seguir trabajando. Si es una primera solicitud, normalmente debes esperar a tener la autorización aprobada.',
    categories: ['trabajo', 'residencia']
  },
  {
    id: 3,
    question: '¿Qué documento necesito para el arraigo social?',
    answer: 'Necesitas: informe de arraigo social del ayuntamiento, certificado de empadronamiento histórico (3 años), contrato de trabajo o plan de negocio, certificado de antecedentes penales, y documentación que acredite vínculos familiares o integración social en España.',
    categories: ['residencia', 'general']
  },
  {
    id: 4,
    question: '¿Cuánto cuestan los trámites de extranjería?',
    answer: 'Los costos varían según el tipo de trámite. Las tasas oficiales van desde 10€ hasta 200€ aproximadamente. Nuestros honorarios profesionales empiezan desde 500€ dependiendo de la complejidad del caso. Te ofrecemos un presupuesto personalizado sin compromiso.',
    categories: ['general']
  },
  {
    id: 5,
    question: '¿Puedo solicitar la nacionalidad española?',
    answer: 'Puedes solicitarla si has residido legalmente en España durante 10 años de forma continuada (puede reducirse a 2 años para ciudadanos de países iberoamericanos, Andorra, Filipinas, Guinea Ecuatorial o Portugal, y a 1 año en casos especiales). También debes aprobar los exámenes CCSE y DELE A2.',
    categories: ['nacionalidad']
  },
  {
    id: 6,
    question: '¿Qué pasa si me deniegan la solicitud?',
    answer: 'Si tu solicitud es denegada, tienes derecho a presentar un recurso de reposición en el plazo de un mes desde la notificación. Analizaremos las causas de la denegación y te asesoraremos sobre la mejor estrategia: recurrir la decisión o preparar una nueva solicitud corrigiendo los errores.',
    categories: ['general']
  },
  {
    id: 7,
    question: '¿Necesito abogado para hacer los trámites?',
    answer: 'No es obligatorio, pero es muy recomendable contar con asesoramiento profesional. Los trámites de extranjería son complejos y cualquier error puede causar retrasos o denegaciones. Nosotros nos encargamos de todo para que no tengas que preocuparte.',
    categories: ['general']
  },
  {
    id: 8,
    question: '¿Puedo traer a mi familia a España?',
    answer: 'Sí, a través de la reagrupación familiar. Necesitas tener residencia legal en España por al menos 1 año, demostrar medios económicos suficientes, y disponer de una vivienda adecuada. Puedes reagrupar a tu cónyuge, hijos menores, y padres mayores a tu cargo.',
    categories: ['residencia', 'general']
  },
  {
    id: 9,
    question: '¿Qué es el arraigo y quien puede solicitarlo?',
    answer: 'El arraigo es un procedimiento excepcional para regularizar tu situación. Existen tres tipos: arraigo social (3 años en España + vínculos), arraigo laboral (2 años + relación laboral de 6 meses), y arraigo familiar (familiar español o residente). Cada uno tiene requisitos específicos.',
    categories: ['residencia']
  },
  {
    id: 10,
    question: '¿Ofrecen consultas gratuitas?',
    answer: 'Sí, ofrecemos una primera consulta gratuita donde evaluamos tu caso, te explicamos las opciones disponibles y te damos un presupuesto personalizado. Puedes contactarnos por WhatsApp, teléfono o rellenando el formulario de contacto.',
    categories: ['general']
  },
  {
    id: 11,
    question: '¿Cuánto tiempo puedo estar fuera de España sin perder mi residencia?',
    answer: 'Con residencia temporal, puedes estar fuera un máximo de 6 meses en un año (o ausencias que no superen 6 meses continuos). Con residencia de larga duración, puedes ausentarte hasta 12 meses consecutivos (o 6 años acumulados en 10 años).',
    categories: ['residencia']
  },
  {
    id: 12,
    question: '¿Puedo viajar a otros países de Europa con mi residencia española?',
    answer: 'Con residencia española puedes viajar al espacio Schengen (26 países europeos) como turista hasta 90 días cada 180 días. Para residir o trabajar en otro país europeo necesitarías solicitar los permisos correspondientes de ese país.',
    categories: ['residencia']
  }
];

const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'general', name: 'General' },
  { id: 'residencia', name: 'Residencia' },
  { id: 'nacionalidad', name: 'Nacionalidad' },
  { id: 'trabajo', name: 'Trabajo' }
];

export default function FaqList() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleOpen = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = useMemo(() => {
    return FAQS.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(search.toLowerCase()) || 
                            faq.answer.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || faq.categories.includes(selectedCategory);
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
            placeholder="Buscar pregunta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border hover:border-teal-700/30 focus:border-teal-700 dark:focus:border-teal-500 rounded-xl pl-12 pr-6 py-4.5 text-sm sm:text-base outline-none transition-all shadow-xs placeholder-muted-foreground/60"
            aria-label="Buscar pregunta"
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
      <div className="text-center sm:text-left font-semibold text-muted-foreground text-sm max-w-3xl mx-auto w-full border-b border-border/40 pb-4">
        {filteredFaqs.length} {filteredFaqs.length === 1 ? 'pregunta encontrada' : 'preguntas encontradas'}
      </div>

      {/* FAQ Accordions Stack */}
      {filteredFaqs.length > 0 ? (
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-card border border-border hover:border-teal-700/20 dark:hover:border-teal-500/20 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-2 duration-300"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <button
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full flex items-center justify-between text-left font-bold text-teal-950 dark:text-white px-6 py-5 text-sm sm:text-base cursor-pointer select-none outline-none focus-visible:bg-muted/30"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className="text-teal-700 dark:text-teal-400 font-bold shrink-0 ml-4">
                    {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </span>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-border/30 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
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
            <h4 className="font-bold text-teal-950 dark:text-white text-base">No se encontraron preguntas</h4>
            <p className="text-sm text-muted-foreground mt-1 px-4">
              Prueba a buscar con otras palabras clave o cambia la categoría de filtro.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
