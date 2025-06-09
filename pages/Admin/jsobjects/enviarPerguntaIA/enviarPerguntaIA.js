export default {
  enviar: async (pergunta) => {
    const resposta = await ChatIA.run({ prompt: pergunta });
    storeValue("respostaIA", resposta.response || "Não consegui responder.");
  }
}
