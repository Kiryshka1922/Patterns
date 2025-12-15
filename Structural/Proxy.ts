// Добавляет доп слой для доп логики которая будет спецефична для проекта
// Расширение классов (Прослойка)

interface IPaymentApi {
    getPaymentDetail(id: number): Promise<number>;
    createPayment(id: number, amount: number): Promise<void>;
}

class PaymentApi implements IPaymentApi {
    db: Map<number, number> = new Map();
    async getPaymentDetail(id: number): Promise<number> {
        return this.db.get(id)!;
    }

    async createPayment(id: number, amount: number): Promise<void> {
        this.db.set(id, amount);
    }
}

class ProxyPaymentApi implements IPaymentApi {
    api: PaymentApi;
    constructor(api: PaymentApi) {
        this.api = api;
    }
    async getPaymentDetail(id: number): Promise<number> {
        // Доп логика
        console.log('getPaymentDetail');
        return this.api.getPaymentDetail(id);
    }

    async createPayment(id: number, amount: number): Promise<void> {
        // Доп логика
        console.log('createPayment');
        return this.api.createPayment(id, amount);
    }
}

const paymentApi = new ProxyPaymentApi(new PaymentApi());
paymentApi.createPayment(1, 100);
paymentApi.getPaymentDetail(1);