import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { pricingTiers } from '@/data/pricing';

export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choisissez votre challenge
          </h2>
          <p className="text-muted-foreground text-lg">
            Trois niveaux adaptés à vos objectifs. Passez le challenge et 
            accédez à du capital réel pour trader.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`relative h-full ${tier.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-4">
                    Plus populaire
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">€{tier.price}</span>
                    <span className="text-muted-foreground">/challenge</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Capital de €{tier.capital.toLocaleString()}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Objectif profit</span>
                      <span className="font-medium">€{tier.targetProfit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Perte max/jour</span>
                      <span className="font-medium">€{tier.maxDailyLoss.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Perte max totale</span>
                      <span className="font-medium">€{tier.maxTotalLoss.toLocaleString()}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full" 
                    variant={tier.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href={`/signup?plan=${tier.id}`}>
                      Choisir {tier.name}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Tous les challenges incluent 2 phases. Phase 1 = 10% profit target, 
            Phase 2 = 5% profit target.
          </p>
        </div>
      </div>
    </section>
  );
}
