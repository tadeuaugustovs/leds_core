export default {
  porTipo: () => {
    const itens = getCapitalCusteioItens.data?.data || [];
    const movimentos = getItensDoFluxoCompleto.data?.data || [];

    const acumulado = {};

    for (let item of itens) {
      const gasto = movimentos
        .filter(mov => mov.capital_custeio_item?.documentId === item.documentId)
        .reduce((soma, mov) => soma + Math.abs(Number(mov.despesa || 0)), 0);

      const tipo = item.tipo || "Outro";
      acumulado[tipo] = (acumulado[tipo] || 0) + gasto;
    }

    return Object.entries(acumulado).map(([tipo, valor]) => ({
      x: tipo,
      y: valor
    }));
  }
}
