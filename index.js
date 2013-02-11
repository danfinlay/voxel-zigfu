var zigKeys ={
	Head: 1,
	Invalid: 0,
	LeftAnkle: 19,
	LeftCollar: 5,
	LeftElbow: 7,
	LeftFingertip: 10,
	LeftFoot: 20,
	LeftHand: 9,
	LeftHip: 17,
	LeftKnee: 18,
	LeftShoulder: 6,
	LeftWrist: 8,
	Neck: 2,
	RightAnkle: 23,
	RightCollar: 11,
	RightElbow: 13,
	RightFingertip: 16,
	RightFoot: 24,
	RightHand: 15,
	RightHip: 21,
	RightKnee: 22,
	RightShoulder: 12,
	RightWrist: 14,
	Torso: 3,
	Waist: 4,
}

exports.puppeteer = function(skin){

	var logged = false

	var engager = zig.EngageUsersWithSkeleton(1);

	engager.addEventListener('userengaged', function(user) {
		console.log('User engaged: ' + user.id);
	 	
		user.addEventListener('userupdate', function(user) {
			if(!logged){
				console.log(user)
				console.log(zig.Joint)
				logged = true
			}
			if(user.skeletonTracked){
				rightArm(skin, user.skeleton)
				//skin.rightArm.rotation.y = user.skeleton[zig.Joint.Head].position.y % (Math.PI * 2)
				//console.log("Right hand z is "+user.skeleton[zig.Joint.RightHand].position[2]);
			}

		});
	});
	engager.addEventListener('userdisengaged', function(user) {
		console.log('User disengaged: ' + user.id);
	});
	zig.addListener(engager);
}

function rightArm(skin, skeleton){
	var rightShoulder = {
		x: skeleton[zig.Joint.RightShoulder].position[0],
		y: skeleton[zig.Joint.RightShoulder].position[1],
		z: skeleton[zig.Joint.RightShoulder].position[2]
	}
	var rightHand = {
		x: skeleton[zig.Joint.RightHand].position[0],
		y: skeleton[zig.Joint.RightHand].position[1],
		z: skeleton[zig.Joint.RightHand].position[2]
	}
	skin.rightArm.rotation.z = zToRadians(rightShoulder,rightHand)-2
	skin.rightArm.rotation.x = xToRadians(rightShoulder,rightHand)-1.5
}

function zToRadians(base, tip){
	return toRadians(base.z,base.y,tip.z,tip.y)
}
function xToRadians(base,tip){
	return toRadians(base.x,base.y,tip.x,tip.y)
}

function toRadians(x1,y1,x2,y2){
	var relativeX = x2-x1
	var relativeY = y2-y1
	return Math.atan2(-relativeY, relativeX)
}