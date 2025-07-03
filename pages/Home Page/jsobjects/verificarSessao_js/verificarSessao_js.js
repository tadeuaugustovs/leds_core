export default {
  verificarSessao() {
    let usuario = appsmith.store.usuario;

    if (!usuario) {
      // tenta carregar do localStorage
      const usuarioStr = window.localStorage.getItem("usuario");
      if (usuarioStr) {
        usuario = JSON.parse(usuarioStr);
        storeValue("usuario", usuario);
      }
    }

    if (!usuario || !usuario.email) {
      showAlert("Você precisa estar logado para acessar esta página.", "error");
      navigateTo("Authentication", "SAME_WINDOW");
      return false;
    }

    return true;
  }
}
