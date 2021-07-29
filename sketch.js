var Engine = Matter.Engine,
	Runner = Matter.Runner,
	Bodies = Matter.Bodies,
	Composite = Matter.Composite;

let engine;
let world;
let particles = []
let plinkos = []
let boundaries = []
let cols = 11;
let rows = 11;
const NEWPARTICLESTEP = 20
const PARTICLERADIUS = 7
const PLINKORADIUS = 16

function setup() {
	var cnv = createCanvas(600, windowHeight);
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
	colorMode(HSB)
	engine = Engine.create()
	world = engine.world
	world.gravity.y = 2

	let spacing = width / cols
	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols + 1; i++) {
			let x = spacing * i
			if (j % 2 == 0) {
				x += spacing / 2
			}
			let y = spacing * j + spacing
			let p = new Plinko(x, y, PLINKORADIUS)
			plinkos.push(p)
		}
	}

	let b = new Boundary(width / 2, height + 50, width, 100)
	boundaries.push(b)

	for (let i = 0; i < cols + 1; i++) {
		let x = i * spacing
		let h = 100
		let w = 10
		let y = height - h / 2

		boundaries.push(new Boundary(x, y, w, h))
	}
}

function draw() {
	background(0, 0, 0)

	if (frameCount % NEWPARTICLESTEP == 1) {
		let p = new Particle(width / 2, 0, PARTICLERADIUS)
		particles.push(p)
	}

	for (let i = 0; i < particles.length; i++) {
		particles[i].show()
		if(particles[i].offScreen()){
			Composite.remove(world, particles[i].body)
			particles.splice(i, 1)
			i--;
		}
	}

	for (let i = 0; i < plinkos.length; i++) {
		plinkos[i].show()
	}

	for (let i = 0; i < boundaries.length; i++) {
		boundaries[i].show()
	}

	Engine.update(engine)
}
