// Fonte única do termo de responsabilidade — ver docs/02-DECISOES.md (D19,
// D20) e docs/termo-responsabilidade.md para o texto de origem e o aviso de
// proveniência (advogado deu OK informal, sem parecer formal; análise segue
// em curso — atualizar aqui se a redação mudar). D20: nenhuma cláusula cita
// patins, bicicleta ou outro equipamento não-skate. Página (/termo) e PDF
// renderizam SEMPRE deste array — nunca hardcode em outro lugar.

export const termo = {
  versaoTexto: "25/07/2026",
  blocos: [
    {
      id: "maior",
      titulo: "Para maior de idade (18+)",
      clausulas: [
        {
          titulo: "1. Reconhecimento de risco",
          texto:
            "Skate é um esporte que envolve risco de queda e lesão. Eu reconheço esse risco e assumo a responsabilidade integral pelas consequências de minha participação, inclusive lesões.",
        },
        {
          titulo: "2. Responsabilidade e isenção",
          texto:
            "A ASB — Associação Skate Brazlândia, a Administração Regional, o instituto UIEMAPV e os patrocinadores do evento não se responsabilizam por: lesões, acidentes ou danos pessoais durante a prova ou antes/depois dela; perda, roubo ou dano a equipamentos pessoais (skate, segurança, pertences); danos causados a terceiros ou propriedade durante a prova.",
        },
        {
          titulo: "3. Saúde e condições físicas",
          texto:
            "Eu atesto que estou em bom estado de saúde física e mental, apto a participar de uma atividade esportiva que envolve risco. Qualquer condição médica relevante foi comunicada à organização.",
        },
        {
          titulo: "4. Equipamento de segurança",
          texto:
            "Concordo em usar capacete e proteção de pulso/cotovelo/joelho conforme exigido pelo regulamento do evento.",
        },
        {
          titulo: "5. Imagem e documentação",
          texto:
            "Autorizo a captura, uso e publicação de fotos e vídeos meus durante o evento para fins de documentação, redes sociais e site do campeonato.",
        },
        {
          titulo: "6. Consentimento",
          texto:
            "Estou assinando este termo de livre e espontânea vontade, sem coação, e declaro que li e compreendi todas as cláusulas acima.",
        },
      ],
    },
    {
      id: "menor",
      titulo: "Para menor de idade (até 17 anos) — responsável legal",
      clausulas: [
        {
          titulo: "1. Reconhecimento de risco",
          texto:
            "Eu reconheço que skate é um esporte que envolve risco de queda e lesão. Autorizo o menor a participar ciente desse risco.",
        },
        {
          titulo: "2. Responsabilidade",
          texto:
            "Eu, como responsável legal, assumo a responsabilidade integral por quaisquer lesões ou acidentes do menor durante o evento e por danos causados pelo menor a terceiros ou propriedade. A ASB, a Administração Regional, o instituto UIEMAPV e patrocinadores não se responsabilizam pelos itens acima.",
        },
        {
          titulo: "3. Saúde do menor",
          texto:
            "Atesto que o menor está em bom estado de saúde física e mental, apto a participar de uma atividade esportiva que envolve risco. Qualquer condição médica relevante foi comunicada à organização.",
        },
        {
          titulo: "4. Equipamento de segurança",
          texto:
            "Autorizo o menor a participar usando capacete e proteção de pulso/cotovelo/joelho conforme exigido pelo regulamento.",
        },
        {
          titulo: "5. Imagem e documentação",
          texto:
            "Autorizo a captura, uso e publicação de fotos e vídeos do menor durante o evento para fins de documentação, redes sociais e site do campeonato.",
        },
        {
          titulo: "6. Consentimento",
          texto:
            "Estou assinando esta autorização de livre e espontânea vontade, sem coação, na qualidade de responsável legal pelo menor. Declaro que li e compreendi todas as cláusulas acima.",
        },
      ],
    },
  ],
} as const;

export type TermoBloco = (typeof termo)["blocos"][number];
