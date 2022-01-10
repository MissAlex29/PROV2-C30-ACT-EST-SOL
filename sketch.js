const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var fruit_con;
var bg_image;
var food;
var rabbit;
var button;

function preload(){
bg_image = loadImage("background.png");
food = loadImage("melon.png");
rabbit = loadImage("Rabbit-01.png");
}

function setup() {
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
  //Botón 1 en setup 
  //CreateImg - crea una imagen pero con funciones de botón
  button = createImg('cut_btn.png');
  //Especificamos posición
  button.position(220,30);
  //Especificamos tamaño
  button.size(50,50);
  //Llamamos a la función drop al tocar el botón
  button.mouseClicked(drop);
  
  //Crear objeto del conejito
  bunny = createSprite(200,620,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;
  
  //Guardar molde del suelo en variable 
  ground = new Ground(200,690,600,20);
  
  //Guardar molde de cuerda en variable 
  rope = new Rope(6,{x:245,y:30});
  
  //Crear opciones del motor físico para la fruta 
  var fruit_options = {
    density:0.001
  };
  //Creamos cuerpo circular para la fruta 
  fruit = Bodies.circle(300,300,15,fruit_options);
  //Ahora vamos a agregar la fruta al compuesto de nuestra cuerda
  //En nuestro juego la fruta esta creada por multiples rectangulos 
  //por eso se llama compuesto 
  Matter.Composite.add(rope.body,fruit);

  //Guardar molde de restricción en variable 
  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  
  
}

function draw() {
  background(51);
  image(bg_image,0,0,width,height);
  //Cambiar el punto de origen de la imagen
  imageMode(CENTER);
  //Mostar suelo
  ground.display();
  //Mostrar la cuerda
  rope.display();
  //Asignar imagen de la fruta
  image(food,fruit.position.x,fruit.position.y,60,60);
  
  Engine.update(engine);
  drawSprites();
}

function drop(){
  rope.break(); //Rompemos la cuerda 
  fruit_con.detach();//Eliminamos la restricción
  fruit_con = null; //Hacemos nula la fruta 
}


