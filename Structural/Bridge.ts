// Позволяет не плодить классы для для разных комбинаций нескольких классов
// А связать их через общий интерфейс и класс 

interface INotification {
    send(message: string): void;
    sendTo(message: string, to: string): void;
}
class TelegramNotification implements INotification {
    public send(message: string): void {
        console.log(`Telegram: ${message}`);
    }

    public sendTo(message: string, to: string): void {
        console.log(`Telegram: ${message} to ${to}`);
    }
}

class EmailNotification implements INotification {
    public send(message: string): void {
        console.log(`Email: ${message}`);
    }

    public sendTo(message: string, to: string): void {
        console.log(`Email: ${message} to ${to}`);
    }
}

class DelayedTelegramNotification extends TelegramNotification {
    public send(message: string): void {
        console.log('Delayed Telegram: ' + message + '');
        setTimeout(() => {
            super.send(message);
        }, 1000);
    };
}

class NotifcicationSender {
    private notificationProvider: INotification;
    constructor(notificationProvider: INotification) {
        this.notificationProvider = notificationProvider;
    };

    sendMessage(){
        this.notificationProvider.send('Hello World');
    }
    sendMessageTo(to: string){
        this.notificationProvider.sendTo('Hello World', to);
    }
};

const notificationSender = new NotifcicationSender(new TelegramNotification());
notificationSender.sendMessage();
notificationSender.sendMessageTo('John Doe');

const notificationSenderDelayed = new NotifcicationSender(new DelayedTelegramNotification());
notificationSenderDelayed.sendMessage();