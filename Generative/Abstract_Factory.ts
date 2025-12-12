// Похоже на обычную фабрику но здесь фабрика создает 
// семейство связанных объектов
// Ex. Темизация или платформенный реестр в приложении 
// На этапе инициализации создаем фабрику нужной реализации 
// и используем ее для создания объектов на основе общего интерфейса

interface CheckBox {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

interface Button {
    text: string;
    onClick: () => void;
}
// Можно также создать общий класс содержащий общую логику для двух платформ

abstract class ButtonBase implements Button {
    abstract paint(): void;
    onClickExternal: () => void;
    text: string;

    constructor(text: string, onClickExternal: () => void){
        this.text = text;
        this.onClickExternal = onClickExternal;
    };

    onClick(){
        // Можно сюда положить общую логику - логирование, аналитику
        this.onClickExternal();
    }
}
class WinButton extends ButtonBase {
    paint(){
        console.log('render in Windows')
    }
}

class MacButton extends ButtonBase {
    paint(){
        console.log('render in Mac')
    }
}

// Здесь не стал это делать, но также можно логику не дублировать
class WinCheckBox implements CheckBox {
    checked: boolean;
    onChange: (checked: boolean) => void;

    constructor(checked: boolean, onChange: (checked: boolean) => void){
        this.checked = checked;
        this.onChange = onChange;
    };
    paint(){
        console.log('render in Windows')
    }
}

class MacCheckBox implements CheckBox {
    checked: boolean;
    onChange: (checked: boolean) => void;

    constructor(checked: boolean, onChange: (checked: boolean) => void){
        this.checked = checked;
        this.onChange = onChange;
    };
    paint(){
        console.log('render in Mac')
    }
}

interface GuiFactory {
    createButton(text: string, onClick: () => void): Button;
    createCheckBox(checked: boolean, onChange: (checked: boolean) => void): CheckBox;
}
class WinFactory implements GuiFactory {
    createButton(text: string, onClick: () => void): Button {
        return new WinButton(text, onClick);
    }
    createCheckBox(checked: boolean, onChange: (checked: boolean) => void): CheckBox {
        return new WinCheckBox(checked, onChange);
    }
}

class MacFactory implements GuiFactory {
    createButton(text: string, onClick: () => void): Button {
        return new MacButton(text, onClick);
    }
    createCheckBox(checked: boolean, onChange: (checked: boolean) => void): CheckBox {
        return new MacCheckBox(checked, onChange);
    }
}