function Vector(x,y){
    this.x=x;
    this.y=y;
    this.abs=function(){
        return Math.sqrt(this.x*this.x+this.y*this.y);
    };
    this.add=function(v){
        return new Vector(this.x+v.x,this.y+v.y);
    };
    this.sub=function(v){
        return new Vector(this.x-v.x,this.y-v.y);
    };
    this.mul=function(r){
        return new Vector(this.x*r,this.y*r);
    };
    this.div=function(r){
        return new Vector(this.x/r,this.y/r);
    };
    this.inp=function(v){
        return this.x*v.x+this.y*v.y;
    };
    this.otp=function(v){
        return this.x*v.y-this.y*v.x;
    };
    // rotate
    this.rtt=function(d){
        return new Vector(
            Math.cos(d)*this.x-Math.sin(d)*this.y,
            Math.sin(d)*this.x+Math.cos(d)*this.y);
    };
    this.min=function(v){
        return this.abs()<v.abs()?this:v;
    };
    // before
    this.bfr=function(v){
        return this.y<v.x;
    };
}
export default Vector
