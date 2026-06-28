'use client';

import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  title: string;
  bio: string;
}

export default function TeamSection({ team }: { team: TeamMember[] }) {
  const colors = ['from-purple-500/20 to-blue-500/20', 'from-blue-500/20 to-cyan-500/20', 'from-pink-500/20 to-orange-500/20', 'from-green-500/20 to-teal-500/20'];

  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: 'var(--accent)' }}>
            The Team
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            World-class founders
          </h2>
          <p className="text-neutral-500 mt-2 text-sm">Combined experience: several lifetimes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card p-6 group hover:border-white/10 transition-all"
            >
              {/* Avatar placeholder */}
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors[i % colors.length]} mb-4 flex items-center justify-center text-2xl`}
              >
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-sm font-medium mb-3" style={{ color: 'var(--accent)' }}>
                {member.title}
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
