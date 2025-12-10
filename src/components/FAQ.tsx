import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Como posso fazer uma reserva?",
      answer: "Pode fazer a sua reserva diretamente através do nosso website ou através dos nossos parceiros autorizados como a GetYourGuide. Basta selecionar o serviço desejado, escolher a data e seguir os passos para concluir a reserva."
    },
    {
      question: "Qual é a política de cancelamento?",
      answer: "Os cancelamentos devem ser comunicados com antecedência mínima de 24 horas para ter direito a reembolso total. Cancelamentos com menos de 24 horas não terão direito a reembolso. As políticas específicas podem variar consoante o tipo de serviço contratado."
    },
    {
      question: "O que acontece se o tempo estiver mau?",
      answer: "A segurança dos nossos clientes é a nossa prioridade. Em caso de condições meteorológicas adversas que impossibilitem a realização do passeio, oferecemos a possibilidade de reagendar para outra data ou reembolso total do valor pago."
    },
    {
      question: "Os passeios incluem transporte?",
      answer: "Sim, a maioria dos nossos serviços inclui transporte de ida e volta desde pontos de recolha convenientes. Os detalhes específicos de cada serviço, incluindo pontos de recolha, são fornecidos no momento da reserva."
    },
    {
      question: "Que tipo de passeios estão disponíveis?",
      answer: "Oferecemos uma variedade de experiências incluindo tours pela ilha, passeios personalizados, eventos especiais e muito mais. Todos os nossos serviços são adaptáveis às suas preferências e necessidades."
    },
    {
      question: "É necessário seguro para os passeios?",
      answer: "Todos os nossos serviços incluem seguro de responsabilidade civil. No entanto, recomendamos que tenha um seguro de viagem pessoal para cobrir eventuais imprevistos ou emergências médicas."
    },
    {
      question: "Posso personalizar um passeio?",
      answer: "Sim! Oferecemos passeios personalizados adaptados aos seus interesses e preferências. Entre em contacto connosco através do email jaratravels@hotmail.com ou Instagram para discutir as suas necessidades específicas."
    },
    {
      question: "Quantas pessoas podem participar num passeio?",
      answer: "A capacidade varia consoante o tipo de serviço. Mas efetuamos sobretudo experiências privadas para pequenos grupos, até 10 pessoas. Os detalhes específicos estão disponíveis na descrição de cada serviço."
    },
    {
      question: "É necessário conhecimento prévio ou condição física especial?",
      answer: "A maioria dos nossos passeios é adequada para todos os níveis de condição física. Informações específicas sobre requisitos ou dificuldade são fornecidas na descrição de cada atividade. Se tiver dúvidas, contacte-nos."
    },
    {
      question: "A JaraTravels é uma empresa registada?",
      answer: "Sim, somos uma empresa oficialmente registada no RNAAT Nº598/2025 - Turismo de Portugal, garantindo todos os padrões de qualidade e segurança exigidos pela legislação portuguesa."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Perguntas Frequentes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encontre respostas para as questões mais comuns sobre os nossos serviços
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Não encontrou a resposta que procurava?
          </p>
          <a 
            href="mailto:jaratravels@hotmail.com"
            className="text-primary hover:underline font-semibold"
          >
            Entre em contacto connosco
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
