import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, Suspense, lazy } from 'react';
import {
  CreditCard, Users, Zap, Download, Palette, Shield,
  GraduationCap, School, Briefcase, CalendarDays,
  ArrowRight, Sparkles, ChevronRight, ChevronDown,
  Check, Eye, FileText, QrCode, Lock, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const HeroScene = lazy(() => import('@/components/3d/HeroScene'));
const FloatingCards3D = lazy(() => import('@/components/3d/FloatingCards3D'));

const CARD_TYPES = [
  { type: 'university', label: 'University', icon: GraduationCap, desc: 'Academic cards with crests & QR', gradient: 'from-purple-600 to-violet-500', path: '/create?type=university' },
  { type: 'school', label: 'School', icon: School, desc: 'Student cards with photo & class info', gradient: 'from-cyan-500 to-blue-500', path: '/create?type=school' },
  { type: 'employee', label: 'Employee', icon: Briefcase, desc: 'Corporate badges with departments', gradient: 'from-pink-500 to-rose-500', path: '/create?type=employee' },
  { type: 'event', label: 'Event', icon: CalendarDays, desc: 'Conference passes with QR access', gradient: 'from-amber-500 to-orange-500', path: '/create?type=event' },
];

const FEATURES = [
  { icon: Palette, title: '216+ Templates', desc: 'Horizontal, vertical, sidebar, wave, diagonal & badge layouts' },
  { icon: Users, title: 'Bulk Generation', desc: 'Upload CSV and generate hundreds of cards with ZIP download' },
  { icon: Zap, title: 'Real-time Preview', desc: 'Watch your card transform live as you customize' },
  { icon: Download, title: 'HD Export', desc: 'Download as crisp PNG or print-ready PDF' },
  { icon: CreditCard, title: 'Front & Back', desc: 'Toggle back side with QR code, terms & emergency info' },
  { icon: Shield, title: '100% Private', desc: 'Everything runs in your browser — zero data leaves' },
];

const STEPS = [
  { num: '01', title: 'Choose Type', desc: 'Pick your card category', icon: CreditCard },
  { num: '02', title: 'Fill Details', desc: 'Add name, photo & info', icon: FileText },
  { num: '03', title: 'Preview', desc: 'Live preview with 216+ templates', icon: Eye },
  { num: '04', title: 'Download', desc: 'Export HD PNG or PDF', icon: Download },
];

const STATS = [
  { value: '216+', label: 'Templates', icon: Palette },
  { value: '54+', label: 'Signatures', icon: FileText },
  { value: '48+', label: 'Logos', icon: Star },
  { value: '100%', label: 'Private', icon: Lock },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.8 } }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

  return (
    <main ref={containerRef} className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <header>
      <motion.section
        className="min-h-screen flex items-center justify-center relative px-4"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* 3D Background */}
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>

        {/* Gradient overlays */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold border border-primary/30 bg-primary/10 text-primary mb-6 animate-shimmer-border">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              #1 Free Online ID Card Maker
              <ChevronRight className="w-3 h-3" />
            </span>
          </motion.div>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, type: 'spring', stiffness: 100 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.95]">
              <motion.span
                className="block text-foreground"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Design. Generate.
              </motion.span>
              <motion.span
                className="block gradient-text text-glow mt-1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Download Instantly.
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            Professional <span className="text-foreground font-semibold">university, school, employee & event</span> ID cards with{' '}
            <span className="text-foreground font-semibold">216+ templates</span>, handwritten signatures,
            bulk CSV generation & QR codes — <span className="text-foreground font-semibold">100% free & private</span>.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-glow text-base px-10 h-14 group relative overflow-hidden">
              <Link to="/create">
                <span className="relative z-10 flex items-center gap-2">
                  Start Creating Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-10 h-14 border-border/50 hover:border-primary/50 hover:shadow-neon transition-all duration-500">
              <Link to="/bulk">Bulk Generate</Link>
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="flex flex-col items-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <div className="flex -space-x-3">
              {['A', 'S', 'M', 'R', 'K'].map((letter, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-background flex items-center justify-center text-[11px] font-bold text-primary-foreground"
                  style={{ background: ['#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b', '#10b981'][i], zIndex: 5 - i }}
                >
                  {letter}
                </div>
              ))}
              <div className="w-9 h-9 rounded-full border-2 border-background bg-card flex items-center justify-center text-[10px] font-semibold text-muted-foreground" style={{ zIndex: 0 }}>
                +50K
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                Trusted by <span className="text-foreground font-semibold">50,000+</span> users worldwide
              </span>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center gap-2 text-muted-foreground/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to explore</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      </header>

      {/* === CHAPTER 2: STATS COUNTER === */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.03] to-background pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                className="text-center p-6 rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm hover:border-primary/30 hover:shadow-neon transition-all duration-500 group"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <Icon className="w-6 h-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl md:text-4xl font-black gradient-text mb-1">{value}</div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-[0.2em]">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === CHAPTER 3: CARD TYPES WITH 3D CARDS === */}
      <section className="py-28 px-4 relative">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-3 block">
              Choose Your Identity
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
              Four Cards,{' '}
              <span className="gradient-text">One Platform</span>
            </motion.h2>
          </motion.div>

          {/* 3D Card Preview */}
          <Suspense fallback={<div className="w-full h-[400px] flex items-center justify-center text-muted-foreground">Loading 3D...</div>}>
            <FloatingCards3D />
          </Suspense>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {CARD_TYPES.map(({ type, label, icon: Icon, desc, gradient, path }, i) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 40, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Link
                  to={path}
                  className="group block rounded-2xl p-5 border border-border/40 bg-card/20 backdrop-blur-sm hover:border-primary/40 hover:shadow-neon transition-all duration-500 hover:-translate-y-3 relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="relative text-base font-bold mb-1 text-foreground">{label}</h3>
                  <p className="relative text-xs text-muted-foreground mb-3">{desc}</p>
                  <div className="relative flex items-center text-xs font-medium text-primary group-hover:translate-x-2 transition-transform duration-300">
                    Create <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === CHAPTER 4: HOW IT WORKS - STORYTELLING TIMELINE === */}
      <section className="py-28 px-4 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[160px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[140px]" />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div className="text-center mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.span variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-3 block">
              The Journey
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-black tracking-tight">
              From Blank to{' '}
              <span className="gradient-text-cyan">Beautiful</span>
            </motion.h2>
          </motion.div>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-secondary/50" />

            {STEPS.map(({ num, title, desc, icon: Icon }, i) => (
              <motion.div
                key={num}
                className={`relative flex items-center gap-8 mb-20 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full gradient-primary shadow-neon z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: 'spring' }}
                />

                {/* Content card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`inline-flex rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm p-6 hover:border-primary/30 hover:shadow-neon transition-all duration-500 group ${i % 2 === 0 ? 'md:flex-row-reverse md:text-left' : ''}`}>
                    <div>
                      <div className="text-5xl font-black gradient-text opacity-20 mb-2">{num}</div>
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center mb-3 group-hover:shadow-neon group-hover:scale-110 transition-all">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === CHAPTER 5: FEATURES BENTO GRID === */}
      <section className="py-28 px-4 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[160px] -translate-x-1/2" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.span variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary mb-3 block">
              Power Features
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-6xl font-black tracking-tight mb-4">
              Built to{' '}
              <span className="gradient-text-cyan">Impress</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className={`group rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 relative overflow-hidden ${i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="p-6 relative z-10">
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:shadow-neon group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
                {/* Hover shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === CHAPTER 6: WHY US === */}
      <section className="py-28 px-4 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4 block">Why Choose Us</span>
              <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight">
                Built for{' '}
                <span className="gradient-text">Speed</span>
                <br />
                Designed for{' '}
                <span className="gradient-text-cyan">Beauty</span>
              </h2>
              <div className="space-y-4">
                {[
                  'Real handwritten signature fonts, not generic cursive',
                  '48 category-specific logos with actual icons',
                  'Canvas-rendered for pixel-perfect output',
                  'Bulk CSV import with ZIP download',
                  'QR codes for instant verification',
                  'Zero server uploads — 100% browser processing',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 group"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 group-hover:shadow-neon group-hover:scale-110 transition-all">
                      <Check className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="rounded-3xl border border-border/30 bg-card/20 backdrop-blur-sm p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
                <div className="relative grid grid-cols-2 gap-4">
                  {[
                    { icon: GraduationCap, label: 'University', color: 'text-purple-400' },
                    { icon: School, label: 'School', color: 'text-cyan-400' },
                    { icon: Briefcase, label: 'Employee', color: 'text-pink-400' },
                    { icon: CalendarDays, label: 'Event', color: 'text-amber-400' },
                  ].map(({ icon: Icon, label, color }, i) => (
                    <motion.div
                      key={label}
                      className="rounded-xl border border-border/30 bg-card/50 p-5 text-center hover:shadow-neon transition-all duration-300 hover:-translate-y-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
                    >
                      <Icon className={`w-8 h-8 ${color} mx-auto mb-2`} />
                      <span className="text-xs font-medium text-muted-foreground">{label}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="relative mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <QrCode className="w-4 h-4 text-primary" />
                  <span>All cards include QR code support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === CHAPTER 7: CTA === */}
      <section className="py-28 px-4 relative">
        <div className="container mx-auto relative z-10">
          <motion.div
            className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/50 to-accent/10 backdrop-blur-xl p-12 md:p-20 text-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 animate-pulse-glow pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="inline-block mb-6"
            >
              <Star className="w-10 h-10 text-primary" />
            </motion.div>

            <h2 className="text-3xl md:text-6xl font-black mb-4 tracking-tight relative">
              Ready to Create Your{' '}
              <span className="gradient-text text-glow">Shadow ID</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto relative">
              Join thousands creating professional, secure ID cards in minutes.
            </p>
            <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-glow text-lg px-12 h-16 group relative overflow-hidden">
              <Link to="/create">
                <span className="relative z-10 flex items-center gap-2">
                  Start Now — It's Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="text-xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Shadow</span>
              <span className="text-foreground ml-1">ID</span>
              <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent ml-1 italic">Gen</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              {['university', 'school', 'employee', 'event'].map(t => (
                <Link key={t} to={`/create?type=${t}`} className="text-muted-foreground hover:text-foreground transition-colors capitalize">{t}</Link>
              ))}
              <Link to="/create" className="text-muted-foreground hover:text-foreground transition-colors">Create</Link>
              <Link to="/bulk" className="text-muted-foreground hover:text-foreground transition-colors">Bulk</Link>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" /> 100% Client-Side
            </div>
          </div>
          <div className="text-center text-[11px] text-muted-foreground/60 border-t border-border/20 pt-4">
            © 2025 Shadow ID GEN. Free, private & professional ID card generator.
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
