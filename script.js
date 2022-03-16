$(".title").click(function () {
    window.location = "page1.html";
});



//location choice
$(".apart").click(function () {
    window.location = "apartment.html";
});
$(".hosp").click(function () {
    window.location = "hospital.html";
});

//global vars
let foodFound = false;


//function to generate zombies in a room. Input the desired prob(prob) and number of max zombies(amount)
function genZom(prob, amount) {
    //declare two var. One for the prob, the other for output
    rNum = Math.random();
    let zNum;
    /* this checks if the random num falls within our desired prob, then it generates a zombie.
    if random num falls out of the prob(false), then no zombie generated(zNum=0)
    if true, we set zNum to a random integer between 0 and the desired max zombies(amount)
    the if inside the if is to ensure zNum gives a zombie bc the random number can be rounded down to 0 */
    if (rNum <= prob) {
        zNum = Math.round(Math.random() * amount);
        if (zNum == 0) {
            zNum = 1;
        }
    } else {
        zNum = 0;
    }
    return (zNum);
}
/* extra parameter that check if room is aready beaten using boolean, start on false. 
chnage to tru when room left
check if which room in, maybe use list or genZom.check = 0;*/
//check genZom
/*console.log(Math.random());
console.log(Math.round(Math.random() * 3));
console.log(genZom(.9, 3));
console.log(genZom(.1, 4));*/


//takes the input and generates each type of zom with those values, per room
//bP = biter prob   bA = biter amount   viP = viral prob    ect.
//returns the "room" object
function roomProb(bP, bA, viP, viA, sP, sA, volP, volA) {
    let room = {
        biter: genZom(bP, bA),
        viral: genZom(viP, viA),
        suiciders: genZom(sP, sA),
        volatile: genZom(volP, volA),
    }
    return (room);
}
//test if roomProb works
//console.log( "roomProb func" );
//console.log( roomProb() );
//console.log( roomProb().biter );
//console.log( roomProb().volatile );
//console.log( roomProb().viral );


//generate 1 room (1 whole apeartment room not a single room like bathroom)
function Aroom() {
    let apart = {
        //roomProb    (bP, bA, viP, viA, sP, sA, volP, volA)
        kitchen: roomProb(.8, 2, .05, 1, 0, 0, 0, 0),
        bedR: roomProb(.8, 2, 0, 0, 0, 0, 0, 0),
        livingR: roomProb(.9, 4, 0, 0, .1, 1, 0, 0),
        bathR: roomProb(.01, 1, .7, 2, 0, 0, .01, 1),
    }
    return (apart);
}
//console.log( Aroom() );
//console.log( Aroom().kitchen );
/*console.log( "Aroom.kitchen" );
console.log( Aroom().kitchen.biter );
console.log( Aroom().kitchen.viral );
console.log( "Aroom.bedR" );
console.log( Aroom().bedR.biter );
console.log( "Aroom.livingRoom" );
console.log( Aroom().livingR.biter );
console.log( Aroom().livingR.suiciders );*/


//generate 1 floor of the building
function genFloor() {
    let floor = {
        room1: Aroom(),
        room2: Aroom(),
        room3: Aroom(),
        room4: Aroom(),
        stairs: roomProb(0, 0, .1, 2, 0.05, 1, 0, 0),
        hallway: roomProb(.6, 5, 0.0, 0, 0, 0, 0, 0),
    }
    return (floor);
}
//check genFloor
/*console.log( "genFloor" );
console.log( genFloor().room1.kitchen.biter );
console.log( genFloor().room1.kitchen.viral );
console.log( genFloor().room2.kitchen.biter );
console.log( genFloor().room2.kitchen.viral );
console.log( genFloor().stairs.viral );
console.log( genFloor().hallway.biter );*/

let build1 = {
    floor1: genFloor(),
    floor2: genFloor(),
    floor3: genFloor(),
}

/*console.log( "build" );
console.log( build1.floor1.room1.kitchen.biter );
console.log( build1.floor1.room1.kitchen.viral );
console.log( build1.floor1.room2.kitchen.biter );
console.log( build1.floor1.room2.kitchen.viral );
console.log( build1.floor1.stairs.viral );
console.log( build1.floor1.hallway.biter );
console.log( "floor2" );
console.log( build1.floor2.room1.kitchen.biter );
console.log( build1.floor2.room1.kitchen.viral );
console.log( build1.floor2.room2.kitchen.biter );
console.log( build1.floor2.room2.kitchen.viral );
console.log( build1.floor2.stairs.viral );
console.log( build1.floor2.hallway.biter );*/


// select scene
//$(".enter").hide();
$(".fl1rm1").hide();
$(".livingR").hide();
$(".kitchen").hide();
$(".bedroom").hide();
$(".bathroom").hide();

$(".inspect").hide();



//click section

//when you enter the build
$(".room1").click(function () {
    $(".enter").hide();
    $(".fl1rm1").show();
    livingroom();
});
//go kitchen
$(".kitBut").click(function () {
    $(".livingR").hide();
    $(".kitchen").show();
});
//go to living room
$(".bedBut").click(function () {
    $(".livingR").hide();
    $(".bathroom").hide();
    $(".bedroom").show();
});
//go to bathroom
$(".bathBut").click(function () {
    $(".livingR").hide();
    $(".bedroom").hide();
    $(".bathroom").show();
});
//go back to living room
$(".liveBut").click(function () {
    $(".kitchen").hide();
    $(".bedroom").hide();
    $(".bathroom").hide();
    $(".livingR").show();
});


//test click
// $(".test").click(function () {
//     livingroom();
// });

$(".table").click(function () {
    $(".livingR").hide();
    $(".inspect").show();
    $(".inspect").append(`<div class="addHere"></div>`);
    //$(".addHere").append(`<img src="https://i.ytimg.com/vi/kgiuYid4ax8/maxresdefault.jpg">`);
    $(".addHere").append(`<p> ${"It's a table. Nothing much going for it. Although, it does give you some ideas on dismantling it to use its table legs as weapons. Maybe you can eat your food there if you find any."} </p>`);
});
$(".cabnet").click(function () {
    $(".livingR").hide();
    $(".inspect").show();
    $(".inspect").append(`<div class="addHere"></div>`);
    //$(".addHere").append(`<img src="https://i.ytimg.com/vi/kgiuYid4ax8/maxresdefault.jpg">`);
    $(".addHere").append(`<p> ${"Upon opening the cabinet, a few things stick out to you. There are shelves with faded photos of a family. In the corner, there is a small box containing small trinkets and souvenirs with some silverware that can be found in one of the bottom drawers. All of these now have little to no value. You forgot when was the last time you saw your family. They are probably all dead now. No luck here, look somewhere else."} </p>`);
});
$(".TV").click(function () {
    $(".livingR").hide();
    $(".inspect").show();
    $(".inspect").append(`<div class="addHere"></div>`);
    //$(".addHere").append(`<img src="https://i.ytimg.com/vi/kgiuYid4ax8/maxresdefault.jpg">`);
    $(".addHere").append(`<p> ${"You walk over to the television and reflect on the dirty surroundings. The city has not had electricity for a few years now, so the TV has remained idle since then. Taking a step back, a raw glint from the television's screen can be seen. The old days are hard to remember, let alone for someone who grew up in the apocalypse. It seems like there is nothing useful here other than reminders of a time long gone. Look elsewhere."} </p>`);
});

//continue the story
$(".cont").click(function () {
    $(".addHere").remove();
    $(".inspect").hide();
    $(".livingR").show();
});
$(".leave").click(function () {
    window.location = "end.html";
});

//when fight click
// if (random prob >= the prob to live) 
$(".fightBut").click(function () {
    if ((100 * Math.random()) >= fLiveProb(build1.floor1.room1.livingR.biter, 0, build1.floor1.room1.livingR.suiciders, 0)) {
        window.location = "death.html";
    } else {
        $(".fl1rm1").hide();
        $(".livingR").show();
    }
});
//when run click
$(".run").click(function () {
    if ((100 * Math.random()) <= escLiveProb(build1.floor1.room1.livingR.biter, 0, build1.floor1.room1.livingR.suiciders, 0)) {
        $(".fl1rm1").hide();
        $(".livingR").show();
    } else {
        window.location = "death.html";
    }
});



//each room
function livingroom() {
    $(".liveR").append(`<p> ${"As soon as the door is open, " + (build1.floor1.room1.kitchen.biter) + " Biters and " + (build1.floor1.room1.kitchen.suiciders) + " Suiciders come after you. Will you fight them or run? (If nothing is there, any choice is fine)"} </p>`);
}







//func to determine if player lives if they choose to fight
function fLiveProb(bNum, viNum, sNum, volNum) {
    //overall chnace is 100%
    let liveChance = 100;

    while (bNum > 1) {
        //maybe change liveChance*.03 to just 3 (depends on which is more forgiving)
        liveChance = liveChance - (liveChance * .03);
        --bNum;
    }
    while (viNum > 0) {
        liveChance = liveChance - (liveChance * .15);
        --viNum;
    }
    while (sNum > 0) {
        liveChance = liveChance - (liveChance * .9);
        --sNum;
    }
    while (volNum > 0) {
        liveChance = liveChance - (liveChance * .95);
        --volNum;
    }
    return (liveChance)
}
//check liveProb
/*console.log("liveProb");
console.log( liveProb(1, 0, 0, 0) );
console.log( liveProb(0, 1, 0, 0) );
console.log( liveProb(0, 0, 1, 0) );
console.log( liveProb(0, 0, 0, 1) );
console.log("liveProb num > 1");
console.log( liveProb(2, 0, 0, 0) );
console.log( liveProb(0, 2, 0, 0) );
console.log( liveProb(0, 0, 2, 0) );
console.log( liveProb(0, 0, 0, 2) );
console.log("liveProb any");
console.log( liveProb(2, 2, 0, 0) );
console.log( liveProb(0, 2, 2, 0) );
console.log( liveProb(0, 0, 2, 2) );*/
//console.log( liveProb(4, 0, 0, 0) );

//func to detrmine if player lives if they choose to run
function escLiveProb(bNum, viNum, sNum, volNum) {
    let escChance = 100;
    while (bNum > 0) {
        escChance = escChance - 0
        --bNum;
    }
    while (viNum > 0) {
        escChance = escChance - (escChance * .25)
        --viNum;
    }
    while (sNum > 0) {
        escChance = escChance - (escChance * .10)
        --sNum;
    }
    while (volNum > 0) {
        escChance = escChance - (escChance * .50)
        --volNum;
    }
    return (escChance);
}
/* // console.log("escLiveProb");
// console.log(escLiveProb(1, 0, 0, 0));
// console.log(escLiveProb(0, 1, 0, 0));
// console.log(escLiveProb(0, 0, 1, 0));
// console.log(escLiveProb(0, 0, 0, 1));
// console.log(escLiveProb(2, 0, 0, 0)); */

//make forgiveness system
//too much work, so little time
// let health = 100;
// function cHealth() {
//     health = health - ();
// }


