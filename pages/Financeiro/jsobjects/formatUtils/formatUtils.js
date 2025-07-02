export default {
  moedaParaNumero(valor) {
    if (!valor) return 0;
    if (typeof valor === 'number') return valor;

    try {
      return Number(
        String(valor)
          .replace(/[R$\s]/g, '')
          .replace(/\./g, '')
          .replace(',', '.')
      );
    } catch (e) {
      return 0;
    }
  }
}
