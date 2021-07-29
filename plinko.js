function Plinko(x, y, r){
	let options = {
		isStatic: true,
		restitution: 1,
		friction: 0
	}
	this.r = r
	this.body = Bodies.circle(x, y, r, options);
	Composite.add(world, this.body)
}

Plinko.prototype.show = function(){
	fill(0, 0, 40);
	noStroke();
	let pos = this.body.position
	push()
	translate(pos.x, pos.y)
	ellipse(0, 0, this.r * 2)

	pop()
}