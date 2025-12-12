// Скрываем сложную логику и взаимодействие
// Абстракто вызываем метод но не в курсе как он там работает 

interface ILog {
    message: string;
    logPath: string;
    logId: number;
};
class Logger {
    logs: ILog[] = [];

    constructor() {
        setTimeout(() => {
            this.sendLogs();
        }, 3000)
    }

    sendLogs(): void {
        console.table(this.logs);
        this.logs = [];
        setTimeout(() => {
            this.sendLogs();
        }, 3000)
    }

    getLogs(): ILog[] {
        return this.logs;
    }
    addLog(log: ILog): void {
        this.logs.push(log);
    }
};

class NotificationSender {
    send(template: string, to: string) {
        console.log(`Send ${template} to ${to}`);
    };
}

class Template {
    templates: { name: string, template: string }[] = [{
        name: 'any', template: '<h2>Здарова<h2/>'
    }];

    getTemplate(name: string): string {
        return this.templates.find(template => template.name === name)?.template || '';
    }
};

class NotificationFacade {
    logger: Logger;
    sender: NotificationSender;
    template: Template;

    constructor() {
        this.logger = new Logger();
        this.sender = new NotificationSender();
        this.template = new Template();
    }

    sendNotification(templateName: string, to: string): void {
        const template = this.template.getTemplate(templateName);
        this.sender.send(template, to);
        this.logger.addLog({
            message: `Send ${templateName} to ${to}`,
            logPath: '/logs/notification.log',
            logId: 1
        });
    }
};

const notificationFacade = new NotificationFacade();
let i = 3
while (i--){
    notificationFacade.sendNotification('any', 'user@gmail.com' + Math.random().toString());
}
