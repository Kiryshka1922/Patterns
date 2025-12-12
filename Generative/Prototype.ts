// отличительным явялется наличие метода clone 

interface User {
    name: string;
    age: number;
}
class UserHistory {
    private history: User[] = [];

    public add(user: User): void {
        this.history.push(user);
    }

    public clone(): UserHistory {
        const clone = new UserHistory();
        clone.history = [...this.history];
        return clone;
    }
}