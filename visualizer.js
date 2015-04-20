'use strict';
function Graph(){
    var graph=this;
    var vertices=[];
    var edges=[];
    var edgecreation={};
    var width=640,height=480;
    var div=document.createElement('div');
    div.className='noselection';
    div.style.position='relative';
    div.style.cursor='default';
    var Vertex=function(id,position){
        var edges=[];
        var div=document.createElement('div');
        (function(){
            var canvas=document.createElement('canvas'); (function(){
                canvas.width=22;
                canvas.height=22;
                var context=canvas.getContext('2d');
                context.beginPath();
                context.arc(11,11,10,0,2*Math.PI);
                context.stroke();
                canvas.oncontextmenu=function(e){
                    e.preventDefault();
                };
            })();
            var div_id=document.createElement('div');
            (function(){
                div_id.style.position='relative';
                div_id.style.top='-11px';
                div_id.style.textAlign='center';
                div_id.innerHTML=id;
            })();
            div.addEventListener('mousedown',function(e){
                var vector_mouse_to_position
                    =position.sub(position_mouse(e));
                var mousemove=function(e){
                    position=position_mouse(e).add(vector_mouse_to_position);
                    update();
                    for(var i in edges){var e=edges[i];
                        e.redraw();
                    }
                };
                var mouseup=function(e){
                    window.removeEventListener('mousemove',mousemove);
                    window.removeEventListener('mouseup',mouseup);
                    // redraw all edges adjacent to this vertex.
                    for(var i in edges){var e=edges[i];
                        e.redraw();
                    }
                };
                window.addEventListener('mousemove',mousemove);
                window.addEventListener('mouseup',mouseup);
            });
            div.oncontextmenu=function(e){
                if(edgecreation.v===undefined){
                    edgecreation.v=vertices[id];
                }else{
                    var edge=new Edge(
                        edgecreation.v,vertices[id]
                    );
                    edge.vertex_v.push_edge(edge);
                    edge.vertex_w.push_edge(edge);
                    graph.edges.push(edge);
                    edgecreation.v=undefined;
                }
                return false;
            };
            div.appendChild(canvas);
            div.appendChild(div_id);
            div.style.position='absolute';
            div.style.zIndex='1';
            div.style.lineHeight='0';
        })();
        var update=function(){
            div.style.left=position.x+'px';
            div.style.top=position.y+'px';
        };
        update();
        graph.div.appendChild(div);
        this.id=id;
        this.position=function(){
            return position;
        };
        this.push_edge=function(e){
            edges.push(e);
        };
    };
    var Edge=function(vertex_v,vertex_w){
        var canvas=document.createElement('canvas');
        var draw=function(){
            var context=canvas.getContext('2d');
            var position_v=vertex_v.position();
            var position_w=vertex_w.position();
            var vector_vw=position_w.sub(position_v);
            vector_vw=vector_vw.div(vector_vw.abs());
            var vector_start=position_v.add(vector_vw.mul(10));
            var vector_end=position_w.sub(vector_vw.mul(10));
            context.beginPath();
            context.moveTo(vector_start.x,vector_start.y);
            context.lineTo(vector_end.x,vector_end.y);
            context.stroke();
        };
        (function(){
            canvas.style.position='absolute';
            canvas.style.left='11px';
            canvas.style.top='11px';
            canvas.width=width;
            canvas.height=height;
            draw();
        })();
        this.redraw=function(){
            var context=canvas.getContext('2d');
            context.clearRect(0,0,canvas.width,canvas.height);
            draw();
        };
        graph.div.appendChild(canvas);
        this.vertex_v=vertex_v;
        this.vertex_w=vertex_w;
    };
    this.addvertex=function(){
        vertices.push(new Vertex(
            vertices.length,
            new Vector(100,100)
        ));
    };
    this.input=function(s){
        var input=s.split(/[ \n]/);
        width=parseInt(input[0]);input.shift();
        height=parseInt(input[0]);input.shift();
        div.style.width=width+'px';
        div.style.height=height+'px';
        var cv=parseInt(input[0]);input.shift();
        var ce=parseInt(input[0]);input.shift();
        for(var i=0;i<cv;i++){
            var x=parseInt(input[0]);input.shift();
            var y=parseInt(input[0]);input.shift();
            vertices.push(new Vertex(
                vertices.length,
                new Vector(x,y)
            ));
        }
        for(var i=0;i<ce;i++){
            var v=parseInt(input[0]);input.shift();
            var w=parseInt(input[0]);input.shift();
            var edge=new Edge(
                vertices[v],vertices[w]
            );
            edge.vertex_v.push_edge(edge);
            edge.vertex_w.push_edge(edge);
            edges.push(edge);
        }
    };
    this.output=function(){
        var output='';
        output+=vertices.length+' '+edges.length+'\n';
        for(var i in vertices){var position_v=vertices[i].position();
            output+=position_v.x+' '+position_v.y+'\n'
        }
        for(var i in edges){var e=edges[i];
            output+=e.vertex_v.id+' '+e.vertex_w.id+'\n'
        }
        document.getElementById('pre_output').innerHTML=output;
    }
    this.vertices=vertices;
    this.edges=edges;
    this.edgecreation=edgecreation;
    this.div=div;
}
function graphvisualize(e){
    var graph=new Graph();
    graph.input(e.innerHTML);
    e.innerHTML='';
    e.appendChild(graph.div);
}
function graphvisualize_all(e){
    var a=e.getElementsByClassName('graphvisualizer');
    for(var i=0;i<a.length;i++){
        graphvisualize(a[i]);
        a[i].style.visibility='visible';
    }
}
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
function position_mouse(e){
    return new Vector(
        e.clientX+document.body.scrollLeft-
            document.body.clientLeft,
        e.clientY+document.body.scrollTop-
            document.body.clientTop
    );
}
