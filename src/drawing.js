// drawing.js
import * as fs from 'fs';

class GenericElement{
    constructor(name) {
        this.name = name;
        this.children = [];
      }

    addAttr(name, value) {
        this[name] = value;
    }

    setAttr(name, value){
        this[name] = value;
    }

    addAttrs(obj){
        Object.keys(obj).reduce((_, key) => {
            this[key] = obj[key];
        }, null);

    }

    toString() {
        const keys = Object.keys(this).filter(key => key !== 'name' && key !== 'children');
    
        const attrs = keys.map((key) => `${key}="${this[key]}"`).join(' ');
    
        const childrenStr = this.children.map(child => child.toString()).join('');

        if(attrs){
            return `<${this.name} ${attrs}>${childrenStr}</${this.name}>`;
        }
        else{
            return `<${this.name}${attrs}>${childrenStr}</${this.name}>`;
        }

    }

    removeAttrs(arr){
        if (arr.length === 0) {
            return;
        }

        if (Object.prototype.hasOwnProperty.call(this,arr[0])) {
            delete this[arr[0]];
        }

        this.removeAttrs(arr.slice(1));
    }

    addChild(child) {
        this.children.push(child);
    }

    write(fileName, cb){
        fs.writeFileSync(fileName, this.toString(), cb);
    }
}


class RootElement extends GenericElement {
    constructor() {
        super('svg');
        this.addAttr('xmlns', 'http://www.w3.org/2000/svg');
    }
}

class RectangleElement extends GenericElement {
    constructor(x, y, width, height, fill) {
        super('rect');
        this.addAttrs({ x, y, width, height, fill });
    }
}

class TextElement extends GenericElement {
    constructor(x, y, fontSize, fill, content) {
        super('text');
        this.addAttrs({ x, y, 'font-size': fontSize, fill });
        this.content = content; // Text content
    }

    // Override toString to include text content
    toString() {
        const keys = Object.keys(this).filter(key => key !== 'name' && key !== 'children' && key !== 'content');
    
        const attrs = keys.map((key) => `${key}="${this[key]}"`).join(' ');

        return `<${this.name} ${attrs}>${this.content}</${this.name}>`;
    }
}

// create root element with fixed width and height
const root = new RootElement();
root.addAttrs({width: 800, height: 170, abc: 200, def: 400});
root.removeAttrs(['abc','def', 'non-existent-attribute']);

// create circle, manually adding attributes, then add to root element
const c = new GenericElement('circle');
c.addAttr('r', 75);
c.addAttr('fill', 'yellow');
c.addAttrs({'cx': 200, 'cy': 80});
root.addChild(c);

// create rectangle, add to root svg element
const r = new RectangleElement(0, 0, 200, 100, 'blue');
root.addChild(r);

// create text, add to root svg element
const t = new TextElement(50, 70, 70, 'red', 'wat is a prototype? 😬');
root.addChild(t);

// show string version, starting at root element
console.log(root.toString());

// write string version to file, starting at root element
root.write('test.svg', () => console.log('done writing!'));

export {GenericElement, RectangleElement, TextElement, RootElement};