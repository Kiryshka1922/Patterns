// Factory определяет базовый класс для создания объектов позволяя 
// подклассам изменять тип создаваемого объекта
// - Нужно чтобы подклассы имели что-то общее, для обоснования использования фабрики
// - Удобно потом для масштабирования и добавления новых методов/свойств

// Может меняться в зависимости от вида инстанса
interface IInsurance {
    submit: () => Promise<{ isSuccess: boolean, error?: Error; }>;
    specificProperty: Partial<Record<string, any>>;
}

class ABInsurance implements IInsurance {
    submit(): ReturnType<IInsurance['submit']> {
        return Promise.resolve({ isSuccess: true });
    }
    specificProperty = {
        a: 1,
        b: 2
    };
}

class XYInsurance implements IInsurance {
    submit(): ReturnType<IInsurance['submit']> {
        return new Promise((resolve) => {
            while (Math.random() > 0.5) continue;

            resolve({ isSuccess: true });
        });
    }
    specificProperty = {
        x: 1,
        y: 2
    };
}

interface IInsuranceFactory {
    db: {
        insurances: { status: string; owner: string }[];
        users: { name: string; age: number }[];
    }
}
abstract class InsuranceFactory implements IInsuranceFactory {
    db: IInsuranceFactory['db'] = {
        insurances: [],
        users: [],
    }
    abstract createInsurance(...args: any[]): IInsurance;

    saveToDb(insurnace: IInsuranceFactory['db']['insurances'][number]) {
        this.db.insurances.push({ ...insurnace });
    }
}

class ABInsuranceFactory extends InsuranceFactory {
    createInsurance(): ABInsurance {
        return new ABInsurance();
    }
}

class XYInsuranceFactory extends InsuranceFactory {
    createInsurance(): XYInsurance {
        return new XYInsurance();
    }
}

// А можно одну фабрику реализовать которая будет решать что создать

interface mappedInsurance {
    ab: ABInsurance,
    xy: XYInsurance
}

class UniversalInsuranceFactory extends InsuranceFactory {
    createInsurance<K extends keyof mappedInsurance>(type: K): mappedInsurance[K] {
        const insuranceMap: mappedInsurance = {
            ab: new ABInsurance(),
            xy: new XYInsurance()
        };
        return insuranceMap[type];
    }
}