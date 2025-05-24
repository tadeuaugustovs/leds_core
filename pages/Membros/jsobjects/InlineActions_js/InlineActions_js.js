export default {
  salvarCampoRedeSocial: async () => {
    const campo = Table2.updatedRow.nome;
    const valor = Table2.updatedRow.valor;

    const body = {
      data: {
        [campo]: valor,
      },
    };

    return updateMembro.run({
      body: body,
    });
  }
}
