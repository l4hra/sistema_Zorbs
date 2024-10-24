export function validateUserZorbsData(empresas) {
    const errors = [];

    // Validando o Razão social da empresa
    if (!empresas.razao_social || typeof empresas.razao_social !== 'string' || empresas.razao_social.trim().length === 0) {
        errors.push('A Razão social da empresa é obrigatório e deve ser uma string.');
    } else if (empresas.razao_social.length > 100) {
        errors.push('A Razão social da empresa deve ter no máximo 100 caracteres.');
    }

    
}

export function validateUserZorbsId(id) {
    if (!id || typeof id !== 'number' || id <= 0) {
        return ['O ID da empresa deve ser um número positivo.'];
    }
    return [];
}