// Последовательное конструирование объекта
// Более понятно и наглядно, выглядит читаемее

// Можно напрямую создавать через класс, либо же создать Builderа 
// для самых частых конфигураций

// Используется в MongoDb для чейнинга запросов к базе данных

interface IImageResolution {
    width: number
    height: number
}
interface IImageFormatter extends IImageResolution {
    format: 'jpg' | 'png'
}

class ImageBuilder {
    private resolution: IImageResolution[] = []
    private formatter: Set< IImageFormatter['format']> = new Set();

    setResolution(resolution: IImageResolution) {
        this.resolution.push(resolution);
        return this
    }

    addJpg() {
        this.formatter.add('jpg');
        return this
    }
    addPng() {
        this.formatter.add('png');
        return this
    }
    setFormatter(format: IImageFormatter['format']) {
        this.formatter.add(format);
        return this
    }

    build() {
        const res: IImageFormatter[] = [];

        for (const format of this.formatter){
            for (const resolution of this.resolution){
                res.push({
                    format,
                    ...resolution
                })
            }
        }
        
        return res;
    }
}

const imageBuilder = new ImageBuilder();
console.log(imageBuilder.setResolution({ width: 100, height: 200 })
            .addJpg()
            .addPng()
            .build());
