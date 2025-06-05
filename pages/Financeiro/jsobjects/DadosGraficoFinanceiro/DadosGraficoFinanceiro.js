export default {
  getDadosGraficoFinanceiro: () => {
    const dados = getCapitalCusteioItens.data?.data || [];

    // soma geral — sem filtro por projeto
    const total = dados.reduce(
      (acc, item) => acc + Number(item.valorTotal ?? item.total ?? 0),
      0
    );

    const restante = dados.reduce(
      (acc, item) => acc + Number(item.restante ?? 0),
      0
    );

    return [
      { x: "Total Previsto", y: total },
      { x: "Restante", y: restante }
    ];
  }
};
