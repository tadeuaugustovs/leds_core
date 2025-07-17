export default {
  getUpdatedItemBody: () => {
    const row =
      Excluir.processedTableData[Excluir.updatedRowIndices[0]];

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
