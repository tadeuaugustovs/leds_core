export default {
  porItemGeral: () => {
    const itens = getCapitalCusteioItens.data?.data || [];
    const movimentos = getItensDoFluxoCompleto.data?.data || [];

    const dados = itens.map(item => {
      const gasto = movimentos
        .filter(mov => mov.capital_custeio_item?.documentId === item.documentId)
        .reduce((soma, mov) => soma + Math.abs(Number(mov.despesa || 0)), 0);

      return {
        x: item.descricao || item.item || 'Sem nome',
        y: gasto,
        label: gasto.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })
      };
    });

    dados.sort((a, b) => b.y - a.y);
    return dados;
  }
}
