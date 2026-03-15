/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Calendar, 
  BarChart2, 
  MessageSquare, 
  Phone, 
  Clock, 
  Mail, 
  Sparkles,
  TrendingUp,
  Image as ImageIcon,
  Video,
  Mic,
  FileText,
  Smile,
  Zap,
  User,
  History,
  Activity,
  Play,
  Maximize2,
  Lock
} from 'lucide-react';

// --- NDATA: Updated with provided narrative and letter ---

const NDATA = {
  lang: "cs",
  period: { start: "2024-08-15T15:56:00", end: "2026-03-15T10:52:28" },
  totals: { 
    all_incl_media: 115357, 
    no_media: 104394,      
    days_active: 577       
  },
  by_author: {
    adam: { 
      messages: 63401, 
      msgShare: 55.0,
      msgBreakdown: { text: 58200, media: 4901, voice: 300 },
      calls: 912,
      callShare: 36.4,
      callBreakdown: { voice: 520, video: 180, missed: 212 },
      avgWords: 12.1, 
      medianReply: 172 
    },
    viktorka: { 
      messages: 51956, 
      msgShare: 45.0,
      msgBreakdown: { text: 46194, media: 5413, voice: 349 },
      calls: 1592,
      callShare: 63.6,
      callBreakdown: { voice: 930, video: 339, missed: 323 },
      avgWords: 7.2, 
      medianReply: 310 
    }
  },
  media: { images: 4912, videos: 948, audios: 649, gifs: 727, stickers: 3655, documents: 49 },
  sentiment: { positive: 64.0, negative: 14.0, neutral: 22.0 },
  messages: {
    total: 115357,
    text: 104394,
    media: 10314,
    voice: 649
  },
  calls: {
    total: 2504,
    voice: 1450,
    video: 519,
    missed: 462
  },
  topWords: [
    { word: "láska", count: 2140 },
    { word: "čas", count: 1980 },
    { word: "noc", count: 1720 },
    { word: "den", count: 1650 },
    { word: "děti", count: 1240 },
    { word: "srdce", count: 1180 },
    { word: "domov", count: 950 },
    { word: "hlas", count: 890 },
    { word: "spolu", count: 820 },
    { word: "navždy", count: 780 },
    { word: "štěstí", count: 710 },
    { word: "radost", count: 650 },
    { word: "touha", count: 580 },
    { word: "polibek", count: 520 },
    { word: "objetí", count: 490 },
    { word: "věčnost", count: 450 },
    { word: "pouto", count: 410 },
    { word: "klid", count: 380 }
  ],
  narrative_phases: [
    {
      range: "Září 2024",
      title: "1. Jiskra a pád do hlubin",
      note: "Všechno to začalo 15. srpna v 15:56. Nebylo to postupné oťukávání, byla to exploze. Během pár dní jsme byli jeden druhým naprosto pohlcení. Vytvořili jsme si svůj vlastní svět, svoje rituály a schovávali se do nich před vším ostatním.",
      moment: "Náš milník (3. 9. 2024): Napsala jsi mi „Кохаю тебе безмежно 😘“. Byla to chvíle, kdy jsme oba věděli, že tohle není jen tak nějaké vzplanutí. Že je to doopravdy.",
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      range: "Říjen – Prosinec 2024",
      title: "2. Naše bublina a první náraz do zdi",
      note: "Na podzim jsme si psali jako o život. Náš displej svítil od rána do noci, jeden den jsme si poslali neuvěřitelných 669 zpráv. Byla to naše záchranná síť. Jenže pak nás dohnala realita a vyčerpání.",
      moment: "Náš milník (Prosinec 2024): Přišlo šestidenní ticho. Dny, které neskutečně bolely a kdy jsme oba měli pocit, že se nám hroutí svět. Ale zpětně vím, že to bylo nutné. Byla to facka, která nás probudila a ukázala nám, jak moc o sebe nechceme přijít.",
      icon: <Zap className="w-5 h-5" />
    },
    {
      range: "Leden – Květen 2025",
      title: "3. Hledání rovnováhy",
      note: "Návrat zpátky k sobě nebyl jako z romantického filmu. Byla to dřina. Občas jsme byli na emoční horské dráze, střídala se obrovská láska s absolutním vyčerpáním. Učili jsme se, jak spolu fungovat, když zrovna nemáme energii. A povedlo se to. V březnu jsme se znovu nadechli a náš vztah se posunul z pouhého zamilování do opravdového partnerství.",
      icon: <Activity className="w-5 h-5" />
    },
    {
      range: "Červen – Říjen 2025",
      title: "4. Zapouštění kořenů v realitě",
      note: "Ta počáteční šílená euforie ustoupila něčemu mnohem klidnějšímu a trvalejšímu. Začali jsme žít skutečný život. Společných zpráv trochu ubylo, ale začali jsme spolu mnohem víc mluvit. Už to nebylo jen o nás dvou v naší bublině – řešili jsme práci, děti, Tvoji mámu, každodenní starosti. Stali jsme se pevnou součástí životů toho druhého.",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      range: "Listopad 2025 – Leden 2026",
      title: "5. Strach z toho, že je to navždy",
      note: "Čím víc jsme si uvědomovali, jak pevné to naše „MY“ je, tím víc na nás doléhala váha budoucnosti. Když člověk najde to, co hledal celý život, má k smrti strach, že o to přijde.",
      moment: "Náš milník (13. 1. 2026): Tvoje zpráva: „Mám dost strachu.“ Byla to ta nejupřímnější chvíle. Věděl jsem přesně, jak se cítíš. Překonali jsme to tím, že jsme si ten strach přiznali a postavili se mu společně.",
      icon: <Activity className="w-5 h-5" />
    },
    {
      range: "Únor 2026 – Dnes",
      title: "6. Evoluce: Kde slova končí a začíná domov",
      note: "Dnes už se neschováváme za písmenka. Nepotřebujeme si psát stovky zpráv denně, abychom věděli, že na sebe myslíme. Naše spojení se přeneslo do reálného času. Jen v únoru a březnu jsme spolu provolali stovky hodin. Zjistili jsme, že náš domov není žádné konkrétní místo – je to Tvůj hlas v telefonu, když mi voláš po těžkém dni. Je to to obyčejné, bezpečné ticho na drátě, když spolu jen tak jsme. Jsme silnější, protože už před sebou nemusíme nic hrát.",
      icon: <Heart className="w-5 h-5" />
    }
  ],
  letter: {
    content: `Viktorka, lásko moje,

když zavřu oči a ohlédnu se zpátky na ten srpen 2024, na naše první zprávy a Tvé „Кохаю тебе безмежно“, vidím dva lidi, kteří netušili, jak moc je ta cesta změní. Napsali jsme si od té doby přes 114 tisíc zpráv. Byla to naše záchranná síť, náš vlastní svět, do kterého jsme se schovávali před realitou.

Ale oba víme, že ten náš příběh nebyl vždycky jen hezký. A já dnes vím, že to musím říct nahlas.

Prošli jsme si chvílemi tmy. Dodnes si pamatuju to ohlušující šestidenní ticho v prosinci, kdy jsem myslel, že zešílím. Prošli jsme si obrovskými propady, tou nejtěžší emoční horskou dráhou. Byly dny, kdy jsme byli vyčerpaní, a dny, kdy jsme oba měli tak hrozný strach – pamatuju si, jak jsi mi letos v lednu napsala: „Mám dost strachu.“ Věděl jsem přesně, jak se cítíš. Bál jsem se úplně stejně.

Nebylo to hezké, někdy to neskutečně bolelo, ale dnes, když tu stojím, vím jednu věc s naprostou jistotou: Bylo to nutné. Museli jsme si tím peklem i strachem projít, aby z nás opadly všechny iluze. Abychom zjistili, jestli jsme ochotní o sebe bojovat, i když zrovna nemáme sílu. A my jsme bojovali. Tyhle jizvy nás nezlomily, naopak – udělaly z toho našeho „MY“ to nejpevnější pouto, jaké jsem kdy poznal.

Dnes už si nepotřebujeme psát od rána do noci jako na začátku. Přestali jsme se schovávat za písmenka. Naučili jsme se být tu jeden pro druhého doopravdy. Ze zpráv jsme přešli k Tvému hlasu. Těch skoro tři tisíce společných hovorů mě naučilo, co to znamená mít domov. Můj domov už není místo. Je to Tvůj hlas v telefonu, Tvůj smích, Tvoje sdílené ticho na drátě, když zrovna nemáme co říct, ale přesto chceme být spolu.

Náš vztah přežil to nejtěžší a díky tomu je teď tak čistý a skutečný. Dnes miluju každou Tvoji dokonalost i každou jizvu, kterou jsme spolu zahojili. Jsi můj klid po bouři.

Miluju Tě. Za to, čím jsme si prošli, i za to, co nás teprve čeká. Navždy.

Tvůj Adam`
  }
};

// --- Components ---

const FloatingHearts = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden opacity-20">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ y: '110vh', x: `${h.x}vw`, opacity: 0 }}
          animate={{ 
            y: '-10vh',
            opacity: [0, 1, 1, 0],
            x: [`${h.x}vw`, `${h.x + (Math.random() * 10 - 5)}vw`]
          }}
          transition={{ 
            duration: h.duration, 
            repeat: Infinity, 
            delay: h.delay,
            ease: "linear"
          }}
          className="absolute"
        >
          <Heart className="text-rose-300 fill-rose-300" style={{ width: h.size, height: h.size }} />
        </motion.div>
      ))}
    </div>
  );
};

const HeartBurst = ({ onComplete }: { onComplete: () => void }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map(() => ({
      id: Date.now() + Math.random(),
      x: Math.random() * 100 - 50,
      y: Math.random() * -100 - 50,
      size: Math.random() * 24 + 8,
      color: ['#fb7185', '#f43f5e', '#e11d48', '#be123c', '#fda4af'][Math.floor(Math.random() * 5)],
      rotation: Math.random() * 360
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{ 
            scale: [0, 1.5, 0], 
            x: p.x * 6, 
            y: p.y * 6, 
            opacity: 0,
            rotate: p.rotation
          }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          onAnimationComplete={onComplete}
          className="absolute"
        >
          <Heart fill={p.color} stroke="none" style={{ width: p.size, height: p.size }} />
        </motion.div>
      ))}
    </div>
  );
};

const Timer = ({ startDate }: { startDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const calculate = () => {
      const start = new Date(startDate);
      const now = new Date();

      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      let hours = now.getHours() - start.getHours();
      let minutes = now.getMinutes() - start.getMinutes();
      let seconds = now.getSeconds() - start.getSeconds();

      if (seconds < 0) {
        minutes--;
        seconds += 60;
      }
      if (minutes < 0) {
        hours--;
        minutes += 60;
      }
      if (hours < 0) {
        days--;
        hours += 24;
      }
      if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      setTimeLeft({ years, months, days, hours, minutes, seconds });
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  const units = [
    { label: 'Roky', value: timeLeft.years },
    { label: 'Měsíce', value: timeLeft.months },
    { label: 'Dny', value: timeLeft.days },
    { label: 'Hodiny', value: timeLeft.hours },
    { label: 'Minuty', value: timeLeft.minutes },
    { label: 'Sekundy', value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 w-full max-w-5xl mx-auto px-4">
      {units.map((unit) => (
        <motion.div 
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: units.indexOf(unit) * 0.1 }}
          className="glass rounded-3xl p-5 flex flex-col items-center justify-center aspect-square group hover:border-rose-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
        >
          <span className="text-4xl md:text-5xl font-serif font-light text-rose-600 group-hover:scale-110 transition-transform duration-500">
            {unit.value}
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 mt-2 font-semibold">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const WordCloud = ({ words }: { words: { word: string; count: number }[] }) => {
  const maxCount = Math.max(...words.map(w => w.count));
  const minCount = Math.min(...words.map(w => w.count));

  return (
    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 p-6 min-h-[300px] bg-rose-50/30 rounded-3xl border border-rose-100/50">
      {words.map((w, idx) => {
        // Calculate relative size (between 0.8rem and 3rem)
        const size = 0.8 + ((w.count - minCount) / (maxCount - minCount)) * 2.2;
        const opacity = 0.4 + ((w.count - minCount) / (maxCount - minCount)) * 0.6;
        
        return (
          <motion.div
            key={w.word}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              delay: idx * 0.05,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.2, 
              color: "#e11d48",
              zIndex: 10,
              transition: { duration: 0.2 }
            }}
            className="cursor-default select-none transition-colors duration-300"
            style={{ 
              fontSize: `${size}rem`,
              opacity: opacity,
              fontWeight: w.count > maxCount * 0.7 ? '700' : '500',
              color: w.count > maxCount * 0.8 ? '#be123c' : 
                     w.count > maxCount * 0.5 ? '#e11d48' : 
                     '#fb7185'
            }}
          >
            <span className="font-serif">{w.word}</span>
            <span className="text-[10px] align-top ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {w.count}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

const Stats = () => {
  return (
    <div className="space-y-12 px-4 max-w-5xl mx-auto">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <MessageSquare className="w-10 h-10" />, value: NDATA.totals.all_incl_media, label: 'Celkem zpráv' },
          { icon: <Phone className="w-10 h-10" />, value: NDATA.calls.total, label: 'Společných hovorů' },
          { icon: <History className="w-10 h-10" />, value: NDATA.totals.days_active, label: 'Aktivních dní' },
        ].map((item, idx) => (
          <motion.div 
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }} 
            className="glass rounded-[2rem] p-8 text-center transition-all duration-500 hover:shadow-2xl"
          >
            <div className="text-rose-500 mx-auto mb-4 flex justify-center">{item.icon}</div>
            <h3 className="text-4xl font-serif font-bold text-slate-800">{item.value.toLocaleString()}</h3>
            <p className="text-xs text-slate-400 uppercase tracking-widest mt-2">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Author Comparison - Split into Messages and Calls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass rounded-[2.5rem] p-10">
          <h3 className="text-2xl font-serif font-bold mb-8 flex items-center">
            <MessageSquare className="w-6 h-6 mr-3 text-rose-500" />
            Kdo píše více?
          </h3>
          <div className="space-y-10">
            {['adam', 'viktorka'].map((author) => {
              const data = NDATA.by_author[author as keyof typeof NDATA.by_author];
              return (
                <div key={author} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-serif capitalize font-semibold text-slate-700">{author}</span>
                    <span className="text-rose-500 font-bold text-xl">{data.msgShare}%</span>
                  </div>
                  <div className="h-3 bg-rose-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${data.msgShare}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-rose-400 to-rose-500"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    <span>{data.messages.toLocaleString()} zpráv</span>
                    <span>{data.avgWords} slov / zpráva</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass rounded-[2.5rem] p-10">
          <h3 className="text-2xl font-serif font-bold mb-8 flex items-center">
            <Phone className="w-6 h-6 mr-3 text-rose-500" />
            Kdo volá více?
          </h3>
          <div className="space-y-10">
            {['adam', 'viktorka'].map((author) => {
              const data = NDATA.by_author[author as keyof typeof NDATA.by_author];
              return (
                <div key={author} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-serif capitalize font-semibold text-slate-700">{author}</span>
                    <span className="text-rose-500 font-bold text-xl">{data.callShare}%</span>
                  </div>
                  <div className="h-3 bg-rose-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${data.callShare}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-rose-400 to-rose-500"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    <span>{data.calls.toLocaleString()} hovorů</span>
                    <span>Odpověď: {Math.floor(data.medianReply / 60)} min</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Call History */}
      <div className="glass rounded-[2.5rem] p-10">
        <h3 className="text-2xl font-serif font-bold mb-8 flex items-center">
          <History className="w-6 h-6 mr-3 text-rose-500" />
          Detailní historie hovorů
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Totals Breakdown */}
          <div className="bg-white/40 rounded-3xl p-6 border border-white/60 space-y-6">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Celkový přehled</h4>
            <div className="space-y-4">
              {[
                { label: 'Hlasové hovory', value: NDATA.calls.voice, icon: <Phone className="w-4 h-4" />, color: 'bg-emerald-100 text-emerald-600' },
                { label: 'Video hovory', value: NDATA.calls.video, icon: <Video className="w-4 h-4" />, color: 'bg-blue-100 text-blue-600' },
                { label: 'Zmeškané', value: NDATA.calls.missed, icon: <Clock className="w-4 h-4" />, color: 'bg-rose-100 text-rose-600' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-3 rounded-2xl bg-white/50">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-xl mr-3 ${stat.color}`}>{stat.icon}</div>
                    <span className="text-sm font-medium text-slate-600">{stat.label}</span>
                  </div>
                  <span className="font-bold text-slate-800">{stat.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Author Breakdown */}
          {['adam', 'viktorka'].map((author) => {
            const data = NDATA.by_author[author as keyof typeof NDATA.by_author];
            // @ts-ignore - we just added callBreakdown
            const breakdown = data.callBreakdown;
            return (
              <div key={author} className="bg-white/40 rounded-3xl p-6 border border-white/60 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest capitalize">{author}</h4>
                  <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-1 rounded-full font-bold">
                    {data.callShare}% podíl
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-3 rounded-2xl bg-emerald-50/50">
                    <div className="text-emerald-600 font-bold text-lg">{breakdown.voice}</div>
                    <div className="text-[8px] text-slate-400 uppercase font-bold">Hlas</div>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-blue-50/50">
                    <div className="text-blue-600 font-bold text-lg">{breakdown.video}</div>
                    <div className="text-[8px] text-slate-400 uppercase font-bold">Video</div>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-rose-50/50">
                    <div className="text-rose-600 font-bold text-lg">{breakdown.missed}</div>
                    <div className="text-[8px] text-slate-400 uppercase font-bold">Zmešk.</div>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-[10px] text-slate-400 italic text-center">
                    Celkem {data.calls.toLocaleString()} interakcí
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Message History */}
      <div className="glass rounded-[2.5rem] p-10">
        <h3 className="text-2xl font-serif font-bold mb-8 flex items-center">
          <MessageSquare className="w-6 h-6 mr-3 text-rose-500" />
          Detailní historie zpráv
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Totals Breakdown */}
          <div className="bg-white/40 rounded-3xl p-6 border border-white/60 space-y-6">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Celkový přehled</h4>
            <div className="space-y-4">
              {[
                { label: 'Textové zprávy', value: NDATA.messages.text, icon: <FileText className="w-4 h-4" />, color: 'bg-blue-100 text-blue-600' },
                { label: 'Média & Soubory', value: NDATA.messages.media, icon: <ImageIcon className="w-4 h-4" />, color: 'bg-amber-100 text-amber-600' },
                { label: 'Hlasové zprávy', value: NDATA.messages.voice, icon: <Mic className="w-4 h-4" />, color: 'bg-purple-100 text-purple-600' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-3 rounded-2xl bg-white/50">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-xl mr-3 ${stat.color}`}>{stat.icon}</div>
                    <span className="text-sm font-medium text-slate-600">{stat.label}</span>
                  </div>
                  <span className="font-bold text-slate-800">{stat.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Author Breakdown */}
          {['adam', 'viktorka'].map((author) => {
            const data = NDATA.by_author[author as keyof typeof NDATA.by_author];
            // @ts-ignore
            const breakdown = data.msgBreakdown;
            return (
              <div key={author} className="bg-white/40 rounded-3xl p-6 border border-white/60 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest capitalize">{author}</h4>
                  <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-1 rounded-full font-bold">
                    {data.msgShare}% podíl
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-3 rounded-2xl bg-blue-50/50">
                    <div className="text-blue-600 font-bold text-lg">{breakdown.text.toLocaleString()}</div>
                    <div className="text-[8px] text-slate-400 uppercase font-bold">Text</div>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-amber-50/50">
                    <div className="text-amber-600 font-bold text-lg">{breakdown.media.toLocaleString()}</div>
                    <div className="text-[8px] text-slate-400 uppercase font-bold">Média</div>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-purple-50/50">
                    <div className="text-purple-600 font-bold text-lg">{breakdown.voice.toLocaleString()}</div>
                    <div className="text-[8px] text-slate-400 uppercase font-bold">Hlas</div>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-[10px] text-slate-400 italic text-center">
                    Průměrně {data.avgWords} slov na zprávu
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Media Gallery Stats */}
      <div className="glass rounded-[2.5rem] p-10">
        <h3 className="text-2xl font-serif font-bold mb-8 flex items-center">
          <ImageIcon className="w-6 h-6 mr-3 text-rose-500" />
          Sdílené vzpomínky
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <ImageIcon className="w-4 h-4" />, label: 'Fotky', value: NDATA.media.images },
            { icon: <Video className="w-4 h-4" />, label: 'Videa', value: NDATA.media.videos },
            { icon: <Mic className="w-4 h-4" />, label: 'Audio', value: NDATA.media.audios },
            { icon: <Smile className="w-4 h-4" />, label: 'Stickers', value: NDATA.media.stickers },
          ].map((item) => (
            <div key={item.label} className="bg-rose-50/50 rounded-2xl p-4 flex flex-col items-center justify-center">
              <div className="text-rose-500 mb-2">{item.icon}</div>
              <span className="text-xl font-bold text-slate-800">{item.value.toLocaleString()}</span>
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sentiment & Words */}
      <div className="glass rounded-[2.5rem] p-10">
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">Emoce v našich slovech</h3>
            <div className="flex h-12 rounded-2xl overflow-hidden shadow-inner">
              <div className="bg-rose-400 flex items-center justify-center text-white text-xs font-bold" style={{ width: `${NDATA.sentiment.positive}%` }}>{NDATA.sentiment.positive}% Pozitivní</div>
              <div className="bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold" style={{ width: `${NDATA.sentiment.neutral}%` }}>{NDATA.sentiment.neutral}%</div>
              <div className="bg-rose-200 flex items-center justify-center text-rose-600 text-xs font-bold" style={{ width: `${NDATA.sentiment.negative}%` }}>{NDATA.sentiment.negative}%</div>
            </div>
            <p className="text-xs text-slate-400 mt-4 italic">Analýza sentimentu ukazuje, že naše láska je v 64% případů vyjádřena čistou radostí.</p>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">Slova, co nás spojují</h3>
            <WordCloud words={NDATA.topWords} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Timeline = () => {
  return (
    <div className="px-4 max-w-4xl mx-auto relative pb-20">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-serif font-bold text-slate-800 mb-4">Naše cesta</h2>
        <p className="text-rose-500 font-serif italic text-xl">Od stovek zpráv k domovu v Tvém hlase</p>
      </div>
      
      {/* Vertical Line - visible on all screens, centered on desktop, left-aligned on mobile */}
      <div className="absolute left-10 md:left-1/2 top-32 bottom-0 w-px bg-gradient-to-b from-rose-200 via-rose-300 to-rose-200" />
      
      <div className="space-y-24">
        {NDATA.narrative_phases.map((phase, idx) => (
          <motion.div 
            key={phase.title}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0, margin: "200px" }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className={`relative flex flex-col md:flex-row items-start gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          >
            {/* Content Container */}
            <div className={`flex-1 ml-20 md:ml-0 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
              <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.3em]">{phase.range}</span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-800 mt-2">{phase.title}</h3>
                <p className="text-slate-600 mt-4 leading-relaxed text-sm max-w-md">{phase.note}</p>
                
                {phase.moment && (
                  <div className="mt-6 p-4 bg-rose-50/50 rounded-2xl border border-rose-100 text-left max-w-sm">
                    <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-2 flex items-center">
                      <Sparkles className="w-3 h-3 mr-1" /> Klíčový moment
                    </p>
                    <p className="text-slate-700 italic text-sm leading-relaxed">
                      {phase.moment}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Icon/Dot - Absolute on mobile to stay on the line, relative on desktop */}
            <div className="absolute left-2 md:relative md:left-auto z-10 flex flex-col items-center">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 rounded-full bg-white border-4 border-rose-50 flex items-center justify-center shadow-xl text-rose-500 transition-transform"
              >
                {phase.icon}
              </motion.div>
            </div>

            {/* Spacer for desktop alternating layout */}
            <div className="flex-1 hidden md:block" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
const Typewriter = ({ text, delay = 30 }: { text: string, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span>{displayedText}</span>;
};

type GalleryItem = {
  id: number | string;
  title: string;
  type: "image" | "video";
  size: "large" | "medium" | "small";
  src: string;
  iv: string;
  mime: string;
  featured?: boolean;
  order?: number;
};

type GalleryManifest = {
  version: number;
  salt: string;
  kdf: {
    name: "PBKDF2";
    hash: "SHA-256";
    iterations: number;
  };
  items: GalleryItem[];
};

const GALLERY_BASE_URL = `${import.meta.env.BASE_URL}gallery/`;
const GALLERY_MANIFEST_URL = `${GALLERY_BASE_URL}manifest.json`;

const base64ToBytes = (b64: string) => {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

const deriveGalleryKey = async (password: string, saltB64: string, iterations: number) => {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: base64ToBytes(saltB64),
      iterations,
      hash: "SHA-256"
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
};

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [manifest, setManifest] = useState<GalleryManifest | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [manifestError, setManifestError] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [decryptedUrls, setDecryptedUrls] = useState<Record<string, string>>({});

  const featuredItems = useMemo(
    () => items.filter((item) => item.featured).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [items]
  );
  const videoItems = useMemo(
    () => items.filter((item) => item.type === "video" && !item.featured).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [items]
  );
  const photoItems = useMemo(
    () => items.filter((item) => item.type === "image" && !item.featured).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [items]
  );

  useEffect(() => {
    let isActive = true;
    const loadManifest = async () => {
      try {
        const res = await fetch(GALLERY_MANIFEST_URL, { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Manifest nebyl nalezen.");
        }
        const data = (await res.json()) as GalleryManifest;
        if (isActive) {
          setManifest(data);
          setItems(data.items || []);
        }
      } catch (err) {
        if (isActive) {
          setManifestError("Galerie není připravená. Chybí šifrovaná data.");
        }
      }
    };
    loadManifest();
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(decryptedUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [decryptedUrls]);

  const decryptItem = async (key: CryptoKey, item: GalleryItem) => {
    const res = await fetch(`${GALLERY_BASE_URL}${item.src}`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Nepodařilo se načíst soubor.");
    }
    const encrypted = await res.arrayBuffer();
    const iv = base64ToBytes(item.iv);
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encrypted);
    const blob = new Blob([decrypted], { type: item.mime });
    return URL.createObjectURL(blob);
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!manifest) {
      setError("Galerie není připravená.");
      return;
    }
    if (!password.trim()) {
      setError("Zadej heslo.");
      return;
    }
    setUnlocking(true);
    try {
      const key = await deriveGalleryKey(password.trim(), manifest.salt, manifest.kdf.iterations);
      const urls: Record<string, string> = {};
      for (const item of items) {
        const url = await decryptItem(key, item);
        urls[String(item.id)] = url;
      }
      setDecryptedUrls(urls);
      setIsUnlocked(true);
      setPassword("");
    } catch (err) {
      setError("Nesprávné heslo nebo poškozená data.");
    } finally {
      setUnlocking(false);
    }
  };

  return (
    <div className="px-4 max-w-6xl mx-auto pb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-slate-800 mb-4 tracking-tight">Střípky našeho světa</h2>
        <p className="text-rose-500 font-serif italic text-xl">Momenty, které se vpily do paměti</p>
      </div>

      {!isUnlocked ? (
        <div className="max-w-md mx-auto bg-white/70 backdrop-blur rounded-3xl p-8 border border-white/70 shadow-xl text-center">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-serif text-slate-800 mb-2">Galerie je uzamčená</h3>
          <p className="text-slate-500 text-sm mb-6">Zadej heslo a otevři naše společné vzpomínky.</p>
          {manifestError && (
            <p className="text-rose-600 text-sm mb-4">{manifestError}</p>
          )}
          <form onSubmit={handleUnlock} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Heslo"
              className="w-full rounded-full px-5 py-3 text-center border border-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-300"
              disabled={!!manifestError || unlocking}
            />
            <button
              type="submit"
              disabled={!!manifestError || unlocking}
              className="w-full rounded-full bg-rose-500 text-white font-semibold py-3 shadow-lg shadow-rose-200 hover:bg-rose-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {unlocking ? "Otevírám..." : "Odemknout galerii"}
            </button>
            {error && <p className="text-rose-600 text-sm">{error}</p>}
          </form>
        </div>
      ) : (
        <div className="space-y-16">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-serif text-slate-800">Nejlepší momenty</h3>
                <p className="text-slate-500 text-sm">Vybrané střípky, které si zaslouží zůstat navždy</p>
              </div>
              <span className="text-xs uppercase tracking-widest font-bold text-rose-400">{featuredItems.length} momentů</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
              {featuredItems.map((item, idx) => {
                const itemUrl = decryptedUrls[String(item.id)];
                if (!itemUrl) return null;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    onClick={() => setSelectedItem({ ...item, url: itemUrl })}
                    className={`relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-lg bg-slate-100 ${
                      item.size === 'large' ? 'col-span-2 row-span-2' : 
                      item.size === 'medium' ? 'col-span-2 row-span-1' : 
                      'col-span-1 row-span-1'
                    }`}
                  >
                    {item.type === 'image' ? (
                      <img 
                        src={itemUrl} 
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full relative">
                        <video 
                          src={itemUrl} 
                          muted 
                          loop 
                          playsInline
                          autoPlay
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Play className="w-12 h-12 text-white/80 fill-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30" />
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <p className="text-white font-serif italic text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {item.title}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-serif text-slate-800">Videa</h3>
                <p className="text-slate-500 text-sm">Všechny pohyblivé vzpomínky na jednom místě</p>
              </div>
              <span className="text-xs uppercase tracking-widest font-bold text-rose-400">{videoItems.length} videí</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
              {videoItems.map((item, idx) => {
                const itemUrl = decryptedUrls[String(item.id)];
                if (!itemUrl) return null;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    onClick={() => setSelectedItem({ ...item, url: itemUrl })}
                    className={`relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-lg bg-slate-100 ${
                      item.size === 'large' ? 'col-span-2 row-span-2' : 
                      item.size === 'medium' ? 'col-span-2 row-span-1' : 
                      'col-span-1 row-span-1'
                    }`}
                  >
                    <div className="w-full h-full relative">
                      <video 
                        src={itemUrl} 
                        muted 
                        loop 
                        playsInline
                        autoPlay
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white/80 fill-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30" />
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <p className="text-white font-serif italic text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {item.title}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-serif text-slate-800">Fotky</h3>
                <p className="text-slate-500 text-sm">Všechny ostatní vzpomínky v obraze</p>
              </div>
              <span className="text-xs uppercase tracking-widest font-bold text-rose-400">{photoItems.length} fotek</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
              {photoItems.map((item, idx) => {
                const itemUrl = decryptedUrls[String(item.id)];
                if (!itemUrl) return null;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.03 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    onClick={() => setSelectedItem({ ...item, url: itemUrl })}
                    className={`relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-lg bg-slate-100 ${
                      item.size === 'large' ? 'col-span-2 row-span-2' : 
                      item.size === 'medium' ? 'col-span-2 row-span-1' : 
                      'col-span-1 row-span-1'
                    }`}
                  >
                    <img 
                      src={itemUrl} 
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <p className="text-white font-serif italic text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {item.title}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-full flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors flex items-center space-x-2 uppercase text-[10px] font-bold tracking-widest"
              >
                <span>Zavřít</span>
                <Maximize2 className="w-4 h-4" />
              </button>

              <div className="w-full rounded-3xl overflow-hidden shadow-2xl bg-black">
                {selectedItem.type === 'image' ? (
                  <img 
                    src={selectedItem.url} 
                    alt={selectedItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[80vh] object-contain mx-auto"
                  />
                ) : (
                  <video 
                    src={selectedItem.url} 
                    controls 
                    autoPlay
                    className="w-full h-auto max-h-[80vh] mx-auto"
                  />
                )}
              </div>
              
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-serif text-white mb-2">{selectedItem.title}</h3>
                <div className="h-1 w-12 bg-rose-500 mx-auto rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Letter = () => {
  return (
    <div className="px-4 max-w-3xl mx-auto">
      <motion.div 
        initial={{ rotate: -0.5, y: 30, opacity: 0 }}
        animate={{ rotate: 0, y: 0, opacity: 1 }}
        className="paper-texture shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-lg p-10 md:p-20 min-h-[600px] border border-stone-200 relative"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose-200 via-rose-400 to-rose-200" />
        <div className="font-serif text-xl md:text-2xl text-stone-800 leading-[2] whitespace-pre-wrap first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-rose-600">
          <Typewriter text={NDATA.letter.content} delay={25} />
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }} // Delay showing signature until some text is typed
          className="mt-20 flex justify-end"
        >
          <div className="text-center">
            <p className="font-serif italic text-stone-400 text-lg">S nekonečnou láskou,</p>
            <p className="text-4xl font-serif font-bold text-rose-700 mt-4 tracking-tight">Adam</p>
          </div>
        </motion.div>
        <div className="absolute bottom-10 left-10 opacity-5">
          <Heart className="w-32 h-32 text-rose-900" fill="currentColor" />
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleSendLove = () => {
    setShowBurst(true);
  };

  const navItems = [
    { id: 'home', icon: <Heart className="w-5 h-5" />, label: 'Domů' },
    { id: 'stats', icon: <BarChart2 className="w-5 h-5" />, label: 'Data' },
    { id: 'path', icon: <Calendar className="w-5 h-5" />, label: 'Cesta' },
    { id: 'gallery', icon: <ImageIcon className="w-5 h-5" />, label: 'Galerie' },
    { id: 'letter', icon: <Mail className="w-5 h-5" />, label: 'Dopis' },
  ];

  return (
    <div className="min-h-screen pb-40 pt-16 selection:bg-rose-100 selection:text-rose-600">
      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-100/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-50/50 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="text-center mb-20 px-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="inline-block mb-6 relative"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative group cursor-pointer" 
            onClick={handleSendLove}
          >
            <Heart className="w-20 h-20 text-rose-500 fill-rose-500/5 group-hover:fill-rose-500/20 transition-all duration-500" />
            <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-amber-400 animate-pulse" />
          </motion.div>
        </motion.div>
        <h1 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 tracking-tighter leading-none">
          Adam <span className="text-rose-500 font-light italic">&</span> Viktorka
        </h1>
        <div className="flex items-center justify-center mt-6 space-x-4">
          <div className="h-px w-12 bg-rose-200" />
          <p className="text-slate-400 uppercase tracking-[0.5em] text-[10px] font-bold">
            Naše věčnost začala 15. srpna 2024
          </p>
          <div className="h-px w-12 bg-rose-200" />
        </div>
      </header>

      <FloatingHearts />

      {/* Content Area */}
      <main className="container mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="space-y-20">
                <div className="text-center px-4">
                  <h2 className="text-3xl font-serif italic text-slate-500 mb-12">
                    Každá vteřina s Tebou je darem...
                  </h2>
                  <Timer startDate={NDATA.period.start} />
                </div>
                
                <div className="flex flex-col items-center space-y-6 px-4">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(244, 63, 94, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendLove}
                    className="bg-rose-500 text-white px-12 py-5 rounded-full font-bold text-lg shadow-2xl shadow-rose-200 flex items-center space-x-3 group transition-all"
                  >
                    <Heart className="w-6 h-6 group-hover:fill-white transition-colors" />
                    <span>Poslat kousek srdce</span>
                  </motion.button>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Dotkni se a pošli lásku</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Stats />
            </motion.div>
          )}

          {activeTab === 'path' && (
            <motion.div
              key="path"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Timeline />
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Gallery />
            </motion.div>
          )}

          {activeTab === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Letter />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Heart Burst Animation */}
      {showBurst && <HeartBurst onComplete={() => setShowBurst(false)} />}

      {/* Navigation */}
      <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-lg">
        <div className="glass rounded-[2.5rem] p-3 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center flex-1 h-16 rounded-3xl transition-all duration-500 ${
                activeTab === item.id ? 'text-rose-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-rose-50 rounded-[1.5rem] -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {item.icon}
              <span className="text-[9px] mt-1.5 font-bold uppercase tracking-widest">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Footer Decoration */}
      <footer className="mt-32 text-center pb-16 px-4">
        <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent mb-8" />
        <p className="font-serif italic text-slate-400 text-sm">
          Navždy Tvůj, navždy Moje, navždy Naše.
        </p>
        <p className="text-[9px] text-slate-300 uppercase tracking-[0.4em] mt-4 font-bold">
          Adam & Viktorka • 2024 — 2026
        </p>
      </footer>
    </div>
  );
}
