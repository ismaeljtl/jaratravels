import Footer from "@/components/Footer";

const Terms = () => {
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
        <h1 className="text-4xl font-bold mb-8">Termos e Condições</h1>
        
        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Informações Gerais</h2>
            <p className="text-muted-foreground">
              A JaraTravels (RNAAT Nº598/2025 - Turismo de Portugal) oferece serviços de turismo 
              e viagens na Ilha da Madeira. Ao utilizar os nossos serviços, concorda com os 
              presentes termos e condições.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Reservas e Pagamentos</h2>
            <p className="text-muted-foreground">
              As reservas podem ser efetuadas através do nosso website ou parceiros autorizados. 
              O pagamento integral é necessário para confirmar a reserva. Aceitamos os métodos 
              de pagamento indicados no processo de reserva.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Cancelamentos e Reembolsos</h2>
            <p className="text-muted-foreground">
              Os cancelamentos devem ser comunicados com antecedência mínima de 24 horas. 
              Cancelamentos com menos de 24 horas de antecedência não terão direito a reembolso. 
              As políticas específicas podem variar consoante o tipo de serviço contratado.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Responsabilidades</h2>
            <p className="text-muted-foreground">
              A JaraTravels compromete-se a prestar os serviços contratados com qualidade e 
              profissionalismo. No entanto, não nos responsabilizamos por circunstâncias fora 
              do nosso controlo, incluindo condições meteorológicas adversas ou casos de força maior.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Comportamento dos Clientes</h2>
            <p className="text-muted-foreground">
              Os clientes devem comportar-se de forma adequada durante os serviços. 
              Reservamo-nos o direito de recusar ou terminar serviços em caso de comportamento 
              inadequado, sem direito a reembolso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Modificações</h2>
            <p className="text-muted-foreground">
              A JaraTravels reserva-se o direito de modificar estes termos e condições a 
              qualquer momento. As alterações entrarão em vigor imediatamente após a sua 
              publicação no website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Lei Aplicável</h2>
            <p className="text-muted-foreground">
              Estes termos e condições são regidos pela lei portuguesa. Qualquer litígio 
              será submetido aos tribunais competentes em Portugal.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
