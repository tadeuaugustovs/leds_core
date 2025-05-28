export default {
	myFun1: () => {
		// Verifica se NÃO existe usuário logado
		if (!appsmith.store.user || !appsmith.store.user.email) {
			navigateTo("authentication-6824f0995d08da37cb92823f", "SAME_WINDOW");
		}
	}
