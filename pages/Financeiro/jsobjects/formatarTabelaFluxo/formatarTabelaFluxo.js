export default {
  getTabelaFormatada() {
    return getItensFluxoCaixa.data?.data?.map(entry => {
      const attr = entry.attributes;
      return {
        data: new Date(attr.data).toLocaleDateString('pt-BR'),
        descricao: attr.descricao ?? '-',
        item: attr.capital_custeio_item?.data?.attributes?.item ?? '-',
        tipo: attr.capital_custeio_item?.data?.attributes?.Tipo ?? '-',
        receita: attr.receita ? `R$ ${Number(attr.receita).toLocaleString("pt-BR", {minimumFractionDigits: 2})}` : '-',
        despesa: attr.despesa ? `R$ ${Number(attr.despesa).toLocaleString("pt-BR", {minimumFractionDigits: 2})}` : '-',
        restante: attr.restante ? `R$ ${Number(attr.restante).toLocaleString("pt-BR", {minimumFractionDigits: 2})}` : '-',
        id: entry.id,
      };
    });
  }
}
