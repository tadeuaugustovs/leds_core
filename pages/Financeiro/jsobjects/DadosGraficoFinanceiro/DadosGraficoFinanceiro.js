export default {
  getDadosGraficoFinanceiro: () => {
    const dados = getCapitalCusteioItens.data?.data || [];
    const movimentos = getItensDoFluxoCompleto.data?.data || [];

    let total = 0;
    let gasto = 0;

    for (const item of dados) {
      const valorTotal = Number(item.despesa || 0);

      const valorGasto = movimentos
        .filter(mov => mov.capital_custeio_item?.documentId === item.documentId)
        .reduce((soma, mov) => soma + Math.abs(Number(mov.despesa || 0)), 0);

      total += valorTotal;
      gasto += valorGasto;
    }

    const restante = total - gasto;

    return [
      { x: "Total Previsto", y: total },
      { x: "Restante", y: restante }
    ];
  }
};
