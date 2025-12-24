//  Когда у вас есть сложная структура данных, и вы хотите скрыть от клиента детали её 
// реализации (из-за сложности или вопросов безопасности). Выносим в отдельный класс логику обхода
// сложной структуры данных и предоставляем клиенту простой интерфейс для работы.

abstract class Iterator<T> {
    abstract next(): T;
    abstract hasNext(): boolean;
}

abstract class SocialNetwork {
    abstract createAgeIterator(age: number): Iterator<User | null>;
    abstract createFriendsIterator(countFriends: number): Iterator<User | null>;
}

interface User {
    name: string;
    age: number;
    countFriends: number;
}
class Facebook extends SocialNetwork {
    users: User[];
    constructor(users: User[]) {
        super();
        this.users = users;
    }
    createAgeIterator(age: number) {
        return new FacebookAgeIterator(this, age);
    }
    createFriendsIterator(countFriends: number) {
        return new FacebookFriendsIterator(this, countFriends);
    }

    getUsers(): User[] {
        return this.users;
    }
}

// Реализуем конкретные итераторы со своими приколами
class FacebookAgeIterator extends Iterator<User | null> {
    age: number;
    currentPosition: number;
    facebook: Facebook;
    constructor(facebook: Facebook, age: number) {
        super();
        this.age = age;
        this.currentPosition = 0;
        this.facebook = facebook;
    }
    next() {
        const filteredUsers = this.facebook.getUsers().filter(user => user.age >= this.age);
        if (filteredUsers.length && this.currentPosition < filteredUsers.length) {
            return filteredUsers[this.currentPosition++];
        }
        return null;
    }
    hasNext() {
        const filteredUsers = this.facebook.getUsers().filter(user => user.age >= this.age);
        return Boolean(filteredUsers.length && this.currentPosition < filteredUsers.length);
    }
}

class FacebookFriendsIterator extends Iterator<User | null> {
    countFriends: number;
    currentPosition: number;
    facebook: Facebook;
    constructor(facebook: Facebook, countFriends: number) {
        super();
        this.countFriends = countFriends;
        this.currentPosition = 0;
        this.facebook = facebook;
    }
    next() {
        this.currentPosition++;
        const filteredUsers = this.facebook.getUsers().filter(user => user.countFriends >= this.countFriends);
        if (filteredUsers.length && this.currentPosition < filteredUsers.length) {
            return filteredUsers[this.currentPosition];
        }
        return null;
    }
    hasNext() {
        const filteredUsers = this.facebook.getUsers().filter(user => user.countFriends >= this.countFriends);
        return Boolean(filteredUsers.length && this.currentPosition < filteredUsers.length);
    }
}

// Делаем класс который будет использовать итератор для отправки сообщения
// который даже не будет знать что отправляет сообщения в какую то конкретную соц сеть
class MessageSender {
    iterator: Iterator<User | null>;
    constructor(iterator: Iterator<User | null>) {
        this.iterator = iterator;
    }
    sendMessage() {
        while (this.iterator.hasNext()) {
            const user = this.iterator.next();
            if (user) {
                console.log(`Sending message to ${user.name}`);
            }
        }
    }
    setIterator(iterator: Iterator<User | null>) {
        this.iterator = iterator;
    }
}

const facebook = new Facebook([
    {
        name: 'John',
        age: 25,
        countFriends: 100,
    },
    {
        name: 'Jane',
        age: 30,
        countFriends: 50,
    },
]);
const messageSender = new MessageSender(facebook.createAgeIterator(10));
messageSender.sendMessage();




// Хак для TS, чтобы каджый файл был отдельным модулем
export { };