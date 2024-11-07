export function validateProductData(product) {
    const errors = [];

    // Validando o nome do produto
    if (!product.name || typeof product.name !== 'string' || product.name.trim().length === 0) {
        errors.push('O nome do produto é obrigatório e deve ser uma string.');
    } else if (product.name.length > 100) {
        errors.push('O nome do produto deve ter no máximo 100 caracteres.');
    }

    // Validando o tipo do produto
    if (!product.type || typeof product.type !== 'string' || product.type.trim().length === 0) {
        errors.push('O tipo do produto é obrigatório e deve ser uma string.');
    }

    // Validando a categoria do produto
    if (!product.category || typeof product.category !== 'string' || product.category.trim().length === 0) {
        errors.push('A categoria do produto é obrigatória e deve ser uma string.');
    }

    // Validando a unidade de medida
    if (!product.unidade_medida || typeof product.unidade_medida !== 'string' || product.unidade_medida.trim().length === 0) {
        errors.push('A unidade de medida é obrigatória e deve ser uma string.');
    }

    // Validando o preço de custo
    if (product.preco_custo == null || typeof product.preco_custo !== 'number' || product.preco_custo < 0) {
        errors.push('O preço de custo deve ser um número maior ou igual a 0.');
    }

    // Validando o preço de venda
    if (product.preco_venda == null || typeof product.preco_venda !== 'number' || product.preco_venda < 0) {
        errors.push('O preço de venda deve ser um número maior ou igual a 0.');
    }

    // Validando a observação (se fornecida)
    if (product.observacao && typeof product.observacao !== 'string') {
        errors.push('A observação deve ser uma string, caso fornecida.');
    }

    return errors;
}

// Função para validar o ID do produto
export function validateProductId(id) {
    if (!id || typeof id !== 'number' || id <= 0) {
        return ['O ID do produto deve ser um número positivo.'];
    }
    return [];
}
