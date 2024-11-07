export function validateCompanies(id) {
    if (!id || typeof id !== 'number' || id <= 0) {
        return ['O ID da empresa deve ser um número positivo.'];
    }
    return [];
}