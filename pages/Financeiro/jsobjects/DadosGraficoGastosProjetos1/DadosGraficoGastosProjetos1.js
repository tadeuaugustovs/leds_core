export default {
  getGastoPorProjeto: () => {
    const projetos = getProjetos.data?.data || [];
    const itens = getCapitalCusteioItens.data?.data || [];
    const membros = getMembros.data?.data || [];
    const movimentos = getItensDoFluxoCompleto.data?.data || [];

    return projetos.map(projeto => {
      // Gasto com itens (CAPITAL / CUSTEIO)
      const gastoItens = itens
        .filter(item =>
          item.projetos?.some(p => p.documentId === projeto.documentId)
        )
        .reduce((acc, item) => {
          const gastoDoItem = movimentos
            .filter(mov => mov.capital_custeio_item?.documentId === item.documentId)
            .reduce((soma, mov) => soma + Math.abs(Number(mov.despesa || 0)), 0);
          return acc + gastoDoItem;
        }, 0);

      // Gasto com bolsas vinculadas
      const gastoBolsas = membros
        .flatMap(m => m.planos_de_trabalho || [])
        .filter(p =>
          p.projetos?.some(pr => pr.documentId === projeto.documentId)
        )
        .reduce((acc, plano) => acc + Number(plano.bolsa?.valor || 0), 0);

      return {
        x: projeto.nome || "Sem nome",
        y: gastoItens + gastoBolsas,
      };
    });
  }
};
