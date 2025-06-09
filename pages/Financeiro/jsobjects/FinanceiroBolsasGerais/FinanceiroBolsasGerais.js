export default {
  totaisDasBolsasGerais: () => {
    // 1. Total vindo direto da API
    const valorTotal = Number(getValorGeral.data?.data?.[0]?.valor_total || 0);

    // 2. Planejado: somando todas as bolsas dos planos de trabalho com valor
    const planos = getPlanoDeTrabalho.data?.data || [];
    const valorPlanejado = planos
      .filter(p => p?.bolsa?.valor)
      .reduce((soma, p) => soma + Number(p.bolsa.valor || 0), 0);

    // 3. Alocado: somando planos com status ATIVA e valor de bolsa
    const membros = getMembros.data?.data || [];
    const valorAlocado = membros
      .flatMap(m => m.planos_de_trabalho || [])
      .filter(p => p?.bolsa?.valor && p.statusBolsa === "ATIVA")
      .reduce((soma, p) => soma + Number(p.bolsa.valor || 0), 0);

    // 4. Restante: Total - Alocado
    const restante = valorTotal - valorAlocado;

    return {
      total: valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      planejado: valorPlanejado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      alocado: valorAlocado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      restante: restante.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    };
  }
}
