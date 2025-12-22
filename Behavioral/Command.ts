// Выполнение команд через посредника в который передаем то что нужно сделать
// Грубо говоря уносим бизнес-логику в отдельный класс и возможно ее переиспользуем
// в различных классах. И то class Command будет как прослойка между отправителем и получателем

//Отправитель хранит ссылку на объект команды и обращается к нему, когда нужно выполнить какое-то действие. 
// Отправитель работает с командами только через их общий интерфейс. 
// Он не знает, какую конкретно команду использует, так как получает готовый объект команды от клиента.

abstract class Command {
    history: UserHistory;
    commandId: number;
    abstract execute(): void;
    abstract undo(): void;
    constructor(history: UserHistory) {
        this.history = history;
        this.commandId = Math.random();
    }
}

class User {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

class UserHistory {
    history: User[] = [];
    add(user: User): void {
        this.history.push(user);
    }
    remove(user: User): void {
        const index = this.history.indexOf(user);
        if (index === -1) return;
        this.history.splice(this.history.indexOf(user), 1);
    }
}

class UserService {
    save(user: User): void {
        console.log(`Save user ${user.name}`);
    }
    remove(user: User): void {
        console.log(`Remove user ${user.name}`);
    }
}

class AddUserCommand extends Command {
    sender: User;
    reciever: UserService;
    constructor(sender: User, reciever: UserService, history: UserHistory) {
        super(history);
        this.sender = sender;
        this.reciever = reciever;
    }
    execute(): void {
        this.reciever.save(this.sender);
        this.history.add(this.sender);
    }
    undo(): void {
        this.reciever.remove(this.sender);
        this.history.remove(this.sender);
    }
}

class Controller {
    history: UserHistory = new UserHistory();
    reciever: UserService = new UserService();

    execute(): void {
        const command = new AddUserCommand(new User('John', 25), this.reciever, this.history);
        command.execute();
    }
}

const user = new User('John', 25);
const history = new UserHistory();
const service = new UserService();
const command = new AddUserCommand(user, service, history);
const controller = new Controller();
controller.execute();

export {};