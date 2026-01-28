import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { testimonials } from '@/data/pricing';
import { Quote } from 'lucide-react';

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ce que disent nos traders
          </h2>
          <p className="text-muted-foreground text-lg">
            Rejoignez des milliers de traders qui ont transformé leur passion 
            en source de revenus avec JogadorPro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <p className="text-muted-foreground mb-6">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">4.9/5</div>
            <div className="text-sm text-muted-foreground">Note moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">95%</div>
            <div className="text-sm text-muted-foreground">Traders satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">€500K+</div>
            <div className="text-sm text-muted-foreground">Payouts effectués</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">24h</div>
            <div className="text-sm text-muted-foreground">Délai moyen payout</div>
          </div>
        </div>
      </div>
    </section>
  );
}
