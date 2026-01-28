'use client'

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            JogadorPro
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-gray-700 hover:text-green-600 transition">Features</a>
            <a href="#about" className="text-gray-700 hover:text-green-600 transition">Sobre</a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 transition">Contato</a>
          </div>
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            Login
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Seja um Prop Trader
          </h1>
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
