import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <a href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            JaraTravels
          </a>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
        
        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
            <p className="text-muted-foreground">
              A JaraTravels (RNAAT Nº598/2025 - Turismo de Portugal) respeita a sua privacidade 
              e está comprometida em proteger os seus dados pessoais. Esta política explica como 
              recolhemos, usamos e protegemos as suas informações.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Dados Recolhidos</h2>
            <p className="text-muted-foreground mb-4">
              Recolhemos os seguintes tipos de informação:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Nome completo e informações de contacto (email, telefone)</li>
              <li>Informações de pagamento necessárias para processar reservas</li>
              <li>Preferências de viagem e requisitos especiais</li>
              <li>Dados de navegação no website (cookies e análises)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Utilização dos Dados</h2>
            <p className="text-muted-foreground mb-4">
              Os seus dados são utilizados para:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Processar e confirmar reservas</li>
              <li>Comunicar sobre os serviços contratados</li>
              <li>Melhorar os nossos serviços e experiência do cliente</li>
              <li>Cumprir obrigações legais e regulatórias</li>
              <li>Enviar informações promocionais (apenas com consentimento)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Partilha de Dados</h2>
            <p className="text-muted-foreground">
              Não vendemos os seus dados pessoais. Podemos partilhar informações com parceiros 
              de confiança (como a GetYourGuide) apenas quando necessário para prestar os 
              serviços solicitados. Todos os parceiros são obrigados a proteger os seus dados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Segurança dos Dados</h2>
            <p className="text-muted-foreground">
              Implementamos medidas de segurança técnicas e organizacionais adequadas para 
              proteger os seus dados contra acesso não autorizado, perda ou destruição. 
              As transações de pagamento são processadas através de plataformas seguras.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Os Seus Direitos</h2>
            <p className="text-muted-foreground mb-4">
              De acordo com o RGPD, tem direito a:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Aceder aos seus dados pessoais</li>
              <li>Corrigir dados incorretos ou incompletos</li>
              <li>Solicitar a eliminação dos seus dados</li>
              <li>Opor-se ao processamento dos seus dados</li>
              <li>Solicitar a portabilidade dos dados</li>
              <li>Retirar o consentimento a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
            <p className="text-muted-foreground">
              O nosso website utiliza cookies para melhorar a sua experiência de navegação e 
              analisar o tráfego do site. Pode configurar o seu navegador para recusar cookies, 
              mas isso pode afetar algumas funcionalidades do website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Retenção de Dados</h2>
            <p className="text-muted-foreground">
              Mantemos os seus dados pessoais apenas pelo tempo necessário para cumprir as 
              finalidades descritas nesta política ou conforme exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contacto</h2>
            <p className="text-muted-foreground">
              Para exercer os seus direitos ou esclarecer dúvidas sobre esta política de 
              privacidade, contacte-nos através de jaratravels@hotmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Alterações à Política</h2>
            <p className="text-muted-foreground">
              Reservamo-nos o direito de atualizar esta política de privacidade. Quaisquer 
              alterações serão publicadas nesta página com a data da última atualização.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Última atualização: {new Date().toLocaleDateString('pt-PT')}
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
