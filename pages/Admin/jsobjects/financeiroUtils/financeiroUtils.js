export default {
  getUpdatedItemBody: () => {
    const row =
      TabelaItens.processedTableData[TabelaItens.updatedRowIndices[0]];

    const data = {};
    if (row?.descricao) {
      data.descricao = row.descricao;
    }
    if (row?.tipo === "CAPITAL" || row?.tipo === "CUSTEIO") {
      data.tipo = row.tipo;
    }

    return { data };
  }
}
