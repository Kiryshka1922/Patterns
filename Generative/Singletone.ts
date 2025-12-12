// Не позволяет создавать больше одного инстанса класса

// Пример: 

interface ISharedState {
    state: Map<number, string>;
    getState: () => ISharedState['state'];
}
class SharedState implements ISharedState {
    private static instance: SharedState;
    state: ISharedState['state'] = new Map();

    public static getInstance(): SharedState {
        if (!this.instance) {
            this.instance = new SharedState();
        }
        return this.instance;
    }

    getState(): ISharedState['state'] {
        return this.state;
    }

    // Ну и изменения общего стейта
}

class Service1 {
    getState(): ISharedState['state'] {
        return SharedState.getInstance().getState();
    }
}

class Service2 {
    getValue(key: number) {
        return SharedState.getInstance().getState().get(key);
    }
}