import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Sparkles, Send, Check, ShieldCheck, Zap, Layers, 
  Smartphone, Database, QrCode, CreditCard, LayoutDashboard,
  Globe, CalendarClock, RefreshCw, Bot, FileSpreadsheet,
  Building2, Receipt, Users, BellRing, Laptop, GitFork
} from 'lucide-react';

const projectTypes = [
  { id: 'gestion_erp', label: 'Software de Gestión / ERP a Medida', icon: <Database className="w-5 h-5" />, desc: 'Cajas, stock, ventas, clientes, compras y balances' },
  { id: 'web_landing', label: 'Desarrollo Web & Landing Page', icon: <Globe className="w-5 h-5" />, desc: 'Sitio web moderno, institucional y orientado a ventas' },
  { id: 'webapp_saas', label: 'Web App / Plataforma SaaS', icon: <LayoutDashboard className="w-5 h-5" />, desc: 'Sistema cloud con login, paneles de control y métricas' },
  { id: 'app_mobile', label: 'Aplicación Móvil / PWA', icon: <Smartphone className="w-5 h-5" />, desc: 'App para celulares y tablets (Android / iOS) sin intermediarios' },
  { id: 'ecommerce', label: 'E-Commerce / Tienda Online', icon: <CreditCard className="w-5 h-5" />, desc: 'Venta de productos, cobros automáticos y envíos' },
  { id: 'turnos_reservas', label: 'Sistema de Turnos & Reservas', icon: <CalendarClock className="w-5 h-5" />, desc: 'Agendas en vivo, selección de canchas/butacas y señas' },
  { id: 'acceso_qr', label: 'Control de Acceso / Check-in QR', icon: <QrCode className="w-5 h-5" />, desc: 'Validación en tiempo real de socios, molinetes y hardware' },
  { id: 'excel_cloud', label: 'Migración de Excel a la Nube', icon: <FileSpreadsheet className="w-5 h-5" />, desc: 'Transformar planillas desordenadas en un software seguro' },
  { id: 'automatizacion_bot', label: 'Automatización & WhatsApp Bots', icon: <Bot className="w-5 h-5" />, desc: 'Integración de APIs, respuestas automáticas y avisos' },
  { id: 'personalizado', label: 'Desarrollo a Medida (Otro Rubro)', icon: <Layers className="w-5 h-5" />, desc: 'Cualquier sistema específico para tu empresa o industria' }
];

const featureOptions = [
  { id: 'caja_arqueo', label: 'Control de Caja & Arqueo Diario', icon: <Receipt className="w-4 h-4 shrink-0 text-[#00E5FF]" /> },
  { id: 'facturacion_afip', label: 'Facturación Electrónica / AFIP', icon: <Receipt className="w-4 h-4 shrink-0 text-[#00E5FF]" /> },
  { id: 'pagos_online', label: 'Cobro Online (MercadoPago / Stripe)', icon: <CreditCard className="w-4 h-4 shrink-0 text-[#00E5FF]" /> },
  { id: 'checkin_qr', label: 'Check-in QR & Control de Acceso', icon: <QrCode className="w-4 h-4 shrink-0 text-[#00E5FF]" /> },
  { id: 'stock_alertas', label: 'Gestión de Stock & Alertas', icon: <Database className="w-4 h-4 shrink-0 text-[#00E5FF]" /> },
  { id: 'padron_clientes', label: 'Padrón de Clientes / Socios', icon: <Users className="w-4 h-4 shrink-0 text-[#00E5FF]" /> },
  { id: 'notificaciones_wsp', label: 'Notificaciones WhatsApp / Email', icon: <BellRing className="w-4 h-4 shrink-0 text-[#00E5FF]" /> },
  { id: 'metricas_reportes', label: 'Reportes & Métricas en Vivo', icon: <LayoutDashboard className="w-4 h-4 shrink-0 text-[#00E5FF]" /> },
  { id: 'roles_permisos', label: 'Roles y Permisos de Usuarios', icon: <ShieldCheck className="w-4 h-4 shrink-0 text-[#00E5FF]" /> },
  { id: 'adaptable_mobile', label: '100% Adaptable a Celular y Tablet', icon: <Smartphone className="w-4 h-4 shrink-0 text-[#00E5FF]" /> },
  { id: 'multi_sucursal', label: 'Multi-sucursal / Multi-caja', icon: <Building2 className="w-4 h-4 shrink-0 text-[#00E5FF]" /> },
  { id: 'cloud_backup', label: 'Base de Datos Cloud & Backups', icon: <Database className="w-4 h-4 shrink-0 text-[#00E5FF]" /> },
  { id: 'import_excel', label: 'Importación / Exportación Excel', icon: <FileSpreadsheet className="w-4 h-4 shrink-0 text-[#00E5FF]" /> },
  { id: 'turnos_agenda', label: 'Calendario de Turnos & Reservas', icon: <CalendarClock className="w-4 h-4 shrink-0 text-[#00E5FF]" /> }
];

const timelineOptions = [
  { id: 'urgente', label: '2 a 3 Semanas', note: 'Sprint Rápido' },
  { id: 'estandar', label: '4 a 6 Semanas', note: 'Tiempo Óptimo' },
  { id: 'complejo', label: '8+ Semanas', note: 'Arquitectura Completa' }
];

export default function ProjectEstimatorModal({ isOpen, onClose }) {
  const [selectedType, setSelectedType] = useState('gestion_erp');
  const [selectedFeatures, setSelectedFeatures] = useState(['caja_arqueo', 'padron_clientes', 'pagos_online']);
  const [selectedTimeline, setSelectedTimeline] = useState('estandar');
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientDetails, setClientDetails] = useState('');

  const toggleFeature = (id) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const handleSendWhatsApp = () => {
    const typeObj = projectTypes.find(p => p.id === selectedType);
    const timelineObj = timelineOptions.find(t => t.id === selectedTimeline);
    const featuresList = selectedFeatures.map(f => featureOptions.find(opt => opt.id === f)?.label).filter(Boolean);

    const message = `*Consulta de Proyecto - PrimeLogic LT*%0A%0A` +
      `*Nombre:* ${clientName.trim() || 'Cliente interesado'}%0A` +
      (clientCompany.trim() ? `*Empresa/Rubro:* ${clientCompany.trim()}%0A` : '') +
      `*Tipo de Sistema Requerido:* ${typeObj ? typeObj.label : 'A definir'}%0A` +
      `*Plazo Deseado:* ${timelineObj ? timelineObj.label : 'A coordinar'}%0A` +
      `*Módulos y Funcionalidades Solicitadas:*%0A${featuresList.map(feat => ` - ${feat}`).join('%0A')}%0A` +
      (clientDetails.trim() ? `%0A*Detalles Adicionales:* ${encodeURIComponent(clientDetails.trim())}%0A` : '') +
      `%0AHola Tomás y Luciano, quiero agendar una reunión para cotizar este desarrollo con ustedes.`;

    window.open(`https://wa.me/542612533823?text=${message}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-0"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 15 }} 
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="relative z-10 bg-[#0A192F] border border-white/15 rounded-[1.8rem] md:rounded-[2.2rem] shadow-[0_0_60px_rgba(0,116,217,0.35)] w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden text-white my-auto"
          >
            {/* Header */}
            <div className="p-5 sm:p-7 border-b border-white/10 flex justify-between items-center relative bg-gradient-to-r from-[#0074D9]/25 via-[#0074D9]/10 to-transparent">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase bg-[#0074D9]/30 text-[#00E5FF] border border-[#0074D9]/50 mb-1.5">
                  <Sparkles size={12} /> Cotizador Rápido de Software & Apps
                </span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white">
                  Desarrollamos cualquier tipo de sistema o web a medida
                </h3>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-all cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body con Scroll */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
              
              {/* Paso 1: Tipo de Proyecto */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-white/90 mb-2.5 flex items-center justify-between">
                  <span>1. ¿Qué tipo de desarrollo o solución necesitás?</span>
                  <span className="text-[10px] font-bold text-[#00E5FF]">{projectTypes.length} Opciones Disponibles</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {projectTypes.map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                        selectedType === type.id 
                          ? 'bg-[#0074D9]/30 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.25)]' 
                          : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/10'
                      }`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${selectedType === type.id ? 'bg-[#0074D9] text-white' : 'bg-white/10 text-white/70'}`}>
                        {type.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-xs sm:text-sm block text-white truncate">{type.label}</span>
                        <span className="text-[10px] sm:text-[11px] text-white/60 leading-tight block mt-0.5">{type.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Paso 2: Módulos y Requisitos */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-white/90 mb-2.5 flex items-center justify-between">
                  <span>2. Módulos o funcionalidades prioritarias (Selección múltiple)</span>
                  <span className="text-[10px] font-bold text-white/60">{selectedFeatures.length} seleccionados</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {featureOptions.map(feat => {
                    const isChecked = selectedFeatures.includes(feat.id);
                    return (
                      <button
                        key={feat.id}
                        type="button"
                        onClick={() => toggleFeature(feat.id)}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                          isChecked 
                            ? 'bg-[#0074D9]/35 border-[#0074D9] text-[#00E5FF]' 
                            : 'bg-white/5 border-white/10 text-white/75 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-1">
                          {feat.icon}
                          <span className="truncate text-[11px] sm:text-xs">{feat.label}</span>
                        </div>
                        <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                          isChecked ? 'bg-[#0074D9] border-[#00E5FF]' : 'border-white/30'
                        }`}>
                          {isChecked && <Check size={12} className="text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Paso 3: Tiempos */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-white/90 mb-2.5">
                  3. Plazo objetivo de entrega
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {timelineOptions.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTimeline(t.id)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedTimeline === t.id 
                          ? 'bg-[#0074D9]/30 border-[#00E5FF] text-white' 
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <span className="block font-bold text-xs sm:text-sm">{t.label}</span>
                      <span className="block text-[10px] text-white/50">{t.note}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Datos de contacto y detalles */}
              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-white/80 mb-1">Tu Nombre o Apellido</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Marcelo Fernández" 
                      value={clientName} 
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#0074D9]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-white/80 mb-1">Empresa / Negocio / Rubro</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Cadena Gimnasios / Distribuidora / Startup" 
                      value={clientCompany} 
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#0074D9]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-white/80 mb-1">¿Algún detalle o necesidad puntual? (Opcional)</label>
                  <textarea 
                    rows={2}
                    placeholder="Contanos brevemente qué problema querés resolver o qué sistema tenés en mente..."
                    value={clientDetails}
                    onChange={(e) => setClientDetails(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#0074D9] resize-none"
                  />
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 bg-black/50 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-center sm:text-left">
                <span className="text-[10px] sm:text-[11px] text-white/60 block">Atención directa con los fundadores Tomás & Luciano</span>
                <span className="text-[11px] sm:text-xs font-bold text-[#00E5FF]">Respuesta en menos de 24hs · Cotización sin compromiso</span>
              </div>
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full sm:w-auto bg-[#0074D9] hover:bg-[#005bb5] text-white px-7 py-3.5 rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#0074D9]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
              >
                <Send size={15} /> Enviar Consulta a WhatsApp
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
