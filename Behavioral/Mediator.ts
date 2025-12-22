// Позволяет убрать жесткое связывание разных классов и сделать 
// объект который бы дерижировал управление 

// Аналогия: Пилоты самолета общаются через диспетчера (Mediator) во время полета

// Компоненты не должны общаться друг с другом напрямую. 
// Если в компоненте происходит важное событие, он должен оповестить своего посредника, 
// а тот сам решит — касается ли событие других компонентов, и стоит ли их оповещать. 
// При этом компонент-отправитель не знает кто обработает его запрос, а компонент-получатель не знает кто его прислал.

abstract class AbstractMediator {
    abstract notify(from: object, to: string, event: string): void;
}
abstract class AbstractPilot {
    protected mediator: AbstractMediator;
    constructor(mediator: AbstractMediator) {
        this.mediator = mediator;
    }
}

class Pilot extends AbstractPilot {
    notify(event: string, to: string): void {
        this.mediator.notify(this, to, event);
    }
}

class PilotMediator extends AbstractMediator {
    notify(from: object, to: string, event: string): void {
        // Какое-то действие на ивент от пилота(Обрабатываем)
        console.log(`${from} notify ${to} about ${event}`);
    }
}

const pilotMediator = new PilotMediator();
const pilot = new Pilot(pilotMediator);

pilot.notify('take off', 'dispatcher');