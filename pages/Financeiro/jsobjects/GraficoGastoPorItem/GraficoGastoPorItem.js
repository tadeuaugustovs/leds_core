export default {
  porItem: () => {
    const projetoId = Table5.selectedRow?.documentId;
    const itens = getCapitalCusteioItens.data?.data || [];

    const filtrados = itens.filter(item =>
      item.projetos?.some(p => p.documentId === projetoId)
    );

    const dados = filtrados.map(item => ({
      x: item.item || 'Sem nome',
      y: item.gasto || 0
    }));

    // Ordena decrescente pelo gasto
    dados.sort((a, b) => b.y - a.y);

    return dados;
  }
}
