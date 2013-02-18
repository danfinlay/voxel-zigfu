function stringify(string){
	return JSON.stringify(string, null, '\t')
}

var vectorFromPoints = function(pointA, pointB){
	return{
		x:pointA[2]-pointB[2],
		y:pointB[1]-pointA[1],
		z:pointA[0]-pointB[0]
	}
}
exports.vectorFromPoints = vectorFromPoints

var vector3FromPoints = function(a,b){
	return new THREE.Vector3(
			-(a[2]-b[2]),
			(b[1]-a[1]),
			(a[0]-b[0])
		)
}
exports.vector3FromPoints = vector3FromPoints

var crossProductForVectors = function(a, b){
	return{
		x:a[1]*b[2] - a[2]*b[1],
		y:a[2]*b[0] - a[0]*b[2],
		z:a[0]*b[1] - a[1]*b[0]
	}
}
exports.crossProductForVectors = crossProductForVectors

var normalizedVectorFromPoints = function(pointA, pointB){
	var result = this.normalizeVector(this.vectorFromPoints(pointA, pointB))
	return new THREE.Vector3(
		result.x,
		result.y,
		result.z
	)
}

exports.averagePoints = function(a,b){
	return [
		(a[0]+b[0])/2,
		(a[1]+b[1])/2,
		(a[2]+b[2])/2
		]
}
exports.normalizedVectorFromPoints = normalizedVectorFromPoints

var getDot = function(w, v){
	return (w.x * v.x) + (w.y * v.y) + (w.z * v.z);
}

var angleBetweenVectors = function(a,b){

	var dot = getDot(a,b);
	//console.log("Dot is "+dot)
	var lengthA = a.length();
	var lengthB = b.length();
	//console.log("Getting theta from a: "+lengthA+" b: "+lengthB+" and dot: "+dot)
	var theta = Math.acos( dot / (lengthA * lengthB) ); // Theta = 3.06 radians or 175.87 degrees
	return theta
}
exports.angleBetweenVectors = angleBetweenVectors

var vectorMagnitude = function(angleVector){
	return Math.sqrt((angleVector.x*angleVector.x)+(angleVector.y*angleVector.y)+(angleVector.z*angleVector.z))
}
exports.vectorMagnitude = vectorMagnitude

var normalizeVector = function(angleVector){
	var mag = vectorMagnitude(angleVector)
	return {
		x: angleVector.x/mag,
		y: angleVector.y/mag,
		z: angleVector.z/mag
	}
}
exports.normalizeVector = normalizeVector

var normalize3 = function(angleVector){
	var mag = vectorMagnitude(angleVector)
	return new THREE.Vector3(
		angleVector.x/mag,
		angleVector.y/mag,
		angleVector.z/mag
	)
}
exports.normalize3 = normalize3

var quaternionFromVectorAndRadians = function(vector, radians){
	var real = Math.cos(radians/2)
	var fake = Math.sin(radians/2)
	return[real, fake*vector.x, fake*vector.y, fake*vector.z]
}
exports.quaternionFromVectorAndRadians = quaternionFromVectorAndRadians

var horizontalJointFor = function(vector){
	var result = normalizeVector({
		x: vector.z,
		y: 0,//vector.y,
		z: vector.x
	})

	console.log("Normalized horizontal: "+stringify(result))
	return result
}
exports.horizontalJointFor = horizontalJointFor

var horizontalHypotenuse = function(uv){
	//console.log("horizontal hypotenuse called for: "+stringify(uv)+ " returning "+Math.sqrt(uv.x * uv.x + uv.z * uv.z))
	return Math.sqrt(uv.x * uv.x + uv.z * uv.z)
}
exports.horizontalHypotenuse = horizontalHypotenuse


var bendForVector = function(vector){
	console.log("Bend for vector called for: "+stringify(vector))
	// returning "+Math.sqrt(uv.x * uv.x + uv.z * uv.z)
	var uv = this.normalizeVector(vector)
	var base = Math.sqrt(vector.x * vector.x + vector.z + vector.z)
	var height = Math.sqrt(1-base*base)
	
	var interiorAngle = Math.asin(Math.sin(90))*height+90
	console.log("Interior angle is "+interiorAngle)
	//var interiorAngle = (1/Math.sin(90)*Math.sin(height))+90
	return interiorAngle
}
exports.bendForVector = bendForVector

var axisAngleForPoints = function(pointA, pointB){
	var vector = this.normalizeVector(this.vectorFromPoints(pointA, pointB))
	var joint = this.horizontalJointFor(vector)
	// angle
	// if(pointA[1]>pointB[1]){
	// 	angle = this.bendForVector(vector)
	// }else{
	var	angle = this.bendForVector(vector)//+1.57079633
	//}
	console.log("Bend: "+angle+" from vector "+stringify(joint))
	return [{
		x: joint.x,
		y: joint.y,
		z: joint.z,
	},angle]
}
exports.axisAngleForPoints = axisAngleForPoints