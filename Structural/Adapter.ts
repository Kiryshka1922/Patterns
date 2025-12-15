// Позволяет совместить несовместимые интерфейсы объектов.
// Адаптер наследует и переопределяет методы уже свуществующего интерфейса чтобы
// подмена произошла бесшовоной

// Вообще лучше всего наследовать адатер от обоих классов но в TS такого нету, прокидываем
// экземпляр в конструктор адаптера

// Есть наш класс с которым работаем всегда
class NewSquare {
    width: number;
    height: number;
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

    }

    getArea() {
        return this.width * this.height;
    }
}

// Есть старый который нужно внедрить в нашу систему, его править нельзя
class OldSquare {
    width: number;
    height: number;
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}

// Делаем адаптер
class OldSquareAdapter extends NewSquare {
    oldSquare: OldSquare;
    constructor(oldSquare: OldSquare) {
        super(oldSquare.getWidth(), oldSquare.getHeight());
        this.oldSquare = oldSquare;
    }

    getArea() {
        return this.oldSquare.getWidth() * this.oldSquare.getHeight();
    }
}

const newSquare = new NewSquare(10, 20);
console.log(newSquare.getArea());

const oldSquare = new OldSquare(10, 20);
// oldSquare.getArea(); - нет такого метода
const oldSquareAdapter = new OldSquareAdapter(oldSquare);
console.log(oldSquareAdapter.getArea());