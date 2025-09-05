import config from '../../config.json';

export function getProductIdByPrice(price: number): string | null {
    const product = config.products.find(
        item => (item.price) === price
    );
    return product ? product.id : null;
}