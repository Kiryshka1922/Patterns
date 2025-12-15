// Цеопочка выполняемых действий с удобной возможностью их чейнить(соединять)

interface IRequest {
    body: any;
    id: number;
}

abstract class AbstractMiddleware {
    protected next: AbstractMiddleware | null = null;
    public setNext(middleware: AbstractMiddleware): void {
        this.next = middleware;
    }
    handle(request: IRequest) {
        if (this.next) {
            this.next.handle(request);
        }
    };
}

class AuthMidleware extends AbstractMiddleware {
    override handle(request: IRequest): void {
        if (request.id === 1){
            super.handle(request);
            return;
        }
        console.log('AuthMidleware failure');
    }
}

class ValidateMidleware extends AbstractMiddleware {
    override handle(request: IRequest): void {
        if (request.body.name){
            super.handle(request);
            return;
        }
        console.log('ValidateMidleware failure');
    }
}

class Controller extends AbstractMiddleware {
    override handle(request: IRequest): void {
        console.log('All midlewares have success');
    }
}

const authMidleware = new AuthMidleware();
const validateMidleware = new ValidateMidleware();
const controller = new Controller();

authMidleware.setNext(validateMidleware);
validateMidleware.setNext(controller);

authMidleware.handle({
    body: {
        name: 'John'
    },
    id: 2
});

authMidleware.handle({
    body: {
        names: ['John', 'Kate']
    },
    id: 1
});

authMidleware.handle({
    body: {
        name: 'John'
    },
    id: 1
});