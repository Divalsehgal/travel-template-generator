export default function PreviewModal({ isOpen, onClose, content }) {
  return (
    <div className={`fixed inset-0 print:relative ${isOpen ? 'bg-black/70' : 'hidden print:block'} print:bg-white flex print:block items-center justify-center z-50 p-4 print:p-0 overflow-y-auto print:overflow-visible`}>
      <div className="bg-gray-100 print:bg-white rounded-lg print:rounded-none max-w-5xl print:max-w-none w-full max-h-[95vh] print:max-h-none overflow-y-auto print:overflow-visible my-8 print:my-0">
        <div className="no-print sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">Template Preview</h2>
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">download</span>
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-3xl px-3 font-light"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-4 print:p-0">
          <div className="a4-container bg-white mx-auto p-6 print:p-8 text-[#1b3022] shadow-xl print:shadow-none relative overflow-hidden">
            {/* Premium Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02] print:opacity-[0.03] pointer-events-none" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231b3022' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}></div>
            
            {/* Content wrapper with relative positioning */}
            <div className="relative z-10">
            {/* HEADER */}
            <div className="border-b-2 border-gradient-to-r from-forest-green/20 via-glacier-blue/20 to-forest-green/20 pb-1 mb-3 bg-gradient-to-r from-transparent via-forest-green/[0.02] to-transparent">
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] font-bold uppercase tracking-wider text-stone-gray/80">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">📞</span>
                  <span>{content.header.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">✉️</span>
                  <span>{content.header.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🌐</span>
                  <span>{content.header.website}</span>
                </div>
              </div>
            </div>

            {/* BRAND */}
            <header className="text-center mb-3 py-2 print:py-3 bg-gradient-to-b from-forest-green/5 to-transparent rounded-lg">
              <h1 className="text-xl print:text-2xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-forest-green via-glacier-blue to-forest-green">
                {content.brand.title}
              </h1>
              <p className="text-[8px] print:text-[9px] font-bold tracking-[0.3em] uppercase text-stone-gray/60 mt-0.5">
                {content.brand.subtitle}
              </p>
            </header>

            {/* HERO */}
            <section className="mb-3">
              <div className="relative h-20 print:h-32 rounded-lg overflow-hidden mb-2 shadow-lg print:shadow-xl border-2 border-forest-green/10">
                <div className="absolute inset-0 bg-gradient-to-t from-forest-green/70 via-forest-green/20 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-glacier-blue/10 to-transparent z-[9]"></div>
                <img
                  src={content.hero.image}
                  alt={content.hero.title}
                  className="w-full h-full object-cover grayscale-[20%] opacity-90 print:opacity-100"
                  style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}
                />
                <div className="absolute bottom-1.5 left-2.5 z-20">
                  <span className="text-white text-[6px] print:text-[7px] font-black uppercase tracking-widest bg-sunrise-orange px-1 py-0.5 rounded mb-0.5 inline-block">
                    {content.hero.badge}
                  </span>
                  <h2 className="text-white text-sm print:text-base font-extrabold">
                    {content.hero.title}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 border-y-2 border-glacier-blue/20 py-2 bg-gradient-to-r from-transparent via-glacier-blue/5 to-transparent">
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-stone-gray/50 mb-1">
                    ⏱️ Duration
                  </p>
                  <p className="font-bold text-forest-green text-[10px] print:text-xs">{content.hero.stats.duration}</p>
                </div>
                <div className="text-center border-x-2 border-glacier-blue/20">
                  <p className="text-[10px] uppercase font-bold text-stone-gray/50 mb-1">
                    ⛰️ Max Altitude
                  </p>
                  <p className="font-bold text-forest-green text-[10px] print:text-xs">{content.hero.stats.altitude}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-stone-gray/50 mb-1">
                    📊 Difficulty
                  </p>
                  <p className="font-bold text-forest-green text-[10px] print:text-xs">{content.hero.stats.difficulty}</p>
                </div>
              </div>
            </section>

            {/* OVERVIEW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div className="md:col-span-2">
                <h3 className="text-[9px] print:text-[10px] font-black uppercase tracking-wider mb-1.5 border-l-[3px] border-gradient-to-b from-glacier-blue to-forest-green pl-2 bg-gradient-to-r from-glacier-blue/10 to-transparent py-1">
                  📝 Overview
                </h3>
                <p className="text-[10px] print:text-[11px] leading-snug text-stone-gray pl-2">
                  {content.overview.text}
                </p>
              </div>

              <div className="bg-gradient-to-br from-forest-green/10 to-glacier-blue/5 p-2 rounded-lg flex items-center gap-1.5 self-start border border-forest-green/20 shadow-sm">
                <div className="w-8 h-8 print:w-10 print:h-10 rounded-full border-2 border-forest-green/30 overflow-hidden shrink-0 grayscale shadow-inner">
                  <img
                    src={content.leader.image}
                    className="w-full h-full object-cover"
                    alt="Leader"
                  />
                </div>
                <div>
                  <h4 className="text-[9px] print:text-[10px] font-bold uppercase text-forest-green">
                    👤 {content.leader.name}
                  </h4>
                  <p className="text-[7px] print:text-[8px] text-stone-gray font-medium uppercase leading-tight">
                    {content.leader.role}
                  </p>
                </div>
              </div>
            </div>

            {/* DETAILED ITINERARY */}
            <section className="mb-3 print:page-break-before bg-gradient-to-b from-forest-green/[0.02] to-transparent rounded-lg p-2 print:p-3">
              <h3 className="text-[10px] print:text-[11px] font-black uppercase tracking-widest mb-2 flex items-center gap-1 border-b-2 border-gradient-to-r from-glacier-blue/50 via-forest-green/30 to-glacier-blue/50 pb-1.5 bg-gradient-to-r from-glacier-blue/10 via-transparent to-glacier-blue/10 px-2 rounded-t whitespace-nowrap">
                <span className="text-xs print:text-sm">📋</span>
                <span>Detailed Itinerary</span>
              </h3>

              <div className="space-y-2 print:space-y-1.5">
                {content.itinerary.map((day, index) => (
                  <div key={index} className="flex gap-2 items-start bg-white/50 p-2 rounded-lg border border-stone-gray/10 hover:border-glacier-blue/30 transition-colors shadow-sm">
                    <div className="rounded-md overflow-hidden w-12 h-10 print:w-16 print:h-12 shrink-0 bg-gray-100 border-2 border-glacier-blue/20 shadow-inner">
                      <img
                        alt={`Day ${day.day}`}
                        className="w-full h-full object-cover print:opacity-100"
                        src={day.image}
                        style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-sm print:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-forest-green to-glacier-blue">Day {day.day}</span>
                        <div className="h-[2px] flex-grow bg-gradient-to-r from-glacier-blue/30 to-transparent rounded-full"></div>
                        <span className="text-[7px] print:text-[8px] font-black text-white bg-gradient-to-r from-glacier-blue to-forest-green px-1.5 py-0.5 rounded uppercase tracking-widest shadow-sm">
                          {day.badge}
                        </span>
                      </div>
                      <h4 className="text-[9px] print:text-[10px] font-bold text-forest-green uppercase mb-0.5">
                        {day.title}
                      </h4>
                      <p className="text-[7px] print:text-[8px] text-stone-gray leading-tight">
                        {day.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* INCLUSIONS & THINGS TO CARRY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print:gap-4 border-t-2 border-gradient-to-r from-transparent via-glacier-blue/30 to-transparent pt-2.5 print:pt-3 mb-2.5 print:mb-3">
              <div className="bg-gradient-to-br from-green-50/50 to-transparent p-2 rounded-lg border border-forest-green/10">
                <h3 className="text-[9px] print:text-[10px] font-black uppercase tracking-widest mb-1.5 print:mb-2 flex items-center gap-1 bg-gradient-to-r from-forest-green/10 to-transparent px-2 py-1 rounded whitespace-nowrap">
                  <span className="text-xs print:text-sm">✓</span>
                  <span>Inclusions</span>
                </h3>
                <ul className="space-y-1 print:space-y-1.5">
                  {content.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-1.5 bg-white/70 p-1.5 rounded border-l-2 border-glacier-blue/30">
                      <span className="text-xs text-forest-green/60 shrink-0">✓</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] print:text-[10px] font-bold uppercase text-forest-green flex items-center gap-1 flex-wrap">
                          <span className="shrink-0">
                            {item.icon === 'restaurant' && '🍽️'}
                            {item.icon === 'camping' && '⛺'}
                            {item.icon === 'medical_services' && '⚕️'}
                          </span>
                          <span>{item.title}</span>
                        </p>
                        <p className="text-[7px] print:text-[8px] text-stone-gray leading-snug mt-0.5">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50/50 to-transparent p-2 rounded-lg border border-glacier-blue/10">
                <h3 className="text-[9px] print:text-[10px] font-black uppercase tracking-widest mb-1.5 print:mb-2 flex items-center gap-1 bg-gradient-to-r from-glacier-blue/10 to-transparent px-2 py-1 rounded whitespace-nowrap">
                  <span className="text-xs print:text-sm">🎒</span>
                  <span>Things to Carry</span>
                </h3>
                <div className="grid grid-cols-2 gap-y-1.5 gap-x-1.5 print:gap-y-2 print:gap-x-2">
                  {content.thingsToCarry.map((item, index) => (
                    <div key={index} className="flex items-center gap-1 bg-white/70 p-1 rounded text-left border-l-2 border-forest-green/30">
                      <span className="text-xs">
                        {item.icon === 'hiking' && '🥾'}
                        {item.icon === 'ac_unit' && '🧥'}
                        {item.icon === 'light' && '💡'}
                        {item.icon === 'water_bottle' && '💧'}
                        {item.icon === 'pill' && '💊'}
                        {item.icon === 'dry_cleaning' && '🧴'}
                      </span>
                      <span className="text-[8px] print:text-[9px] font-bold uppercase">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <footer className="mt-auto pt-2.5 print:pt-3 border-t-[3px] border-gradient-to-r from-forest-green via-glacier-blue to-forest-green flex flex-col sm:flex-row justify-between items-center gap-3 bg-gradient-to-t from-forest-green/5 to-transparent rounded-b-lg px-2 pb-1">
              <div className="text-center sm:text-left space-y-0.5">
                <h4 className="text-xs print:text-sm font-black uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-forest-green to-glacier-blue">{content.footer.title}</h4>
                <p className="text-[7px] print:text-[8px] font-medium text-stone-gray max-w-xs">
                  {content.footer.description}
                </p>
                <div className="flex gap-2 pt-0.5 justify-center sm:justify-start">
                  <span className="text-sm text-forest-green hover:scale-110 transition-transform">📷</span>
                  <span className="text-sm text-forest-green hover:scale-110 transition-transform">🌍</span>
                  <span className="text-sm text-forest-green hover:scale-110 transition-transform">📍</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 print:w-14 print:h-14 border-2 border-forest-green p-0.5 bg-white flex flex-col items-center justify-center text-center shadow-md rounded">
                  <div className="w-full h-full border border-dashed border-stone-gray/30 flex items-center justify-center rounded-sm">
                    <span className="text-base print:text-lg text-stone-gray/20 font-bold">QR</span>
                  </div>
                </div>
                <div className="text-right">
                  <a 
                    href={`https://wa.me/${content.header.phone.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in ${encodeURIComponent(content.hero.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-2.5 py-1 print:px-3 print:py-1.5 rounded-lg text-[8px] print:text-[9px] font-black uppercase flex items-center gap-1 mb-0.5 print:mb-1 w-full justify-center shadow-md hover:shadow-lg transition-shadow no-underline"
                  >
                    <svg className="w-2 h-2 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.413-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.308 1.654zm6.249-3.63l.369.218c1.462.866 3.124 1.323 4.82 1.324 5.179 0 9.395-4.215 9.398-9.396.001-2.51-.975-4.87-2.748-6.645s-4.134-2.75-6.645-2.75c-5.181 0-9.397 4.215-9.399 9.397 0 1.862.55 3.676 1.587 5.239l.239.36-1.005 3.67 3.763-.987z"></path>
                    </svg>
                    WhatsApp
                  </a>
                  <p className="text-[7px] print:text-[8px] font-bold text-stone-gray uppercase tracking-widest">
                    {content.footer.copyright}
                  </p>
                </div>
              </div>
            </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}