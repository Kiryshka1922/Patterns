// Используется для компоновки структуры которую можно было бы представить в виде дерева
// И удобно реализововывать один метод который объединяет в себе несколько методов из дочерних компонентов

interface IDeliveryItem {
    getPrice(): number;
    getPriceAllItems(): number;
    addItem(item: DeliveryItem): void;
}

abstract class DeliveryItem implements IDeliveryItem {
    items: DeliveryItem[] = [];
    addItem(item: DeliveryItem) {
        this.items.push(item);
    }
    getPriceAllItems(): number {
        return this.items.reduce((sum, item) => sum + item.getPrice(), 0);
    }

    abstract getPrice(): number;
}

class DeliveryShop extends DeliveryItem {
    deliveryPrice: number;
    constructor(deliveryPrice: number) {
        super();
        this.deliveryPrice = deliveryPrice;
    }
    getPrice(): number {
        return this.getPriceAllItems() + this.deliveryPrice;
    }
}

class Package extends DeliveryItem {
    getPrice(): number {
        return this.getPriceAllItems();
    }
}

class Product extends DeliveryItem {
    price: number;
    constructor(price: number) {
        super();
        this.price = price;
    }
    getPrice(): number {
        return this.price;
    }
}

const deliveryShop = new DeliveryShop(100); // Стоимость доставки
const pack = new Package();
const pack2 = new Package();

const product = new Product(100);
pack.addItem(product);

pack2.addItem(product)
pack2.addItem(product)
pack2.addItem(product)

deliveryShop.addItem(pack);
deliveryShop.addItem(pack2);

// Итоговая цена в корзине удобно получаем с помощью одного метода
console.log(deliveryShop.getPrice());