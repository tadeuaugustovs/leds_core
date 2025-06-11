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

    // Arredonda para 2 casas decimais
    const arredondar = valor => Math.round(valor * 100) / 100;

    return [
      { x: "Total Previsto", y: arredondar(total) },
      { x: "Restante", y: arredondar(restante) }
    ];
  }
};
