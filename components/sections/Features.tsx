import { Wallet, TrendingUp, Zap, Headphones, BarChart3, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Capital Réel',
    description: 'Tradez avec du capital réel jusqu\'à €50,000 sans risquer votre propre argent.',
    icon: Wallet,
  },
  {
    title: 'Split 80/20',
    description: 'Gardez 80% de vos profits. Le meilleur split du marché pour les traders.',
    icon: TrendingUp,
  },
  {
    title: 'Paiement Rapide',
    description: 'Recevez vos gains en 24-48h sur votre compte bancaire ou PIX.',
    icon: Zap,
  },
  {
    title: 'Support 24/7',
    description: 'Notre équipe est disponible à tout moment pour vous aider.',
    icon: Headphones,
  },
  {
    title: 'Dashboard Avancé',
    description: 'Suivez vos performances en temps réel avec nos outils d\'analyse.',
    icon: BarChart3,
  },
  {
    title: 'Communauté',
    description: 'Rejoignez une communauté de traders passionnés et partagez vos stratégies.',
    icon: Users,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tout ce dont vous avez besoin pour réussir
          </h2>
          <p className="text-muted-foreground text-lg">
            Une plateforme complète conçue pour les traders sérieux qui veulent 
            passer au niveau supérieur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-background rounded-2xl p-8 border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
