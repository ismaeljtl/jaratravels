export type Language = 'pt' | 'en' | 'es';

export const translations = {
  pt: {
    // Navigation
    nav: {
      services: "Serviços",
      tours: "Tours",
      about: "Sobre",
      faq: "FAQ",
      contact: "Contacto",
      booking: "Reservar",
    },
    // Hero
    hero: {
      title: "JaraTravels",
      subtitle: "Descubra experiências inesquecíveis através dos nossos tours, passeios e eventos exclusivos",
      bookNow: "Reserve Agora",
      ourServices: "Os nossos Serviços",
    },
    // Services
    services: {
      title: "Os nossos Serviços",
      subtitle: "Oferecemos experiências de viagem completas, desde tours guiados até eventos personalizados",
      guidedTours: "Tours Guiados",
      guidedToursDesc: "Explore destinos incríveis com guias especializados e roteiros cuidadosamente planeados",
      customTrips: "Passeios Personalizados",
      customTripsDesc: "Experiências únicas adaptadas aos seus interesses e preferências",
      specialEvents: "Eventos Especiais",
      specialEventsDesc: "Organizamos eventos memoráveis para grupos e ocasiões especiais",
    },
    // Tours
    tours: {
      title: "Tours",
      subtitle: "Explore as melhores experiências na região de Lisboa e arredores",
      bookNow: "Reservar Agora",
      fullDay: "Full day",
      categories: {
        cultural: "Cultural",
        photography: "Fotografia",
        historical: "Histórico",
        maritime: "Marítimo",
        nature: "Natureza",
        gastronomy: "Gastronomia",
      },
      items: [
        {
          title: "Tour Villa & Gardens",
          description: "Passeio guiado pelos belos jardins e vila histórica de Seixal.",
        },
        {
          title: "Tour Instax Photos",
          description: "Tire fotos polaroid instantâneas enquanto descobre joias locais.",
        },
        {
          title: "Seixal Medieval",
          description: "Volte no tempo com um tour temático medieval.",
        },
        {
          title: "Boatrip Seixal",
          description: "Navegue pela bela Baía de Seixal, a bordo de um dos barcos típicos do passado. Visite o Moinho de Maré de Corroios. Bebida de boas-vindas, água e snacks a bordo.",
        },
        {
          title: "Sesimbra Emotion",
          description: "Experiência única no Rio Sado para observar golfinhos.",
        },
        {
          title: "Setúbal & Arrábida",
          description: "Arrábida é uma reserva natural protegida classificada pela UNESCO cuja história está escrita nas pedras, e a qualidade de vida pode ser sentida no ar, com uma paisagem única e um almoço típico \"Choco frito\"",
        },
        {
          title: "Azeitão Vineyard Tour & Wine Tasting",
          description: "Escapadela rápida numa pequena vila chamada Azeitão, uma das regiões vinícolas mais importantes de Portugal com pastelaria deliciosa.",
        },
        {
          title: "Almada - Cristo Rei",
          description: "No coração do Rio Tejo, uma peça única da religião portuguesa, Cristo Rei com 110 metros e uma plataforma de observação elevada com vista panorâmica de Lisboa e a ponte 25 de Abril!",
        },
        {
          title: "White Gold Route",
          description: "Alcochete, terra do sal, chamado 'Ouro Branco' tem uma bela paisagem sob o Rio Tejo, cenário idílico para um passeio à beira-mar. Observando a nossa história e os nossos costumes, contemple a natureza ao longo de uma rota.",
        },
      ],
    },
    // About
    about: {
      badge: "Sobre Nós",
      title: "Criamos Experiências de Viagem Memoráveis",
      description1: "A JaraTravels é especializada em criar experiências de viagem únicas e inesquecíveis. Trabalhamos com pequenos grupos de forma intimista e mais local. Com anos de experiência no setor do turismo, oferecemos serviços de qualidade superior e atenção personalizada a cada cliente.",
      description2: "Trabalhamos em parceria com plataformas líderes como a GetYourGuide para garantir as melhores experiências e facilidade nas reservas.",
      registration: "Empresa registrada no RNAAT Nº598/2025 - Turismo de Portugal",
      features: [
        "Tours guiados por profissionais especializados",
        "Parceria oficial com GetYourGuide",
        "Experiências personalizadas para cada cliente",
        "Organização completa de eventos",
      ],
      whyChoose: "Por que escolher JaraTravels?",
      reasons: [
        "Experiência comprovada no setor",
        "Atendimento personalizado",
        "Parcerias com as melhores plataformas",
        "Preços competitivos",
        "Satisfação garantida",
      ],
    },
    // Contact
    contact: {
      title: "Entre em Contacto",
      subtitle: "Pronto para a sua próxima aventura? Contacte-nos e comecemos a planear!",
      formTitle: "Envie-nos uma Mensagem",
      formSubtitle: "Preencha o formulário e responderemos o mais breve possível",
      name: "Seu Nome",
      email: "Seu Email",
      phone: "Seu Telefone",
      message: "Sua Mensagem",
      send: "Enviar Mensagem",
      successMessage: "Mensagem enviada! Entraremos em contacto em breve.",
      location: "Localização",
    },
    // FAQ
    faq: {
      title: "Perguntas Frequentes",
      subtitle: "Encontre respostas para as questões mais comuns sobre os nossos serviços",
      notFound: "Não encontrou a resposta que procurava?",
      contactUs: "Entre em contacto connosco",
      items: [
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
          answer: "Oferecemos uma variedade de experiências incluindo tours pela Margem Sul, passeios personalizados, eventos especiais e muito mais. Todos os nossos serviços são adaptáveis às suas preferências e necessidades."
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
      ],
    },
    // Footer
    footer: {
      tagline: "Criando experiências de viagem inesquecíveis",
      legalInfo: "Informação Legal",
      terms: "Termos e Condições",
      privacy: "Política de Privacidade",
      complaints: "Livro de Reclamações",
      languages: "Falamos",
      copyright: "Todos os direitos reservados.",
      installApp: "Instalar App",
    },
    // Install
    install: {
      title: "Instalar App",
      installed: "App Instalada!",
      installedDesc: "A JaraTravels já está instalada no teu dispositivo.",
      backToApp: "Voltar à App",
      mainTitle: "Instala a JaraTravels",
      mainDesc: "Adiciona a nossa app ao teu ecrã inicial para acesso rápido às melhores experiências.",
      quickAccess: "Acesso Rápido",
      quickAccessDesc: "Abre a app diretamente do ecrã inicial, como qualquer outra app.",
      worksOffline: "Funciona Offline",
      worksOfflineDesc: "Acede às informações mesmo sem ligação à internet.",
      installNow: "Instalar Agora",
      iosTitle: "Como instalar no iPhone/iPad",
      iosStep1: "Toca no botão Partilhar",
      iosStep1Desc: "Na barra inferior do Safari",
      iosStep2: "Seleciona \"Adicionar ao Ecrã Principal\"",
      iosStep2Desc: "Desliza para encontrar a opção",
      iosStep3: "Confirma tocando em \"Adicionar\"",
      androidTitle: "Como instalar no Android",
      androidStep1: "Toca no menu do browser",
      androidStep1Desc: "Os três pontos no canto superior",
      androidStep2: "Seleciona \"Instalar app\" ou \"Adicionar ao ecrã inicial\"",
      androidStep3: "Confirma a instalação",
      backToSite: "Voltar ao Site",
    },
    // Booking
    booking: {
      title: "Reserve sua Experiência",
      getYourGuideTitle: "Reserva Instantânea via GetYourGuide",
      getYourGuideDesc: "Reserve agora o nosso tour guiado a pé pelo Seixal com degustação de pastel de nata através da GetYourGuide - confirmação imediata!",
      bookOnGetYourGuide: "Reservar no GetYourGuide",
      ourServices: "Os nossos Serviços",
      chooseExperience: "Escolha a experiência perfeita para você",
      whatsIncluded: "O que está incluído:",
      importantInfo: "Informações Importantes",
      meetingPoint: "Ponto de Encontro",
      meetingPointDesc: "Seixal, Portugal (local exato será confirmado)",
      groups: "Grupos",
      groupsDesc: "Exclusivo até 10 pessoas por grupo. Desconto para grupos acima de 6 pessoas",
      cancellation: "Cancelamento",
      cancellationDesc: "Cancelamento gratuito até 24h antes",
      formTitle: "Formulário de Reserva",
      formSubtitle: "Preencha os dados abaixo para realizar sua reserva",
      fullName: "Nome Completo",
      email: "Email",
      phone: "Telefone",
      service: "Serviço",
      selectService: "Selecione um serviço",
      preferredDate: "Data Preferida",
      participants: "Número de Participantes",
      participantsPlaceholder: "Ex: 2",
      paymentMethod: "Método de Pagamento",
      selectPaymentMethod: "Selecione método de pagamento",
      mbway: "MBWay",
      bankTransfer: "Transferência Bancária",
      paypal: "PayPal",
      mbwayInfo: "Pagamento via MBWay",
      mbwayDesc: "Após confirmar a reserva, enviaremos uma solicitação MBWay para o número de telefone fornecido.",
      mbwayNumber: "Número MBWay:",
      fillPhoneFirst: "Por favor, preencha o seu telefone acima",
      bankTransferInfo: "Dados para Transferência Bancária",
      iban: "IBAN:",
      holder: "Titular:",
      bank: "Banco:",
      reference: "Referência:",
      referenceDesc: "Por favor, indique o seu nome na descrição da transferência",
      paypalInfo: "Pagamento via PayPal",
      paypalDesc: "Após confirmar a reserva, enviaremos um link de pagamento PayPal para o email fornecido.",
      paypalEmail: "Email para PayPal:",
      fillEmailFirst: "Por favor, preencha o seu email acima",
      additionalMessage: "Mensagem Adicional",
      additionalMessagePlaceholder: "Alguma informação adicional ou pedido especial?",
      confirmBooking: "Confirmar Reserva",
      submitting: "Enviando...",
      termsAgreement: "Ao enviar, você concorda com nossos termos de serviço e política de privacidade",
      orBookVia: "Ou reserve diretamente via GetYourGuide",
      bookingSuccess: "Reserva enviada com sucesso!",
      bookingError: "Erro ao enviar reserva. Tente novamente.",
    },
    // Confirmation
    confirmation: {
      title: "Confirmação de Reserva",
      successTitle: "Reserva Confirmada!",
      successMessage: "Obrigado, {name}! Recebemos a sua reserva e entraremos em contacto em breve.",
      bookingDetails: "Detalhes da Reserva",
      service: "Serviço",
      price: "Preço",
      duration: "Duração",
      date: "Data",
      participants: "Participantes",
      person: "pessoa",
      people: "pessoas",
      additionalMessage: "Mensagem Adicional",
      contactInfo: "Informações de Contacto",
      email: "Email",
      phone: "Telefone",
      paymentInfo: "Informações de Pagamento",
      paymentMethod: "Método de Pagamento",
      mbwayInstructions: "Instruções para Pagamento via MBWay:",
      mbwayStep1: "Aguarde a nossa solicitação MBWay",
      mbwayStep2: "Confirme o pagamento de {price} no seu telemóvel",
      mbwayStep3: "Receberá um email de confirmação após o pagamento",
      mbwayNote: "A solicitação MBWay será enviada nas próximas 24 horas úteis",
      bankTransferData: "Dados para Transferência Bancária:",
      bankTransferNote: "Por favor, efetue o pagamento nas próximas 48 horas para confirmar a sua reserva",
      paypalInstructions: "Instruções para Pagamento via PayPal:",
      paypalStep1: "Clique no link acima para aceder ao PayPal",
      paypalStep2: "Insira o valor {price} e adicione a descrição",
      paypalStep3: "Após o pagamento, receberá a confirmação por email",
      paypalNote: "Por favor, efetue o pagamento nas próximas 48 horas para confirmar a sua reserva",
      proofOfPayment: "Comprovativo de Pagamento",
      proofOfPaymentDesc: "Após efetuar o pagamento, por favor envie o comprovativo para:",
      proofOfPaymentNote: "Inclua o seu nome e o serviço reservado na mensagem. A sua reserva só será confirmada após recebermos o comprovativo.",
      meetingPoint: "Ponto de Encontro",
      meetingPointDesc: "O local exato do ponto de encontro será confirmado por email ou telefone após a confirmação do pagamento.",
      locationLabel: "Localização:",
      nextSteps: "Próximos Passos",
      step1: "Enviámos um email de confirmação para {email}",
      step2: "Complete o pagamento usando o método selecionado ({method})",
      step3: "Entraremos em contacto por email ou telefone para confirmar os detalhes finais",
      step4: "Prepare-se para uma experiência inesquecível!",
      newBooking: "Nova Reserva",
      backToHome: "Voltar ao Início",
      needHelp: "Precisa de ajuda? Contacte-nos pelo email",
      orPhone: "ou pelo telefone",
      iban: "IBAN:",
      holder: "Titular:",
      bank: "Banco:",
      value: "Valor:",
      description: "Descrição:",
    },
    // Common
    common: {
      loading: "A carregar...",
      error: "Erro",
      success: "Sucesso",
      back: "Voltar",
      next: "Próximo",
      close: "Fechar",
    },
    // Privacy
    privacy: {
      title: "Política de Privacidade",
      intro: {
        title: "1. Introdução",
        text: "A JaraTravels (RNAAT Nº598/2025 - Turismo de Portugal) respeita a sua privacidade e está comprometida em proteger os seus dados pessoais. Esta política explica como recolhemos, usamos e protegemos as suas informações.",
      },
      dataCollected: {
        title: "2. Dados Recolhidos",
        text: "Recolhemos os seguintes tipos de informação:",
        items: [
          "Nome completo e informações de contacto (email, telefone)",
          "Informações de pagamento necessárias para processar reservas",
          "Preferências de viagem e requisitos especiais",
          "Dados de navegação no website (cookies e análises)",
        ],
      },
      dataUsage: {
        title: "3. Utilização dos Dados",
        text: "Os seus dados são utilizados para:",
        items: [
          "Processar e confirmar reservas",
          "Comunicar sobre os serviços contratados",
          "Melhorar os nossos serviços e experiência do cliente",
          "Cumprir obrigações legais e regulatórias",
          "Enviar informações promocionais (apenas com consentimento)",
        ],
      },
      dataSharing: {
        title: "4. Partilha de Dados",
        text: "Não vendemos os seus dados pessoais. Podemos partilhar informações com parceiros de confiança (como a GetYourGuide) apenas quando necessário para prestar os serviços solicitados. Todos os parceiros são obrigados a proteger os seus dados.",
      },
      dataSecurity: {
        title: "5. Segurança dos Dados",
        text: "Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger os seus dados contra acesso não autorizado, perda ou destruição. As transações de pagamento são processadas através de plataformas seguras.",
      },
      yourRights: {
        title: "6. Os Seus Direitos",
        text: "De acordo com o RGPD, tem direito a:",
        items: [
          "Aceder aos seus dados pessoais",
          "Corrigir dados incorretos ou incompletos",
          "Solicitar a eliminação dos seus dados",
          "Opor-se ao processamento dos seus dados",
          "Solicitar a portabilidade dos dados",
          "Retirar o consentimento a qualquer momento",
        ],
      },
      cookies: {
        title: "7. Cookies",
        text: "O nosso website utiliza cookies para melhorar a sua experiência de navegação e analisar o tráfego do site. Pode configurar o seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades do website.",
      },
      dataRetention: {
        title: "8. Retenção de Dados",
        text: "Mantemos os seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política ou conforme exigido por lei.",
      },
      contact: {
        title: "9. Contacto",
        text: "Para exercer os seus direitos ou esclarecer dúvidas sobre esta política de privacidade, contacte-nos através de jaratravels@hotmail.com.",
      },
      changes: {
        title: "10. Alterações à Política",
        text: "Reservamo-nos o direito de atualizar esta política de privacidade. Quaisquer alterações serão publicadas nesta página com a data da última atualização.",
        lastUpdate: "Última atualização:",
      },
    },
    // Terms
    terms: {
      title: "Termos e Condições",
      general: {
        title: "1. Informações Gerais",
        text: "A JaraTravels (RNAAT Nº598/2025 - Turismo de Portugal) oferece serviços de turismo e animação turística no Seixal, Distrito de Setúbal, Portugal Continental. Ao utilizar os nossos serviços, concorda com os presentes termos e condições.",
      },
      reservations: {
        title: "2. Reservas e Pagamentos",
        text: "As reservas podem ser efetuadas através do nosso website ou parceiros autorizados. O pagamento integral é necessário para confirmar a reserva. Aceitamos os métodos de pagamento indicados no processo de reserva.",
      },
      cancellations: {
        title: "3. Cancelamentos e Reembolsos",
        text: "Os cancelamentos devem ser comunicados com antecedência mínima de 24 horas. Cancelamentos com menos de 24 horas de antecedência não terão direito a reembolso. As políticas específicas podem variar consoante o tipo de serviço contratado.",
      },
      responsibilities: {
        title: "4. Responsabilidades",
        text: "A JaraTravels compromete-se a prestar os serviços contratados com qualidade e profissionalismo. No entanto, não nos responsabilizamos por circunstâncias fora do nosso controlo, incluindo condições meteorológicas adversas ou casos de força maior.",
      },
      behavior: {
        title: "5. Comportamento dos Clientes",
        text: "Os clientes devem comportar-se de forma adequada durante os serviços. Reservamo-nos o direito de recusar ou terminar serviços em caso de comportamento inadequado, sem direito a reembolso.",
      },
      modifications: {
        title: "6. Modificações",
        text: "A JaraTravels reserva-se o direito de modificar estes termos e condições a qualquer momento. As alterações entrarão em vigor imediatamente após a sua publicação no website.",
      },
      applicableLaw: {
        title: "7. Lei Aplicável",
        text: "Estes termos e condições são regidos pela lei portuguesa. Qualquer litígio será submetido aos tribunais competentes em Portugal.",
      },
    },
    // NotFound
    notFound: {
      title: "404",
      message: "Ops! Página não encontrada",
      backHome: "Voltar ao Início",
    },
  },
  en: {
    // Navigation
    nav: {
      services: "Services",
      tours: "Tours",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
      booking: "Book Now",
    },
    // Hero
    hero: {
      title: "JaraTravels",
      subtitle: "Discover unforgettable experiences through our exclusive tours, trips and events",
      bookNow: "Book Now",
      ourServices: "Our Services",
    },
    // Services
    services: {
      title: "Our Services",
      subtitle: "We offer complete travel experiences, from guided tours to personalized events",
      guidedTours: "Guided Tours",
      guidedToursDesc: "Explore amazing destinations with specialized guides and carefully planned itineraries",
      customTrips: "Custom Trips",
      customTripsDesc: "Unique experiences tailored to your interests and preferences",
      specialEvents: "Special Events",
      specialEventsDesc: "We organize memorable events for groups and special occasions",
    },
    // Tours
    tours: {
      title: "Our Tours",
      subtitle: "Explore the best experiences in the Lisbon region and surroundings",
      bookNow: "Book Now",
      fullDay: "Full day",
      categories: {
        cultural: "Cultural",
        photography: "Photography",
        historical: "Historical",
        maritime: "Maritime",
        nature: "Nature",
        gastronomy: "Gastronomy",
      },
      items: [
        {
          title: "Tour Villa & Gardens",
          description: "Guided walk through beautiful gardens and historic villa of Seixal.",
        },
        {
          title: "Tour Instax Photos",
          description: "Take instant polaroids while discovering local gems.",
        },
        {
          title: "Seixal Medieval",
          description: "Step back in time with a medieval-themed tour.",
        },
        {
          title: "Boatrip Seixal",
          description: "Sail through the beautiful Seixal Bay, aboard one of the typical boats of the past. Visit Corroios Tide Mill. Welcome drink, water and snacks aboard.",
        },
        {
          title: "Sesimbra Emotion",
          description: "Unique experience in Sado River to watch Dolphins.",
        },
        {
          title: "Setúbal & Arrábida",
          description: "Arrábida is a protected natural reserve classified by UNESCO… unique landscape and the traditional dish \"Choco Frito\" (fried cuttlefish)",
        },
        {
          title: "Azeitão Vineyard Tour & Wine Tasting",
          description: "Quick getaway in small town called Azeitão, one of the most important wine regions in Portugal with delicious pastry.",
        },
        {
          title: "Almada - Cristo Rei",
          description: "In the heart of the Tagus River, a unique piece of Portuguese religion, Cristo Rei with 110 meters and a high viewing platform with panoramic view of Lisbon and the bridge 25 de Abril!",
        },
        {
          title: "White Gold Route",
          description: "Alcochete, land of salt, called 'White gold' have a beautiful landscape under Tagus River, idyllic setting for a walk by the sea. Observing our history and our customs, contemplate nature along a route.",
        },
      ],
    },
    // About
    about: {
      badge: "About Us",
      title: "We Create Memorable Travel Experiences",
      description1: "JaraTravels specializes in creating unique and unforgettable travel experiences. We work with small groups in an intimate and local way. With years of experience in the tourism sector, we offer superior quality services and personalized attention to each client.",
      description2: "We partner with leading platforms like GetYourGuide to ensure the best experiences and easy bookings.",
      registration: "Company registered with RNAAT Nº598/2025 - Tourism of Portugal",
      features: [
        "Tours guided by specialized professionals",
        "Official partnership with GetYourGuide",
        "Personalized experiences for each client",
        "Complete event organization",
      ],
      whyChoose: "Why choose JaraTravels?",
      reasons: [
        "Proven experience in the sector",
        "Personalized service",
        "Partnerships with the best platforms",
        "Competitive prices",
        "Guaranteed satisfaction",
      ],
    },
    // Contact
    contact: {
      title: "Get in Touch",
      subtitle: "Ready for your next adventure? Contact us and let's start planning!",
      formTitle: "Send us a Message",
      formSubtitle: "Fill out the form and we'll respond as soon as possible",
      name: "Your Name",
      email: "Your Email",
      phone: "Your Phone",
      message: "Your Message",
      send: "Send Message",
      successMessage: "Message sent! We'll get in touch soon.",
      location: "Location",
    },
    // FAQ
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to the most common questions about our services",
      notFound: "Didn't find the answer you were looking for?",
      contactUs: "Contact us",
      items: [
        {
          question: "How can I make a reservation?",
          answer: "You can make your reservation directly through our website or through our authorized partners like GetYourGuide. Simply select the desired service, choose the date and follow the steps to complete the reservation."
        },
        {
          question: "What is the cancellation policy?",
          answer: "Cancellations must be communicated at least 24 hours in advance to be entitled to a full refund. Cancellations with less than 24 hours will not be entitled to a refund. Specific policies may vary depending on the type of service contracted."
        },
        {
          question: "What happens if the weather is bad?",
          answer: "The safety of our customers is our priority. In case of adverse weather conditions that make it impossible to carry out the tour, we offer the possibility of rescheduling to another date or a full refund of the amount paid."
        },
        {
          question: "Do the tours include transportation?",
          answer: "Yes, most of our services include round-trip transportation from convenient pickup points. The specific details of each service, including pickup points, are provided at the time of booking."
        },
        {
          question: "What types of tours are available?",
          answer: "We offer a variety of experiences including tours around the South Bank, personalized trips, special events and much more. All our services are adaptable to your preferences and needs."
        },
        {
          question: "Is insurance required for the tours?",
          answer: "All our services include civil liability insurance. However, we recommend that you have personal travel insurance to cover any unforeseen events or medical emergencies."
        },
        {
          question: "Can I customize a tour?",
          answer: "Yes! We offer personalized tours tailored to your interests and preferences. Contact us via email jaratravels@hotmail.com or Instagram to discuss your specific needs."
        },
        {
          question: "How many people can participate in a tour?",
          answer: "Capacity varies depending on the type of service. But we mainly carry out private experiences for small groups, up to 10 people. Specific details are available in the description of each service."
        },
        {
          question: "Is prior knowledge or special physical condition required?",
          answer: "Most of our tours are suitable for all fitness levels. Specific information about requirements or difficulty is provided in the description of each activity. If you have any questions, contact us."
        },
        {
          question: "Is JaraTravels a registered company?",
          answer: "Yes, we are an officially registered company with RNAAT Nº598/2025 - Tourism of Portugal, guaranteeing all quality and safety standards required by Portuguese legislation."
        }
      ],
    },
    // Footer
    footer: {
      tagline: "Creating unforgettable travel experiences",
      legalInfo: "Legal Information",
      terms: "Terms and Conditions",
      privacy: "Privacy Policy",
      complaints: "Complaints Book",
      languages: "We speak",
      copyright: "All rights reserved.",
      installApp: "Install App",
    },
    // Install
    install: {
      title: "Install App",
      installed: "App Installed!",
      installedDesc: "JaraTravels is already installed on your device.",
      backToApp: "Back to App",
      mainTitle: "Install JaraTravels",
      mainDesc: "Add our app to your home screen for quick access to the best experiences.",
      quickAccess: "Quick Access",
      quickAccessDesc: "Open the app directly from the home screen, like any other app.",
      worksOffline: "Works Offline",
      worksOfflineDesc: "Access information even without an internet connection.",
      installNow: "Install Now",
      iosTitle: "How to install on iPhone/iPad",
      iosStep1: "Tap the Share button",
      iosStep1Desc: "In the Safari bottom bar",
      iosStep2: "Select \"Add to Home Screen\"",
      iosStep2Desc: "Scroll to find the option",
      iosStep3: "Confirm by tapping \"Add\"",
      androidTitle: "How to install on Android",
      androidStep1: "Tap the browser menu",
      androidStep1Desc: "The three dots in the top corner",
      androidStep2: "Select \"Install app\" or \"Add to home screen\"",
      androidStep3: "Confirm the installation",
      backToSite: "Back to Site",
    },
    // Booking
    booking: {
      title: "Book Your Experience",
      getYourGuideTitle: "Instant Booking via GetYourGuide",
      getYourGuideDesc: "Book now our guided walking tour of Seixal with pastel de nata tasting through GetYourGuide - instant confirmation!",
      bookOnGetYourGuide: "Book on GetYourGuide",
      ourServices: "Our Services",
      chooseExperience: "Choose the perfect experience for you",
      whatsIncluded: "What's included:",
      importantInfo: "Important Information",
      meetingPoint: "Meeting Point",
      meetingPointDesc: "Seixal, Portugal (exact location will be confirmed)",
      groups: "Groups",
      groupsDesc: "Exclusive up to 10 people per group. Discount for groups over 6 people",
      cancellation: "Cancellation",
      cancellationDesc: "Free cancellation up to 24h before",
      formTitle: "Booking Form",
      formSubtitle: "Fill in the details below to make your booking",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone",
      service: "Service",
      selectService: "Select a service",
      preferredDate: "Preferred Date",
      participants: "Number of Participants",
      participantsPlaceholder: "e.g.: 2",
      paymentMethod: "Payment Method",
      selectPaymentMethod: "Select payment method",
      mbway: "MBWay",
      bankTransfer: "Bank Transfer",
      paypal: "PayPal",
      mbwayInfo: "Payment via MBWay",
      mbwayDesc: "After confirming the booking, we will send an MBWay request to the phone number provided.",
      mbwayNumber: "MBWay Number:",
      fillPhoneFirst: "Please fill in your phone above",
      bankTransferInfo: "Bank Transfer Details",
      iban: "IBAN:",
      holder: "Account Holder:",
      bank: "Bank:",
      reference: "Reference:",
      referenceDesc: "Please indicate your name in the transfer description",
      paypalInfo: "Payment via PayPal",
      paypalDesc: "After confirming the booking, we will send a PayPal payment link to the email provided.",
      paypalEmail: "Email for PayPal:",
      fillEmailFirst: "Please fill in your email above",
      additionalMessage: "Additional Message",
      additionalMessagePlaceholder: "Any additional information or special request?",
      confirmBooking: "Confirm Booking",
      submitting: "Submitting...",
      termsAgreement: "By submitting, you agree to our terms of service and privacy policy",
      orBookVia: "Or book directly via GetYourGuide",
      bookingSuccess: "Booking submitted successfully!",
      bookingError: "Error submitting booking. Please try again.",
    },
    // Confirmation
    confirmation: {
      title: "Booking Confirmation",
      successTitle: "Booking Confirmed!",
      successMessage: "Thank you, {name}! We received your booking and will contact you soon.",
      bookingDetails: "Booking Details",
      service: "Service",
      price: "Price",
      duration: "Duration",
      date: "Date",
      participants: "Participants",
      person: "person",
      people: "people",
      additionalMessage: "Additional Message",
      contactInfo: "Contact Information",
      email: "Email",
      phone: "Phone",
      paymentInfo: "Payment Information",
      paymentMethod: "Payment Method",
      mbwayInstructions: "Instructions for MBWay Payment:",
      mbwayStep1: "Wait for our MBWay request",
      mbwayStep2: "Confirm the payment of {price} on your phone",
      mbwayStep3: "You will receive a confirmation email after payment",
      mbwayNote: "The MBWay request will be sent within the next 24 business hours",
      bankTransferData: "Bank Transfer Details:",
      bankTransferNote: "Please make the payment within the next 48 hours to confirm your booking",
      paypalInstructions: "Instructions for PayPal Payment:",
      paypalStep1: "Click the link above to access PayPal",
      paypalStep2: "Enter the amount {price} and add the description",
      paypalStep3: "After payment, you will receive confirmation by email",
      paypalNote: "Please make the payment within the next 48 hours to confirm your booking",
      proofOfPayment: "Proof of Payment",
      proofOfPaymentDesc: "After making the payment, please send the proof to:",
      proofOfPaymentNote: "Include your name and the booked service in the message. Your booking will only be confirmed after we receive the proof.",
      meetingPoint: "Meeting Point",
      meetingPointDesc: "The exact meeting point location will be confirmed by email or phone after payment confirmation.",
      locationLabel: "Location:",
      nextSteps: "Next Steps",
      step1: "We sent a confirmation email to {email}",
      step2: "Complete the payment using the selected method ({method})",
      step3: "We will contact you by email or phone to confirm the final details",
      step4: "Get ready for an unforgettable experience!",
      newBooking: "New Booking",
      backToHome: "Back to Home",
      needHelp: "Need help? Contact us by email",
      orPhone: "or by phone",
      iban: "IBAN:",
      holder: "Account Holder:",
      bank: "Bank:",
      value: "Value:",
      description: "Description:",
    },
    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      back: "Back",
      next: "Next",
      close: "Close",
    },
    // Privacy
    privacy: {
      title: "Privacy Policy",
      intro: {
        title: "1. Introduction",
        text: "JaraTravels (RNAAT Nº598/2025 - Tourism of Portugal) respects your privacy and is committed to protecting your personal data. This policy explains how we collect, use and protect your information.",
      },
      dataCollected: {
        title: "2. Data Collected",
        text: "We collect the following types of information:",
        items: [
          "Full name and contact information (email, phone)",
          "Payment information necessary to process reservations",
          "Travel preferences and special requirements",
          "Website browsing data (cookies and analytics)",
        ],
      },
      dataUsage: {
        title: "3. Data Usage",
        text: "Your data is used to:",
        items: [
          "Process and confirm reservations",
          "Communicate about contracted services",
          "Improve our services and customer experience",
          "Comply with legal and regulatory obligations",
          "Send promotional information (only with consent)",
        ],
      },
      dataSharing: {
        title: "4. Data Sharing",
        text: "We do not sell your personal data. We may share information with trusted partners (such as GetYourGuide) only when necessary to provide requested services. All partners are required to protect your data.",
      },
      dataSecurity: {
        title: "5. Data Security",
        text: "We implement appropriate technical and organizational security measures to protect your data against unauthorized access, loss or destruction. Payment transactions are processed through secure platforms.",
      },
      yourRights: {
        title: "6. Your Rights",
        text: "Under GDPR, you have the right to:",
        items: [
          "Access your personal data",
          "Correct incorrect or incomplete data",
          "Request deletion of your data",
          "Object to processing of your data",
          "Request data portability",
          "Withdraw consent at any time",
        ],
      },
      cookies: {
        title: "7. Cookies",
        text: "Our website uses cookies to improve your browsing experience and analyze site traffic. You can configure your browser to refuse cookies, but this may affect some website functionality.",
      },
      dataRetention: {
        title: "8. Data Retention",
        text: "We keep your personal data only for as long as necessary to fulfill the purposes described in this policy or as required by law.",
      },
      contact: {
        title: "9. Contact",
        text: "To exercise your rights or clarify questions about this privacy policy, contact us at jaratravels@hotmail.com.",
      },
      changes: {
        title: "10. Policy Changes",
        text: "We reserve the right to update this privacy policy. Any changes will be published on this page with the date of the last update.",
        lastUpdate: "Last update:",
      },
    },
    // Terms
    terms: {
      title: "Terms and Conditions",
      general: {
        title: "1. General Information",
        text: "JaraTravels (RNAAT Nº598/2025 - Tourism of Portugal) offers tourism and tourist entertainment services in Seixal, Setúbal District, Continental Portugal. By using our services, you agree to these terms and conditions.",
      },
      reservations: {
        title: "2. Reservations and Payments",
        text: "Reservations can be made through our website or authorized partners. Full payment is required to confirm the reservation. We accept the payment methods indicated in the booking process.",
      },
      cancellations: {
        title: "3. Cancellations and Refunds",
        text: "Cancellations must be communicated at least 24 hours in advance. Cancellations with less than 24 hours notice will not be entitled to a refund. Specific policies may vary depending on the type of service contracted.",
      },
      responsibilities: {
        title: "4. Responsibilities",
        text: "JaraTravels is committed to providing contracted services with quality and professionalism. However, we are not responsible for circumstances beyond our control, including adverse weather conditions or force majeure.",
      },
      behavior: {
        title: "5. Customer Behavior",
        text: "Customers must behave appropriately during services. We reserve the right to refuse or terminate services in case of inappropriate behavior, without the right to a refund.",
      },
      modifications: {
        title: "6. Modifications",
        text: "JaraTravels reserves the right to modify these terms and conditions at any time. Changes will take effect immediately upon publication on the website.",
      },
      applicableLaw: {
        title: "7. Applicable Law",
        text: "These terms and conditions are governed by Portuguese law. Any dispute will be submitted to the competent courts in Portugal.",
      },
    },
    // NotFound
    notFound: {
      title: "404",
      message: "Oops! Page not found",
      backHome: "Return to Home",
    },
  },
  es: {
    // Navigation
    nav: {
      services: "Servicios",
      tours: "Tours",
      about: "Nosotros",
      faq: "FAQ",
      contact: "Contacto",
      booking: "Reservar",
    },
    // Hero
    hero: {
      title: "JaraTravels",
      subtitle: "Descubre experiencias inolvidables a través de nuestros tours, paseos y eventos exclusivos",
      bookNow: "Reservar Ahora",
      ourServices: "Nuestros Servicios",
    },
    // Services
    services: {
      title: "Nuestros Servicios",
      subtitle: "Ofrecemos experiencias de viaje completas, desde tours guiados hasta eventos personalizados",
      guidedTours: "Tours Guiados",
      guidedToursDesc: "Explore destinos increíbles con guías especializados e itinerarios cuidadosamente planificados",
      customTrips: "Paseos Personalizados",
      customTripsDesc: "Experiencias únicas adaptadas a sus intereses y preferencias",
      specialEvents: "Eventos Especiales",
      specialEventsDesc: "Organizamos eventos memorables para grupos y ocasiones especiales",
    },
    // Tours
    tours: {
      title: "Nuestros Tours",
      subtitle: "Explore las mejores experiencias en la región de Lisboa y alrededores",
      bookNow: "Reservar Ahora",
      fullDay: "Día completo",
      categories: {
        cultural: "Cultural",
        photography: "Fotografía",
        historical: "Histórico",
        maritime: "Marítimo",
        nature: "Naturaleza",
        gastronomy: "Gastronomía",
      },
      items: [
        {
          title: "Tour Villa & Gardens",
          description: "Paseo guiado por los hermosos jardines y villa histórica de Seixal.",
        },
        {
          title: "Tour Instax Photos",
          description: "Tome fotos polaroid instantáneas mientras descubre joyas locales.",
        },
        {
          title: "Seixal Medieval",
          description: "Retroceda en el tiempo con un tour temático medieval.",
        },
        {
          title: "Boatrip Seixal",
          description: "Navegue por la hermosa Bahía de Seixal, a bordo de uno de los barcos típicos del pasado. Visite el Molino de Marea de Corroios. Bebida de bienvenida, agua y snacks a bordo.",
        },
        {
          title: "Sesimbra Emotion",
          description: "Experiencia única en el Río Sado para observar delfines.",
        },
        {
          title: "Setúbal & Arrábida",
          description: "Arrábida es una reserva natural protegida clasificada por la UNESCO cuya historia está escrita en las piedras, y la calidad de vida se puede sentir en el aire, paisaje único y almuerzo típico con sepia frita.",
        },
        {
          title: "Azeitão Vineyard Tour & Wine Tasting",
          description: "Escapada rápida en un pequeño pueblo llamado Azeitão, una de las regiones vinícolas más importantes de Portugal con deliciosa pastelería.",
        },
        {
          title: "Almada - Cristo Rei",
          description: "En el corazón del Río Tajo, una pieza única de la religión portuguesa, Cristo Rei con 110 metros y una plataforma de observación elevada con vista panorámica de Lisboa y el puente 25 de Abril!",
        },
        {
          title: "White Gold Route",
          description: "Alcochete, tierra de sal, llamada 'Oro Blanco' tiene un hermoso paisaje bajo el Río Tajo, escenario idílico para un paseo junto al mar. Observando nuestra historia y nuestras costumbres, contemple la naturaleza a lo largo de una ruta.",
        },
      ],
    },
    // About
    about: {
      badge: "Sobre Nosotros",
      title: "Creamos Experiencias de Viaje Memorables",
      description1: "JaraTravels se especializa en crear experiencias de viaje únicas e inolvidables. Trabajamos con pequeños grupos de forma íntima y local. Con años de experiencia en el sector turístico, ofrecemos servicios de calidad superior y atención personalizada a cada cliente.",
      description2: "Trabajamos en asociación con plataformas líderes como GetYourGuide para garantizar las mejores experiencias y facilidad en las reservas.",
      registration: "Empresa registrada en RNAAT Nº598/2025 - Turismo de Portugal",
      features: [
        "Tours guiados por profesionales especializados",
        "Asociación oficial con GetYourGuide",
        "Experiencias personalizadas para cada cliente",
        "Organización completa de eventos",
      ],
      whyChoose: "¿Por qué elegir JaraTravels?",
      reasons: [
        "Experiencia comprobada en el sector",
        "Atención personalizada",
        "Asociaciones con las mejores plataformas",
        "Precios competitivos",
        "Satisfacción garantizada",
      ],
    },
    // Contact
    contact: {
      title: "Contáctenos",
      subtitle: "¿Listo para su próxima aventura? ¡Contáctenos y comencemos a planificar!",
      formTitle: "Envíenos un Mensaje",
      formSubtitle: "Complete el formulario y responderemos lo antes posible",
      name: "Su Nombre",
      email: "Su Email",
      phone: "Su Teléfono",
      message: "Su Mensaje",
      send: "Enviar Mensaje",
      successMessage: "¡Mensaje enviado! Nos pondremos en contacto pronto.",
      location: "Ubicación",
    },
    // FAQ
    faq: {
      title: "Preguntas Frecuentes",
      subtitle: "Encuentre respuestas a las preguntas más comunes sobre nuestros servicios",
      notFound: "¿No encontró la respuesta que buscaba?",
      contactUs: "Contáctenos",
      items: [
        {
          question: "¿Cómo puedo hacer una reserva?",
          answer: "Puede hacer su reserva directamente a través de nuestro sitio web o a través de nuestros socios autorizados como GetYourGuide. Simplemente seleccione el servicio deseado, elija la fecha y siga los pasos para completar la reserva."
        },
        {
          question: "¿Cuál es la política de cancelación?",
          answer: "Las cancelaciones deben comunicarse con al menos 24 horas de anticipación para tener derecho a un reembolso total. Las cancelaciones con menos de 24 horas no tendrán derecho a reembolso. Las políticas específicas pueden variar según el tipo de servicio contratado."
        },
        {
          question: "¿Qué pasa si el clima es malo?",
          answer: "La seguridad de nuestros clientes es nuestra prioridad. En caso de condiciones climáticas adversas que imposibiliten la realización del paseo, ofrecemos la posibilidad de reprogramar para otra fecha o un reembolso total del valor pagado."
        },
        {
          question: "¿Los paseos incluyen transporte?",
          answer: "Sí, la mayoría de nuestros servicios incluyen transporte de ida y vuelta desde puntos de recogida convenientes. Los detalles específicos de cada servicio, incluidos los puntos de recogida, se proporcionan en el momento de la reserva."
        },
        {
          question: "¿Qué tipos de paseos están disponibles?",
          answer: "Ofrecemos una variedad de experiencias que incluyen tours por la Margen Sur, paseos personalizados, eventos especiales y mucho más. Todos nuestros servicios son adaptables a sus preferencias y necesidades."
        },
        {
          question: "¿Es necesario seguro para los paseos?",
          answer: "Todos nuestros servicios incluyen seguro de responsabilidad civil. Sin embargo, recomendamos que tenga un seguro de viaje personal para cubrir cualquier imprevisto o emergencia médica."
        },
        {
          question: "¿Puedo personalizar un paseo?",
          answer: "¡Sí! Ofrecemos paseos personalizados adaptados a sus intereses y preferencias. Contáctenos por email jaratravels@hotmail.com o Instagram para discutir sus necesidades específicas."
        },
        {
          question: "¿Cuántas personas pueden participar en un paseo?",
          answer: "La capacidad varía según el tipo de servicio. Pero realizamos principalmente experiencias privadas para pequeños grupos, hasta 10 personas. Los detalles específicos están disponibles en la descripción de cada servicio."
        },
        {
          question: "¿Se requiere conocimiento previo o condición física especial?",
          answer: "La mayoría de nuestros paseos son adecuados para todos los niveles de condición física. La información específica sobre requisitos o dificultad se proporciona en la descripción de cada actividad. Si tiene dudas, contáctenos."
        },
        {
          question: "¿JaraTravels es una empresa registrada?",
          answer: "Sí, somos una empresa oficialmente registrada en RNAAT Nº598/2025 - Turismo de Portugal, garantizando todos los estándares de calidad y seguridad exigidos por la legislación portuguesa."
        }
      ],
    },
    // Footer
    footer: {
      tagline: "Creando experiencias de viaje inolvidables",
      legalInfo: "Información Legal",
      terms: "Términos y Condiciones",
      privacy: "Política de Privacidad",
      complaints: "Libro de Reclamaciones",
      languages: "Hablamos",
      copyright: "Todos los derechos reservados.",
      installApp: "Instalar App",
    },
    // Install
    install: {
      title: "Instalar App",
      installed: "¡App Instalada!",
      installedDesc: "JaraTravels ya está instalada en tu dispositivo.",
      backToApp: "Volver a la App",
      mainTitle: "Instala JaraTravels",
      mainDesc: "Añade nuestra app a tu pantalla de inicio para acceso rápido a las mejores experiencias.",
      quickAccess: "Acceso Rápido",
      quickAccessDesc: "Abre la app directamente desde la pantalla de inicio, como cualquier otra app.",
      worksOffline: "Funciona Offline",
      worksOfflineDesc: "Accede a la información incluso sin conexión a internet.",
      installNow: "Instalar Ahora",
      iosTitle: "Cómo instalar en iPhone/iPad",
      iosStep1: "Toca el botón Compartir",
      iosStep1Desc: "En la barra inferior de Safari",
      iosStep2: "Selecciona \"Añadir a pantalla de inicio\"",
      iosStep2Desc: "Desliza para encontrar la opción",
      iosStep3: "Confirma tocando \"Añadir\"",
      androidTitle: "Cómo instalar en Android",
      androidStep1: "Toca el menú del navegador",
      androidStep1Desc: "Los tres puntos en la esquina superior",
      androidStep2: "Selecciona \"Instalar app\" o \"Añadir a pantalla de inicio\"",
      androidStep3: "Confirma la instalación",
      backToSite: "Volver al Sitio",
    },
    // Booking
    booking: {
      title: "Reserve su Experiencia",
      getYourGuideTitle: "Reserva Instantánea vía GetYourGuide",
      getYourGuideDesc: "Reserve ahora nuestro tour guiado a pie por Seixal con degustación de pastel de nata a través de GetYourGuide - ¡confirmación inmediata!",
      bookOnGetYourGuide: "Reservar en GetYourGuide",
      ourServices: "Nuestros Servicios",
      chooseExperience: "Elija la experiencia perfecta para usted",
      whatsIncluded: "Qué está incluido:",
      importantInfo: "Información Importante",
      meetingPoint: "Punto de Encuentro",
      meetingPointDesc: "Seixal, Portugal (ubicación exacta será confirmada)",
      groups: "Grupos",
      groupsDesc: "Exclusivo hasta 10 personas por grupo. Descuento para grupos de más de 6 personas",
      cancellation: "Cancelación",
      cancellationDesc: "Cancelación gratuita hasta 24h antes",
      formTitle: "Formulario de Reserva",
      formSubtitle: "Complete los datos a continuación para realizar su reserva",
      fullName: "Nombre Completo",
      email: "Email",
      phone: "Teléfono",
      service: "Servicio",
      selectService: "Seleccione un servicio",
      preferredDate: "Fecha Preferida",
      participants: "Número de Participantes",
      participantsPlaceholder: "Ej: 2",
      paymentMethod: "Método de Pago",
      selectPaymentMethod: "Seleccione método de pago",
      mbway: "MBWay",
      bankTransfer: "Transferencia Bancaria",
      paypal: "PayPal",
      mbwayInfo: "Pago vía MBWay",
      mbwayDesc: "Después de confirmar la reserva, enviaremos una solicitud MBWay al número de teléfono proporcionado.",
      mbwayNumber: "Número MBWay:",
      fillPhoneFirst: "Por favor, complete su teléfono arriba",
      bankTransferInfo: "Datos para Transferencia Bancaria",
      iban: "IBAN:",
      holder: "Titular:",
      bank: "Banco:",
      reference: "Referencia:",
      referenceDesc: "Por favor, indique su nombre en la descripción de la transferencia",
      paypalInfo: "Pago vía PayPal",
      paypalDesc: "Después de confirmar la reserva, enviaremos un enlace de pago PayPal al email proporcionado.",
      paypalEmail: "Email para PayPal:",
      fillEmailFirst: "Por favor, complete su email arriba",
      additionalMessage: "Mensaje Adicional",
      additionalMessagePlaceholder: "¿Alguna información adicional o solicitud especial?",
      confirmBooking: "Confirmar Reserva",
      submitting: "Enviando...",
      termsAgreement: "Al enviar, acepta nuestros términos de servicio y política de privacidad",
      orBookVia: "O reserve directamente vía GetYourGuide",
      bookingSuccess: "¡Reserva enviada con éxito!",
      bookingError: "Error al enviar reserva. Intente de nuevo.",
    },
    // Confirmation
    confirmation: {
      title: "Confirmación de Reserva",
      successTitle: "¡Reserva Confirmada!",
      successMessage: "¡Gracias, {name}! Recibimos su reserva y nos pondremos en contacto pronto.",
      bookingDetails: "Detalles de la Reserva",
      service: "Servicio",
      price: "Precio",
      duration: "Duración",
      date: "Fecha",
      participants: "Participantes",
      person: "persona",
      people: "personas",
      additionalMessage: "Mensaje Adicional",
      contactInfo: "Información de Contacto",
      email: "Email",
      phone: "Teléfono",
      paymentInfo: "Información de Pago",
      paymentMethod: "Método de Pago",
      mbwayInstructions: "Instrucciones para Pago vía MBWay:",
      mbwayStep1: "Espere nuestra solicitud MBWay",
      mbwayStep2: "Confirme el pago de {price} en su teléfono",
      mbwayStep3: "Recibirá un email de confirmación después del pago",
      mbwayNote: "La solicitud MBWay será enviada en las próximas 24 horas hábiles",
      bankTransferData: "Datos para Transferencia Bancaria:",
      bankTransferNote: "Por favor, realice el pago en las próximas 48 horas para confirmar su reserva",
      paypalInstructions: "Instrucciones para Pago vía PayPal:",
      paypalStep1: "Haga clic en el enlace de arriba para acceder a PayPal",
      paypalStep2: "Ingrese el valor {price} y añada la descripción",
      paypalStep3: "Después del pago, recibirá la confirmación por email",
      paypalNote: "Por favor, realice el pago en las próximas 48 horas para confirmar su reserva",
      proofOfPayment: "Comprobante de Pago",
      proofOfPaymentDesc: "Después de realizar el pago, por favor envíe el comprobante a:",
      proofOfPaymentNote: "Incluya su nombre y el servicio reservado en el mensaje. Su reserva solo será confirmada después de recibir el comprobante.",
      meetingPoint: "Punto de Encuentro",
      meetingPointDesc: "La ubicación exacta del punto de encuentro será confirmada por email o teléfono después de la confirmación del pago.",
      locationLabel: "Ubicación:",
      nextSteps: "Próximos Pasos",
      step1: "Enviamos un email de confirmación a {email}",
      step2: "Complete el pago usando el método seleccionado ({method})",
      step3: "Nos pondremos en contacto por email o teléfono para confirmar los detalles finales",
      step4: "¡Prepárese para una experiencia inolvidable!",
      newBooking: "Nueva Reserva",
      backToHome: "Volver al Inicio",
      needHelp: "¿Necesita ayuda? Contáctenos por email",
      orPhone: "o por teléfono",
      iban: "IBAN:",
      holder: "Titular:",
      bank: "Banco:",
      value: "Valor:",
      description: "Descripción:",
    },
    // Common
    common: {
      loading: "Cargando...",
      error: "Error",
      success: "Éxito",
      back: "Volver",
      next: "Siguiente",
      close: "Cerrar",
    },
    // Privacy
    privacy: {
      title: "Política de Privacidad",
      intro: {
        title: "1. Introducción",
        text: "JaraTravels (RNAAT Nº598/2025 - Turismo de Portugal) respeta su privacidad y está comprometida en proteger sus datos personales. Esta política explica cómo recopilamos, usamos y protegemos su información.",
      },
      dataCollected: {
        title: "2. Datos Recopilados",
        text: "Recopilamos los siguientes tipos de información:",
        items: [
          "Nombre completo e información de contacto (email, teléfono)",
          "Información de pago necesaria para procesar reservas",
          "Preferencias de viaje y requisitos especiales",
          "Datos de navegación en el sitio web (cookies y análisis)",
        ],
      },
      dataUsage: {
        title: "3. Uso de Datos",
        text: "Sus datos se utilizan para:",
        items: [
          "Procesar y confirmar reservas",
          "Comunicar sobre los servicios contratados",
          "Mejorar nuestros servicios y experiencia del cliente",
          "Cumplir con obligaciones legales y regulatorias",
          "Enviar información promocional (solo con consentimiento)",
        ],
      },
      dataSharing: {
        title: "4. Compartir Datos",
        text: "No vendemos sus datos personales. Podemos compartir información con socios de confianza (como GetYourGuide) solo cuando sea necesario para prestar los servicios solicitados. Todos los socios están obligados a proteger sus datos.",
      },
      dataSecurity: {
        title: "5. Seguridad de Datos",
        text: "Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger sus datos contra acceso no autorizado, pérdida o destrucción. Las transacciones de pago se procesan a través de plataformas seguras.",
      },
      yourRights: {
        title: "6. Sus Derechos",
        text: "Según el RGPD, tiene derecho a:",
        items: [
          "Acceder a sus datos personales",
          "Corregir datos incorrectos o incompletos",
          "Solicitar la eliminación de sus datos",
          "Oponerse al procesamiento de sus datos",
          "Solicitar la portabilidad de datos",
          "Retirar el consentimiento en cualquier momento",
        ],
      },
      cookies: {
        title: "7. Cookies",
        text: "Nuestro sitio web utiliza cookies para mejorar su experiencia de navegación y analizar el tráfico del sitio. Puede configurar su navegador para rechazar cookies, pero esto puede afectar algunas funcionalidades del sitio web.",
      },
      dataRetention: {
        title: "8. Retención de Datos",
        text: "Mantenemos sus datos personales solo durante el tiempo necesario para cumplir con los propósitos descritos en esta política o según lo exija la ley.",
      },
      contact: {
        title: "9. Contacto",
        text: "Para ejercer sus derechos o aclarar dudas sobre esta política de privacidad, contáctenos a través de jaratravels@hotmail.com.",
      },
      changes: {
        title: "10. Cambios en la Política",
        text: "Nos reservamos el derecho de actualizar esta política de privacidad. Cualquier cambio se publicará en esta página con la fecha de la última actualización.",
        lastUpdate: "Última actualización:",
      },
    },
    // Terms
    terms: {
      title: "Términos y Condiciones",
      general: {
        title: "1. Información General",
        text: "JaraTravels (RNAAT Nº598/2025 - Turismo de Portugal) ofrece servicios de turismo y animación turística en Seixal, Distrito de Setúbal, Portugal Continental. Al utilizar nuestros servicios, acepta estos términos y condiciones.",
      },
      reservations: {
        title: "2. Reservas y Pagos",
        text: "Las reservas se pueden realizar a través de nuestro sitio web o socios autorizados. El pago completo es necesario para confirmar la reserva. Aceptamos los métodos de pago indicados en el proceso de reserva.",
      },
      cancellations: {
        title: "3. Cancelaciones y Reembolsos",
        text: "Las cancelaciones deben comunicarse con al menos 24 horas de anticipación. Las cancelaciones con menos de 24 horas de antelación no tendrán derecho a reembolso. Las políticas específicas pueden variar según el tipo de servicio contratado.",
      },
      responsibilities: {
        title: "4. Responsabilidades",
        text: "JaraTravels se compromete a prestar los servicios contratados con calidad y profesionalismo. Sin embargo, no nos hacemos responsables por circunstancias fuera de nuestro control, incluidas condiciones climáticas adversas o casos de fuerza mayor.",
      },
      behavior: {
        title: "5. Comportamiento del Cliente",
        text: "Los clientes deben comportarse adecuadamente durante los servicios. Nos reservamos el derecho de rechazar o terminar servicios en caso de comportamiento inapropiado, sin derecho a reembolso.",
      },
      modifications: {
        title: "6. Modificaciones",
        text: "JaraTravels se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.",
      },
      applicableLaw: {
        title: "7. Ley Aplicable",
        text: "Estos términos y condiciones se rigen por la ley portuguesa. Cualquier disputa será sometida a los tribunales competentes en Portugal.",
      },
    },
    // NotFound
    notFound: {
      title: "404",
      message: "¡Ups! Página no encontrada",
      backHome: "Volver al Inicio",
    },
  },
};

export type TranslationKey = keyof typeof translations.pt;
