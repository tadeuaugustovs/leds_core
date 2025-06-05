export default {
  getGastoPorProjeto: () => {
    const projetos = getProjetos.data?.data || [];
    const itens = getCapitalCusteioItens.data?.data || [];
    const membros = getMembros.data?.data || [];

    return projetos.map(projeto => {
      // Somar itens de custeio/capital vinculados
      const gastoItens = itens
        .filter(item =>
          item.projetos?.some(p => p.documentId === projeto.documentId)
        )
        .reduce((acc, item) => acc + Number(item.gasto || 0), 0);

      // Somar valores de bolsas vinculadas a este projeto
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
