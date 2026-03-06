'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Heart, Lock, Zap } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-dark text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-noplace-purple/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-bold"
          >
            <span className="text-noplace-purple">NoPlace</span>
          </motion.div>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#features" className="hover:text-noplace-purple transition">Fitur</a>
            <a href="#why" className="hover:text-noplace-purple transition">Kenapa</a>
            <a href="#waitlist" className="hover:text-noplace-purple transition">Beta</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-noplace-purple/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse_glow"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-noplace-blue/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse_glow animation-delay-2000"></div>
        </div>

        <motion.div
          className="text-center max-w-4xl relative z-10"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-6xl md:text-8xl font-black mb-6 leading-tight"
          >
            <span className="block mb-4 text-white">Ini adalah</span>
            <span className="inline-block bg-gradient-to-r from-noplace-purple via-noplace-blue to-noplace-glitch bg-clip-text text-transparent animate-glitch">
              NoPlace
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-400 mb-8 font-light"
          >
            Posting tanpa tekanan. Hilang dari kesempurnaan.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
          >
            "Tidak Ada Tempat. Hanya Kamu."<br />
            Ruang digital yang aman, jujur, dan bebas dari algoritma manipulatif.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex gap-4 justify-center flex-wrap"
          >
            <button className="px-8 py-4 bg-noplace-purple hover:bg-noplace-purple/80 rounded-lg font-bold transition group flex items-center gap-2">
              Masuk ke NoPlace
              <ArrowRight size={20} className="group-hover:translate-x-2 transition" />
            </button>
            <button className="px-8 py-4 border border-noplace-purple/50 hover:border-noplace-purple rounded-lg font-bold transition">
              Pelajari Lebih Lanjut
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Why NoPlace */}
      <section id="why" className="py-20 px-6 bg-black/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl font-bold mb-16 text-center"
          >
            Kenapa <span className="text-noplace-purple">NoPlace</span> Berbeda?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Lock size={32} />,
                title: 'Tanpa Follower Count',
                desc: 'Tidak ada metrik untuk membuat kamu merasa dinilai atau dibandingkan.',
              },
              {
                icon: <Zap size={32} />,
                title: 'Tanpa Algoritma Manipulatif',
                desc: 'Feed acak, mood-based. Postingan tidak dipromosikan untuk engagement palsu.',
              },
              {
                icon: <Heart size={32} />,
                title: 'Emotional-First Platform',
                desc: 'Reaksi emosi, AI mood detection, dan ruang untuk jujur tanpa perform.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="p-6 border border-noplace-purple/30 rounded-xl bg-gradient-to-br from-noplace-charcoal to-black hover:border-noplace-purple/60 transition group"
              >
                <div className="text-noplace-blue mb-4 group-hover:text-noplace-purple transition">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl font-bold mb-16 text-center"
          >
            Fitur-Fitur <span className="text-noplace-blue">Disruptif</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Post Anonim', desc: 'Ekspresikan diri tanpa identitas terekspos.' },
              { title: 'Mood-Based Feed', desc: '3AM Thoughts, Chaos Energy, Soft Vibes...' },
              { title: 'Emotional Reactions', desc: 'Relate, Too Real, Main Character, Silent Scream.' },
              { title: 'Late Night Mode', desc: 'UI berubah otomatis setelah jam 11 malam.' },
              { title: 'Chat 24 Jam Hilang', desc: 'Pesan otomatis terhapus, lebih intimate.' },
              { title: 'Disappear Mode', desc: 'Akun menghilang 7 hari untuk detox digital.' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 border-l-4 border-noplace-glitch bg-black/50 hover:bg-black/70 transition rounded"
              >
                <h3 className="text-xl font-bold mb-2 text-noplace-purple">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section id="waitlist" className="py-20 px-6 bg-gradient-to-r from-noplace-purple/10 to-noplace-blue/10 border-y border-noplace-purple/30">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold mb-6"
          >
            Siap Tinggalkan Algoritma?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mb-8"
          >
            Daftar sekarang untuk akses beta eksklusif. Invite-only, limited slots.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 flex-col sm:flex-row"
          >
            <input
              type="email"
              placeholder="Email kamu"
              className="flex-1 px-6 py-4 bg-white/10 border border-noplace-purple/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-noplace-purple"
            />
            <button className="px-8 py-4 bg-noplace-purple hover:bg-noplace-purple/80 rounded-lg font-bold transition">
              Daftar Beta
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-noplace-purple/20 bg-black/80">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4 text-noplace-purple">NoPlace</h4>
            <p className="text-gray-500 text-sm">Tidak ada tempat. Hanya kamu.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-noplace-purple transition">Features</a></li>
              <li><a href="#" className="hover:text-noplace-purple transition">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-noplace-purple transition">Privacy</a></li>
              <li><a href="#" className="hover:text-noplace-purple transition">Terms</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-noplace-purple transition">Twitter</a></li>
              <li><a href="#" className="hover:text-noplace-purple transition">Discord</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-noplace-purple/20 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2026 NoPlace. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
