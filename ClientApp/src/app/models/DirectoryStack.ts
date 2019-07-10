import { strictEqual } from 'assert';

const CAPACITY:number=10;

export class DirectoryStack {

    private elements:Array<string>;
    private _size:number;
    
    public constructor(capacity:number = CAPACITY){
        this.elements = new Array<string>(capacity);
        this._size = 0;
    }

    public push(o:string){
        var len = this.elements.length;
        if(this._size >= len){
            let temp = new Array<string>(len);
            this.elements=this.elements.concat(temp);
        }
        this.elements[this._size++]=o;
    }

    public pop():string{
        return this.elements[--this._size];
    }

    public peek():string{
        return this.elements[this._size-1];
    }

    public size():number{
        return this._size;
    }
    
    public empty():boolean{
        return this._size==0;
    }

    public clear(capacity:number = CAPACITY){
        delete this.elements;
        this.elements = new Array(capacity);
        this._size = 0;
    }

    public subpath():string
    {
        var result:string = "";
                
        for(var i = 0;i< this._size;i++)
        {
            result += this.elements[i];
            if(i != this._size - 1)
                result += "/";
        }

        return result;
    }
}