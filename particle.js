function Particle(x, y, r){
	let options = {
		restitution: 0.5,
		friction: 0,
		density: 1
	}
	x += random(-1, 1)
	this.hue = random(0, 360)
	this.r = r
	this.body = Bodies.circle(x, y, r, options);
	Composite.add(world, this.body)
}

Particle.prototype.show = function(){
	fill(this.hue, 255, 255);
	noStroke();
	let pos = this.body.position
	push()
	translate(pos.x, pos.y)
	ellipse(0, 0, this.r * 2)

	pop()
}

Particle.prototype.offScreen = function(){
	let x = this.body.position.x
	let y = this.body.position.y
	return x < -50 || x > width + 50 || y > height + 50
}