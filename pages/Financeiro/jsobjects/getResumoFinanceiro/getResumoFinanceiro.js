export default {
  getResumoFinanceiro: () => {
    const itens = getCapitalCusteioItens.data?.data || [];
    const membros = getMembros.data?.data || [];

    const categorias = {
      terceiros: ["terceiros", "pessoa jurídica", "prestador"],
      assinaturas: ["assinatura", "licença", "software"],
      passagens: ["passagem", "transporte", "viagem"]
    };

    const matchCategoria = (nome, lista) =>
      lista.some(cat => nome.toLowerCase().includes(cat));

    const resumo = {
      bolsas: 0,
      terceiros: 0,
      assinaturas: 0,
      passagens: 0
    };

    // 🧠 Somar bolsas
    membros.forEach(membro => {
      (membro.planos_de_trabalho || []).forEach(plano => {
        const valor = plano?.bolsa?.valor;
        if (typeof valor === "number") {
          resumo.bolsas += valor;
        }
      });
    });

    // 💼 Somar itens de custeio/capital (menos bolsas)
    itens.forEach(item => {
      const nome = item.item?.toLowerCase() || "";
      const gasto = Number(item.gasto || 0);

      if (matchCategoria(nome, categorias.terceiros)) resumo.terceiros += gasto;
      else if (matchCategoria(nome, categorias.assinaturas)) resumo.assinaturas += gasto;
      else if (matchCategoria(nome, categorias.passagens)) resumo.passagens += gasto;
    });

    return resumo;
  }
};
