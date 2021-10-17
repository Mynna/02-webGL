let gl;
let program;
let positions,
	colors;
let posVBO,
	colorVBO;
let vertexVBO;	



function main() {

	// 1. Get canvas and setup WebGL context
    const canvas = document.getElementById("gl-canvas");
	gl = canvas.getContext('webgl2');

	// 2. Configure viewport
	gl.viewport(0,0,canvas.width,canvas.height);
	gl.clearColor(1.0,1.0,1.0,1.0);

	// 4. Init shader program via additional function and bind it
	program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	initTriangle();
	renderTriangle();
};

function initTriangle() {

	// 3. Specify geometry

	vertices= new Float32Array(
		[
			-0.5, -0.5,
			0, 1, 0, 1, 
			-0.5,  0.5,
			0, 0, 1, 1, 
			0.5,  0.5,
			1, 0, 0, 1,
			0.5,  0.5,
			1, 0, 0, 1,
			0.5, -0.5,
			1, 1, 0, 1,
			-0.5, -0.5,
			0, 1, 0, 1
		
		]);


	initTriangleBuffers();
}

function initTriangleBuffers() {

	vertexVBO= gl.createBuffer();
	if(!vertexVBO){
		console.log('failed to create buffer.')
	}

	b=gl.bindBuffer(gl.ARRAY_BUFFER,vertexVBO);
	b;
	if(!b){
		console.log('Failed to bind.')
	}
	gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

	const posLoc = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(posLoc);
	gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 24, 0);

	const colorLoc = gl.getAttribLocation(program, "vColor");
	gl.enableVertexAttribArray(colorLoc);
	gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 24, 8);


}

function renderTriangle() {


	

	// 8. Render
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 6);
}

main();
