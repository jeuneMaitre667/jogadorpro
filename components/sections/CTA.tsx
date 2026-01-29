import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function CTA() {
  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 md:py-24"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
          </div>

          <div className="relative text-center max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/10">
                <TrendingUp className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Prêt à devenir un trader pro ?
            </h2>
            
            <p className="text-lg text-primary-foreground/80 mb-8">
              Rejoignez plus de 5,000 traders qui ont déjà franchi le pas. 
              Passez notre challenge et accédez à du capital réel dès aujourd'hui.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="gap-2">
                <Link href="/signup">
                  Commencer gratuitement
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/pricing">Voir les tarifs</Link>
              </Button>
            </div>

            <p className="text-sm text-primary-foreground/60 mt-6">
              Inscription gratuite. Aucune carte de crédit requise.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
