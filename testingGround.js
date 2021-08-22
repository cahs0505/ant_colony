const appWidth = 3000
const appHeight = 1500

const app = new PIXI.Application({
    width:appWidth, 
    height:appHeight,
    backgroundColor: 0xf6c260
});
document.body.appendChild(app.view);

let x = Math.random() * app.screen.width;
let y = Math.random() * app.screen.height;

let ant = Ant(x,y)


app.stage.addChild(ant);



app.ticker.add((delta)=>{

    ant.x += Math.cos(ant.direction) * ant.speed;
    ant.y += Math.sin(ant.direction) * ant.speed;
    ant.direction += ant.swerve;
    if(Math.random()<0.05) ant.swerve = (Math.random()-0.5)*0.1;
    ant.rotation = ant.direction+Math.PI/2;

})