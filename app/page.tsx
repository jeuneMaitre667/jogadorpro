'use client'

import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/HeroSection"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            JogadorPro
          </Link>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-gray-700 hover:text-green-600 transition">Features</a>
            <a href="#pricing" className="text-gray-700 hover:text-green-600 transition">Pricing</a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 transition">Contact</a>
          </div>
          <Link href="/_auth/login">
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-16">
        <HeroSection />
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Pourquoi JogadorPro?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              La plateforme complète pour trader avec du capital réel
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-3">Capital Réel</h3>
              <p className="text-gray-600">
                Prouvez vos compétences et obtenez accès à un capital réel jusqu'à €50,000 pour trader
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-2xl font-bold mb-3">Split Profits 80/20</h3>
              <p className="text-gray-600">
                Gardez 80% de vos profits. Nous prenons seulement 20% pour les frais d'infrastructure
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3">Paiement Rapide</h3>
              <p className="text-gray-600">
                Retirez vos profits en 24-48h via virement bancaire sécurisé
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-3">Challenges à Étapes</h3>
              <p className="text-gray-600">
                Phase 1: Qualification. Phase 2: Compte Financé. Gagnez de l'argent à chaque niveau
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-3">Dashboard Professionnel</h3>
              <p className="text-gray-600">
                Suivi en temps réel de vos statistiques, P&L, et performance
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition border border-gray-100">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold mb-3">Sécurité Garantie</h3>
              <p className="text-gray-600">
                Tous vos données sont chiffrées et vos fonds sont protégés
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Nos Challenges
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choisissez le challenge qui vous convient
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Starter */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <p className="text-gray-600 mb-6">Pour débuter votre parcours</p>
              <p className="text-5xl font-bold text-green-600 mb-8">€49</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Capital: €1,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Target Profit: €100</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Support Email</span>
                </div>
              </div>
              <Link href="/_dashboard/create-challenge">
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  Commencer
                </Button>
              </Link>
            </div>

            {/* Pro - Highlighted */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 shadow-xl border-2 border-green-600 transform md:scale-105 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                ⭐ Recommandé
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-gray-600 mb-6">Le plus populaire</p>
              <p className="text-5xl font-bold text-green-600 mb-8">€249</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Capital: €10,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Target Profit: €1,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Support Prioritaire</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Accès API</span>
                </div>
              </div>
              <Link href="/_dashboard/create-challenge">
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                  Commencer
                </Button>
              </Link>
            </div>

            {/* Elite */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-2">Elite</h3>
              <p className="text-gray-600 mb-6">Pour les traders sérieux</p>
              <p className="text-5xl font-bold text-green-600 mb-8">€749</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Capital: €50,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Target Profit: €5,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Mentoring Exclusif</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Compte Financé Garanti</span>
                </div>
              </div>
              <Link href="/_dashboard/create-challenge">
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  Commencer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à commencer?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez 500+ traders qui gagnent déjà avec JogadorPro
          </p>
          <Link href="/_auth/signup">
            <Button className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 font-semibold">
              Créer un compte maintenant
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">JogadorPro</h4>
              <p className="text-sm">La plateforme de prop trading pour les paris sportifs</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Produit</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Challenges</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">CGU</a></li>
                <li><a href="#" className="hover:text-white transition">Confidentialité</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:support@jogadorpro.com" className="hover:text-white transition">support@jogadorpro.com</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 JogadorPro. Tous les droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A primeira plataforma brasileira para traders de apostas esportivas. 
            Capital fornecido. Lucros compartilhados. 📊
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-lg px-8 py-6">
              Começar Agora
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Saiba Mais
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-green-600">500+</div>
              <p className="text-gray-600">Traders Ativos</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">R$ 50M</div>
              <p className="text-gray-600">Capital Fornecido</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600">24/7</div>
              <p className="text-gray-600">Suporte</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">
            Por que JogadorPro?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Capital Fornecido",
                desc: "Sem precisar investir seu próprio dinheiro. Começamos com você.",
                icon: "💰"
              },
              {
                title: "Lucros 70/30",
                desc: "70% do lucro é seu. 30% é nosso. Simples assim.",
                icon: "📈"
              },
              {
                title: "Tecnologia de Ponta",
                desc: "Plataforma de trading com API em tempo real e análises avançadas.",
                icon: "⚡"
              },
              {
                title: "Mentoria Exclusiva",
                desc: "Treinamento com traders profissionais e acesso a estratégias comprovadas.",
                icon: "🎓"
              },
              {
                title: "Comunidade Global",
                desc: "Network com 500+ traders brasileiros e internacionais.",
                icon: "🌎"
              },
              {
                title: "Sem Riscos",
                desc: "Você só ganha quando a plataforma ganha. Perdas cobertas por nós.",
                icon: "🛡️"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-lg border border-gray-200 hover:border-green-600 transition hover:shadow-lg">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-lg mb-8 opacity-90">
            Junte-se a centenas de traders que já estão lucando com JogadorPro.
            Processo de inscrição leva apenas 5 minutos.
          </p>
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 font-semibold">
            Inscrever-se Gratuitamente
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-4">JogadorPro</h4>
            <p className="text-sm">A plataforma de prop trading de apostas esportivas número 1 do Brasil.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Produto</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition">Plataforma</a></li>
              <li><a href="#" className="hover:text-white transition">Preços</a></li>
              <li><a href="#" className="hover:text-white transition">Segurança</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Empresa</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition">Sobre</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Carreiras</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition">Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition">Termos</a></li>
              <li><a href="#" className="hover:text-white transition">Compliance</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2026 JogadorPro. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
