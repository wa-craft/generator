// deno-lint-ignore-file
/** */
class ClassProperty {
    access: string = 'private';
    name: string = '';
    type: string = 'string';
    format = 'vachart(50)';
    description = '';
    default: string = '';
    example: string = '';
    enum: Array<string> = [];

    constructor(data: any) {
        this.access = data.access;
        this.name = data.name;
        this.type = data.type;
        this.format = data.format;
        this.description = data.description;
        this.default = data.default;
        this.example = data.example;
        this.enum = data.enum;
    }
}

export { ClassProperty };
