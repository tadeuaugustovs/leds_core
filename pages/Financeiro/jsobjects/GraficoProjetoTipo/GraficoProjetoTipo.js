export default {
  porTipo: () => {
    const projetoId = Table5.selectedRow.documentId;
    const itens = getCapitalCusteioItens.data?.data || [];

    const acumulado = {};
    for (let item of itens) {
      if (item.projetos?.some(p => p.documentId === projetoId)) {
        const tipo = item.tipo || 'Outro';
        acumulado[tipo] = (acumulado[tipo] || 0) + (item.gasto || 0);
      }
    }

    return Object.entries(acumulado).map(([tipo, valor]) => ({
      x: tipo,
      y: valor
    }));
  }
}
