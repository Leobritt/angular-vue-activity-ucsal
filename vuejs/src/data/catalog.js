// Dados fictícios da loja. App.vue carrega este módulo no hook created().

export const categories = [
  {
    id: 'ceramica',
    label: 'Cerâmica',
    care: 'Lave à mão com água morna e evite choque térmico. Peças de barro vão ao forno, nunca ao micro-ondas.'
  },
  {
    id: 'cestaria',
    label: 'Cestaria',
    care: 'Limpe com pano seco e guarde longe da umidade. Deixe a fibra tomar ar uma vez por mês.'
  },
  {
    id: 'renda',
    label: 'Renda',
    care: 'Lave à mão com sabão neutro e seque à sombra, sobre uma toalha. Não torça.'
  },
  {
    id: 'madeira',
    label: 'Madeira',
    care: 'Passe óleo mineral a cada dois meses. Não deixe de molho nem lave em máquina.'
  },
  {
    id: 'fitas',
    label: 'Fitas e tecidos',
    care: 'Na primeira lavagem, separe das peças claras. Seque à sombra.'
  }
];

export const products = [
  {
    id: 'moringa-vidrada',
    name: 'Moringa de barro vidrado',
    categoryId: 'ceramica',
    price: 89.9,
    origin: 'Maragogipinho',
    material: 'Barro cozido com vidrado atóxico',
    size: '28 cm de altura, 1,5 L',
    description: 'Mantém a água fresca sem geladeira. O bojo é torneado à mão e a alça leva o carimbo do oleiro.'
  },
  {
    id: 'alguidar-moqueca',
    name: 'Alguidar para moqueca',
    categoryId: 'ceramica',
    price: 74.5,
    origin: 'Maragogipinho',
    material: 'Barro cozido',
    size: '30 cm de diâmetro',
    description: 'Vai direto do fogão para a mesa e segura o calor até o último prato.'
  },
  {
    id: 'panela-tampa',
    name: 'Panela de barro com tampa',
    categoryId: 'ceramica',
    price: 119,
    origin: 'Coqueiros',
    material: 'Barro cozido e curado',
    size: '24 cm de diâmetro, 3 L',
    description: 'Sai curada do ateliê, pronta para feijão, ensopado e cozido de fervura longa.'
  },
  {
    id: 'jarra-engobe',
    name: 'Jarra pintada com engobe',
    categoryId: 'ceramica',
    price: 96,
    origin: 'Cachoeira',
    material: 'Barro branco com engobe azul',
    size: '22 cm de altura, 1 L',
    description: 'Flores pintadas a pincel sobre o barro ainda cru. Nenhuma jarra sai igual à outra.'
  },
  {
    id: 'canecas-gres',
    name: 'Par de canecas de grés',
    categoryId: 'ceramica',
    price: 78,
    origin: 'Salvador',
    material: 'Grés esmaltado',
    size: '10 cm de altura, 300 ml cada',
    description: 'O esmalte azul escorre de um jeito diferente em cada queima.'
  },
  {
    id: 'vaso-parede',
    name: 'Vaso de parede em terracota',
    categoryId: 'ceramica',
    price: 58,
    origin: 'Santo Amaro',
    material: 'Terracota natural',
    size: '18 x 14 cm',
    description: 'Feito para temperos de varanda e samambaias pequenas. Já vem com furo para prego.'
  },
  {
    id: 'cesto-piacava',
    name: 'Cesto de piaçava',
    categoryId: 'cestaria',
    price: 67,
    origin: 'Ilhéus',
    material: 'Piaçava trançada',
    size: '35 cm de diâmetro, 30 cm de altura',
    description: 'Trama firme, boa para guardar mantas ou servir de cachepô.'
  },
  {
    id: 'fruteira-cipo',
    name: 'Fruteira de cipó',
    categoryId: 'cestaria',
    price: 82,
    origin: 'Porto Seguro',
    material: 'Cipó imbé',
    size: '38 cm de diâmetro',
    description: 'Trançada em espiral, deixa o ar circular e as frutas duram mais.'
  },
  {
    id: 'bolsa-licuri',
    name: 'Bolsa de palha de licuri',
    categoryId: 'cestaria',
    price: 135,
    origin: 'Caldeirão Grande',
    material: 'Palha de licuri com forro de algodão',
    size: '40 x 32 cm',
    description: 'Alça reforçada e forro com bolso interno. Aguenta uma feira inteira.'
  },
  {
    id: 'chapeu-ouricuri',
    name: 'Chapéu de palha de ouricuri',
    categoryId: 'cestaria',
    price: 55,
    origin: 'Irará',
    material: 'Palha de ouricuri',
    size: 'Aba de 9 cm, tamanhos P, M e G',
    description: 'Leve e ventilado, com a aba firme mesmo depois de muito sol.'
  },
  {
    id: 'porta-talheres',
    name: 'Porta-talheres de taboa',
    categoryId: 'cestaria',
    price: 38,
    origin: 'Cachoeira',
    material: 'Taboa trançada',
    size: '24 x 12 cm',
    description: 'Dois compartimentos para levar os talheres da cozinha à mesa.'
  },
  {
    id: 'jogo-sisal',
    name: 'Jogo americano de sisal',
    categoryId: 'cestaria',
    price: 92,
    origin: 'Valente',
    material: 'Sisal tingido',
    size: '4 peças de 35 cm',
    description: 'Tingido com pigmentos naturais em quatro cores de fachada.'
  },
  {
    id: 'toalha-bilro',
    name: 'Toalha em renda de bilro',
    categoryId: 'renda',
    price: 320,
    origin: 'Saubara',
    material: 'Linha de algodão',
    size: '1,60 x 1,60 m',
    description: 'Quase três meses de almofada e bilro para uma mesa de quatro lugares.'
  },
  {
    id: 'caminho-richelieu',
    name: 'Caminho de mesa em richelieu',
    categoryId: 'renda',
    price: 210,
    origin: 'Feira de Santana',
    material: 'Linho bordado',
    size: '1,40 m x 40 cm',
    description: 'Bordado vazado à mão, com acabamento em ponto caseado.'
  },
  {
    id: 'gola-bilro',
    name: 'Gola de renda de bilro',
    categoryId: 'renda',
    price: 88,
    origin: 'Saubara',
    material: 'Linha de algodão',
    size: 'Ajustável, com fita de cetim',
    description: 'Dá acabamento a qualquer blusa lisa e amarra com fita.'
  },
  {
    id: 'centro-file',
    name: 'Centro de mesa em filé',
    categoryId: 'renda',
    price: 145,
    origin: 'Itaparica',
    material: 'Algodão sobre rede de filé',
    size: '60 cm de diâmetro',
    description: 'Desenhos de peixe e folha bordados sobre a rede de pesca fina.'
  },
  {
    id: 'colher-jaqueira',
    name: 'Colher de jaqueira',
    categoryId: 'madeira',
    price: 29,
    origin: 'Valença',
    material: 'Jaqueira de reaproveitamento',
    size: '30 cm',
    description: 'Cabo longo e bojo raso, boa para mexer sem riscar a panela de barro.'
  },
  {
    id: 'tabua-jaqueira',
    name: 'Tábua de corte de jaqueira',
    categoryId: 'madeira',
    price: 110,
    origin: 'Valença',
    material: 'Jaqueira de reaproveitamento',
    size: '40 x 25 cm',
    description: 'Veio amarelado e canaleta para reter o caldo.'
  },
  {
    id: 'carranca',
    name: 'Carranca pequena',
    categoryId: 'madeira',
    price: 185,
    origin: 'Juazeiro',
    material: 'Cedro entalhado e pintado',
    size: '25 cm de altura',
    description: 'Entalhada a formão, na tradição das barcas do São Francisco.'
  },
  {
    id: 'gamela',
    name: 'Gamela talhada à mão',
    categoryId: 'madeira',
    price: 160,
    origin: 'Nazaré',
    material: 'Madeira de reaproveitamento',
    size: '45 x 22 cm',
    description: 'Serve salada, farofa ou frutas. As marcas da goiva ficam à mostra.'
  },
  {
    id: 'pilao',
    name: 'Pilão com mão de madeira',
    categoryId: 'madeira',
    price: 98,
    origin: 'Santo Antônio de Jesus',
    material: 'Madeira de reaproveitamento',
    size: '20 cm de altura',
    description: 'Para alho, pimenta e castanha, com base larga que não escorrega.'
  },
  {
    id: 'feixe-fitas',
    name: 'Feixe com 50 fitas coloridas',
    categoryId: 'fitas',
    price: 25,
    origin: 'Salvador',
    material: 'Fita de algodão estampada',
    size: '45 cm cada',
    description: 'Cores sortidas, boas para lembrança de festa e presente.'
  },
  {
    id: 'rede-algodao',
    name: 'Rede de algodão',
    categoryId: 'fitas',
    price: 240,
    origin: 'Jequié',
    material: 'Algodão cru',
    size: '3,20 m de ponta a ponta',
    description: 'Tecido encorpado e varanda de crochê nas laterais.'
  },
  {
    id: 'cortina-fitas',
    name: 'Cortina de fitas',
    categoryId: 'fitas',
    price: 130,
    origin: 'Salvador',
    material: 'Fita de algodão e madeira',
    size: '2,10 x 0,90 m',
    description: 'Divide ambientes e balança com o vento da porta.'
  }
];

export const faq = [
  {
    title: 'Quanto tempo leva a entrega?',
    content: 'Peças a pronta entrega saem em até 2 dias úteis. Para Salvador e Região Metropolitana, o prazo é de 3 dias úteis. Para outros estados, de 7 a 12 dias úteis.'
  },
  {
    title: 'Uma peça chegou quebrada. O que eu faço?',
    content: 'Envie uma foto da peça em até 7 dias pelo formulário de encomenda. Mandamos outra peça ou devolvemos o valor, sem custo de frete.'
  },
  {
    title: 'Posso trocar uma peça?',
    content: 'Pode, em até 30 dias depois do recebimento, desde que a peça esteja sem uso. O frete da troca fica por sua conta.'
  },
  {
    title: 'Como funciona a encomenda personalizada?',
    content: 'Descreva a peça e envie uma foto de referência. O ateliê responde com preço e prazo em até 3 dias úteis, e a produção começa depois do sinal de 50%.'
  },
  {
    title: 'As peças são iguais às imagens?',
    content: 'Cada peça é feita à mão, então cor e medidas podem variar até 5%. Essa diferença faz parte do trabalho artesanal e não é considerada defeito.'
  },
  {
    title: 'Quais são as formas de pagamento?',
    content: 'Pix, boleto e cartão de crédito em até 6 vezes sem juros. O desconto de 5% vale para pagamentos no Pix.'
  }
];
