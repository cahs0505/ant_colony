const SWERVE = 0.1 

const Ant = (x,y) =>{

    let antContainer = new PIXI.Container()
    let ant = PIXI.Sprite.from("texture/ant.png")
    let antVision = PIXI.Sprite.from("texture/vision.png")
    ant.anchor.set(0.5)
    antVision.anchor.set(1,0)
    antVision.rotation = Math.PI*3/4
    antVision.alpha = 0.5
    antVision.scale.set(6)


    antContainer.addChild(ant)
    antContainer.addChild(antVision)
    antContainer.x = x
    antContainer.y = y

    antContainer.scale.set(0.1)
    antContainer.direction = Math.random() * Math.PI * 2
    antContainer.swerve = (Math.random()-0.5)*SWERVE
    antContainer.speed = 2 + Math.random() * 2

    return antContainer

}
