const appWidth = 3000
const appHeight = 1500

const LOOP = 50;

const app = new PIXI.Application({
    width:appWidth, 
    height:appHeight,
    backgroundColor: 0xf6c260
});
document.body.appendChild(app.view);

// holder to store the aliens
const ants = []
const traits = []
const pheromone = []
const foods = []

const antNum = 1
const foodNum = 15


for (let i = 0; i < antNum; i++) {

    let x = Math.random() * app.screen.width;
    let y = Math.random() * app.screen.height;

    let ant = Ant(x,y)
    ants.push(ant)
    console.log(ant.children)

    app.stage.addChild(ant);
}

ants.forEach((ant)=>{
    setInterval(()=>{
        const trait = PIXI.Sprite.from("texture/trait.png")
        trait.scale.set(0.1)
        trait.x = ant.x
        trait.y = ant.y
        traits.push(trait)
        app.stage.addChild(trait)
    },200)
})

for (let i = 0; i < foodNum; i++){
    const food = PIXI.Sprite.from("texture/food.png")
    food.anchor.set(0.5)
    food.scale.set(0.3)
    food.x = Math.random() * app.screen.width;
    food.y = Math.random() * app.screen.height;
    // food.anchor.set(0.5)
    foods.push(food)
    app.stage.addChild(food)
}

app.ticker.add(() => {
    // iterate through the ants and update their position
    for (let i = 0; i < ants.length; i++) {
        const ant = ants[i];
        let vision = ant.children[1]

        if(ant.seesFood){
            //move towards food if ant sees food
            ant.x += Math.cos(ant.targetFoodDirection) * ant.speed
            ant.y += Math.sin(ant.targetFoodDirection) * ant.speed
            ant.rotation = ant.targetFoodDirection + Math.PI/2

            continue


        }else{
            //check if ant sees food
            foods.forEach((food)=>{
                if(vision.containsPoint(food.position)){
                    ant.seesFood = true
                    ant.targetFood = food.position
                    ant.targetFoodDirection = Math.atan2(ant.targetFood.y-ant.y,ant.targetFood.x-ant.x)

                }
            })
        }

        
        //wander around when ant sees no food
        ant.x += Math.cos(ant.direction) * ant.speed;
        ant.y += Math.sin(ant.direction) * ant.speed;

        if(ant.x<-LOOP) ant.x=app.renderer.width+LOOP;
		if(ant.x>app.renderer.width+LOOP) ant.x=-LOOP;
		if(ant.y<-LOOP) ant.y=app.renderer.height+LOOP;
		if(ant.y>app.renderer.height+LOOP) ant.y=-LOOP;
        
        ant.direction += ant.swerve;
		if(Math.random()<0.08){
            ant.swerve = (Math.random()-0.5)*SWERVE
        }
        ant.rotation = ant.direction+Math.PI/2;
       

        

    }

    for (let i=0;i<traits.length;i++){
        let trait = traits[i]
        trait.alpha-=0.005
        if(trait.alpha==0){
            app.stage.removeChild(traits.pop())
        }
    }


});
