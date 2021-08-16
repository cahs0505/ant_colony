let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;


let dimension =500 ; //number of grid in each dimension
let gridSize = 5; 
let antNum = 10

window.onload =()=>{

    let app = new Application({ 
        width: document.body.clientWidth, 
        height: document.body.clientWidth,
        backgroundColor: 0xf2bfb4                     
        
      }
    );

    document.body.appendChild(app.view);

    loader
      .add("texture/soil_1.png")
      .add("texture/soil_2.png")
      .add("texture/soil_3.png")
      .add("texture/ant.png")
      .load(setup)
    
      function setup(){
        
        let ants = []

         for (let i=0;i<antNum;i++){
             let ant = new Ant()
             ants.push(ant)
             app.stage.addChild(ants[i].graphics)
         }
         
         app.ticker.add(delta=>{
             for(let i=0;i<antNum;i++){
                ants[i].update(delta)
             }
         })
      }
}

function Node(x,y){
      
    this.graphics = new Sprite(resources[`texture/soil_1.png`].texture)
    let g = this.graphics

    this.x = x 
    this.y = y 

    g.width = gridSize
    g.height = gridSize
    g.x = this.x * gridSize/2
    g.y = this.y * gridSize/2

    this.update = ()=>{      
    }
}

function Ant(){
    this.graphics = new Sprite(resources[`texture/ant.png`].texture)
    let g = this.graphics
    g.scale.set(0.1)

    this.charm = new Charm(PIXI);
    let c = this.charm

    this.speed = 2 
    this.x = 300
    this.y = 300
    this.angle = Math.random()*Math.PI;
    this.turn = (Math.random()-0.5)*0.1;

    this.update = (delta)=>{
        
        this.x = this.x + this.speed * delta * Math.cos(this.angle)
        this.y = this.y + this.speed * delta * Math.sin(this.angle)

        this.angle += this.turn;

        if(Math.random()<0.05){
            this.turn = (Math.random()-0.5)*0.1;
        }

        g.x = this.x
        g.y = this.y
        g.rotation = this.angle+Math.PI/2;
    }
   
    
}


