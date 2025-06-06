export default {
  gerar: () => {
    const itens = getCapitalCusteioItens.data?.data || [];
    const movimentos = getItensDoFluxoCompleto.data?.data || [];
    const projetoSelecionado = appsmith.store.projetoSelecionadoDocumentId;

    const resultado = {};

    for (let item of itens) {
      const pertenceAoProjeto =
        projetoSelecionado === "TODOS" ||
        item.projetos?.some(p => p?.documentId === projetoSelecionado);

      if (!pertenceAoProjeto) continue;

      const tipo = item.tipo || "OUTRO";

      const gasto = movimentos
        .filter(mov => mov.capital_custeio_item?.documentId === item.documentId)
        .reduce((soma, mov) => soma + Math.abs(Number(mov.despesa || 0)), 0);

      resultado[tipo] = (resultado[tipo] || 0) + gasto;
    }

    return Object.entries(resultado).map(([tipo, valor]) => ({
      x: tipo,
      y: valor
    }));
  }
}
