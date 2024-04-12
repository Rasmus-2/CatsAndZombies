const url = "https://api.api-ninjas.com/v1/dadjokes?limit=1"
const key = "xZG2k6LgkxSVwpbF/E+4Ug==QgOZY1insFiiVzkR"

let map = []

let landscapeImages = [
    ["landscapes/alps.png", "It's very cold and windy, and you have some trouble breathing at this altitude."],
    ["landscapes/bamboo_bridge.webp", "As you walk across the bridge it bounces ever so slightly with every step you take."],
    ["landscapes/city_street.jpg", "It's getting late, and the sun is increasingly being replaces by the city lights."],
    ["landscapes/cliffs.webp", "You try to rein in your fear of heights as you carefully look out from the steep cliffs."],
    ["landscapes/desert.webp", "It's warm and dry and you wish you brought another water bottle. Or ten more bottles"],
    ["landscapes/eiffel_tower.webp", "The top of the Eiffel tower might be a good spot to look for any cats to save."],
    ["landscapes/flower_park.webp", "It smells lovely as you stroll through the park and the look at the flower beds."],
    ["landscapes/glacier.webp", "The ice creaks underneath your feet and you walk very carefully and very slowly."],
    ["landscapes/lavender_fields.webp", "A strong scent of lavendel permeates every inch of these never ending fields."],
    ["landscapes/london_eye.jpg", "Perhaps you can scan the city for dangerous zombies from the top of the London eye."],
    ["landscapes/old_street.webp", "The cobblestone under your feet makes you wish you bought shoes with better soles."],
    ["landscapes/pedestrian_street.jpg", "It is a sunny and pleasant day as you stroll through the avenues of the inner city."],
    ["landscapes/rainforest.webp", "There's a lot to take in as you tread through the dense vegetation of the rain forest."],
    ["landscapes/river_in_front_of_mountain.webp", "You allow yourself to breath for a second and take in the view as the sun sets."],
    ["landscapes/rohan_plains.jpg", "Endless plains surrounded by mountains, at least you'll spot zombies easily, you hope."],
    ["landscapes/salt_desert.webp", "Barren trees and salty ground, sand dunes in the distance. It's a clear and warm day."],
    ["landscapes/santorini_city.webp", "Between the beautiful buildings you search every alley, looking for any signs of cats."],
    ["landscapes/statue_of_liberty.jpg", "That looks rather comfortable. You would also like to rest, maybe just for a moment?"],
    ["landscapes/step_falls.webp", "Can you afford a ballon ride, that would offer a great view to spot cats and zombies."],
    ["landscapes/stone_beach.jpg", "You feel a mild breeze over your face as you hear the waves roll in across the beach."],
    ["landscapes/street_corner.jpeg", "After a quick cup of coffee you exit the café and look around the street. Where to next?"],
    ["landscapes/taj_mahal.jpg", "Was the meowing you heard from inside the Taj Mahal? Well, you better take a look."],
    ["landscapes/tree_garden.jpg", "As you stroll down the small road you hear rustling through the leaves. Cats or zombies?"],
    ["landscapes/valley.jpg", "Downhill! You can't see where the road takes you, but it's downhill so you trudge on down."],
    ["landscapes/waterfall.jpg", "It's been a long night, but now you can turn your flashlight off and wander in the sunrise."]
]

mixLandscapes()

let zombieImages = [
    "zombies/minecraft_zombie1.png",
    "zombies/minecraft_zombie2.png",
    "zombies/minecraft_zombie3.png",
    "zombies/minecraft_zombie4.png",
    "zombies/minecraft_zombie5.png",
    "zombies/plant_zombie.webp"
]

let catImages = [
    "cats/cat1.webp",
    "cats/cat2.webp",
    "cats/cat3.webp",
    "cats/cat4.webp",
    "cats/cat5.webp",
    "cats/cat6.webp",
    "cats/cat7.webp",
    "cats/cat8.webp",
    "cats/cat9.webp"
]

let landscapeCounter = 0
let zombieCounter = Math.floor(Math.random() * zombieImages.length)
let catCounter = Math.floor(Math.random() * catImages.length)

const rows = 5
const cols = 5

let zombieWalk = false
let displayZombie = false
let displayCat = false
let mapEvent = false
let lives = 3
let catsSaved = 0

let playerX = 0
let playerY = 0

let zombieX = Math.floor(Math.random() * (cols - 1)) + 1
let zombieY = Math.floor(Math.random() * (rows - 1)) + 1

let catX = Math.floor(Math.random() * (cols - 1)) + 1
let catY = Math.floor(Math.random() * (rows - 1)) + 1

//document.getElementById("playerX").innerHTML = playerX
//document.getElementById("playerY").innerHTML = playerY

//document.getElementById("zombieX").innerHTML = zombieX
//document.getElementById("zombieY").innerHTML = zombieY

//document.getElementById("catX").innerHTML = catX
//document.getElementById("catY").innerHTML = catY

//document.getElementById("lives").innerHTML = lives
document.getElementById("catssaved").innerHTML = catsSaved

let zombieImage = document.createElement("img")
zombieImage.src = "images/" + zombieImages[zombieCounter]
zombieImage.id = "currentzombieimage"
document.getElementById("graphics").appendChild(zombieImage)
zombieImage.style.display = "none"

let catImage = document.createElement("img")
catImage.src = "images/" + catImages[catCounter]
catImage.id = "currentcatimage"
document.getElementById("graphics").appendChild(catImage)
catImage.style.display = "block"

buildMap(rows, cols)

drawLives()

getJoke()


function getJoke() {
    fetch(url, {
        headers: { 'X-Api-Key': key }
    })
        .then(function (response) { return response.json() })
        .then(function (data) {
            data.map(function (d) {
                let p = document.createElement("p")
                p.setAttribute("id", "quoteparagraph")
                p.innerHTML = d.joke
                document.getElementById("quotesdiv").innerHTML = ""
                document.getElementById("quotesdiv").appendChild(p)
            })

        })
        .catch(function (error) {
            console.log("Something went wrong: " + error)
        })
}

function catNoises() {
    let noise = []
    if (playerX < catX) {
        noise.appendChild("east")
    }
    if (playerX > catX) {
        noise.appendChild("west")
    }
    if (playerY < catY) {
        noise.appendChild("south")
    }
    if (playerY > catY) {
        noise.appendChild("north")
    }

    if (noise.length == 1) {

    }
    else if (noise.length == 2) {

    }
    else {

    }
}

function mixLandscapes() {
    let currentIndex = landscapeImages.length
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [landscapeImages[currentIndex], landscapeImages[randomIndex]] =
            [landscapeImages[randomIndex], landscapeImages[currentIndex]];
    }
}

function drawLives() {
    let currentLives = document.getElementById("lives")
    while (currentLives.firstChild) {
        currentLives.removeChild(currentLives.lastChild)
    }

    for (let i = 0; i < lives; i++) {
        let newImage = document.createElement("img")
        newImage.src = "images/heart.webp"
        newImage.id = "heartimage"
        currentLives.appendChild(newImage)
    }
}

function gameOver() {
    let body = document.getElementById("body")
    body.innerHTML = ""

    let gameOverTitle = document.createElement("h1");
    gameOverTitle.innerHTML = "GAME OVER"

    let scoreTag = document.createElement("p")
    scoreTag.innerHTML = "Cats saved: "
    scoreTag.id = "scoretag"
    let finalScore = document.createElement("span")
    finalScore.innerHTML = catsSaved
    scoreTag.appendChild(finalScore)

    let restartButton = document.createElement("a")
    restartButton.innerHTML = "Try again?"
    restartButton.href = "index.html"

    body.appendChild(gameOverTitle)
    body.appendChild(scoreTag)
    body.appendChild(restartButton)
}

function respawnCat() {
    getJoke()
    catX = Math.floor(Math.random() * (cols - 1)) + 1
    catY = Math.floor(Math.random() * (rows - 1)) + 1

    while (catX == playerX && catY == playerY) {
        catX = Math.floor(Math.random() * (cols - 1)) + 1
        catY = Math.floor(Math.random() * (rows - 1)) + 1
    }
    //document.getElementById("catX").innerHTML = catX
    //document.getElementById("catY").innerHTML = catY

    if (catCounter < catImages.length - 1) {
        catCounter++
    }
    else {
        catCounter = 0
    }
    catImage.src = "images/" + catImages[catCounter]
}

function moveZombie() {
    if (zombieWalk) {
        let xDistance = zombieX - playerX
        let yDistance = zombieY - playerY

        if (Math.abs(xDistance) > 0 && Math.abs(xDistance) >= Math.abs(yDistance)) {
            xDistance < 0 ? zombieX++ : zombieX--
            //document.getElementById("zombieX").innerHTML = zombieX
            event = true
        }
        else if (Math.abs(yDistance) > 0) {
            yDistance < 0 ? zombieY++ : zombieY--
            //document.getElementById("zombieY").innerHTML = zombieY
        }
        zombieWalk = false
    }
    else {
        zombieWalk = true
    }
}

function buildMap(rows, cols) {
    document.getElementById("map").innerHTML = ""
    let table = document.createElement("table")

    for (let i = 0; i < rows; i++) {
        let row = document.createElement("tr")
        for (let j = 0; j < cols; j++) {
            let data = document.createElement("td")

            if (playerX == zombieX && playerY == zombieY && playerX == catX && playerY == catY && i == playerY && j == playerX) {
                displayZombie = true
                displayCat = true
                data.style.backgroundColor = "darkmagenta"
                document.getElementById("eventinfo").innerHTML = "You found the cat but a zombie attacks you before you can save it!"
                lives--
                zombieWalk = false
                //document.getElementById("lives").innerHTML = lives
                drawLives()
                if (lives < 1) {
                    gameOver()
                }
                mapEvent = true
            }
            else {
                if (playerX == zombieX && playerY == zombieY && i == playerY && j == playerX) {
                    displayZombie = true
                    data.style.backgroundColor = "red"
                    document.getElementById("eventinfo").innerHTML = "You are attacked by a zombie!"
                    lives--
                    zombieWalk = false
                    //document.getElementById("lives").innerHTML = lives
                    drawLives()
                    if (lives < 1) {
                        gameOver()
                    }
                    mapEvent = true
                }
                else if (playerX == catX && playerY == catY && i == playerY && j == playerX) {
                    displayCat = true
                    data.style.backgroundColor = "Green"
                    document.getElementById("eventinfo").innerHTML = "You found a cat, well done! Now let's try to find more."
                    catsSaved++
                    document.getElementById("catssaved").innerHTML = catsSaved
                    mapEvent = true
                    respawnCat()
                }
                else if (catX == zombieX && catY == zombieY && i == catY && j == catX) {
                    data.style.backgroundColor = "magenta"
                    document.getElementById("eventinfo").innerHTML = "You hear a distress meowing, the zombie must be near the cat!"
                    mapEvent = true
                }
                else {
                    if (i == playerY && j == playerX) {
                        data.style.backgroundColor = "blue"
                    }
                    else if (i == zombieY && j == zombieX) {
                    }
                    else if (i == catY && j == catX) {
                    }
                    else {
                        //data.innerHTML = "O"
                    }
                }
            }
            row.appendChild(data)
        }
        table.appendChild(row)
    }
    document.getElementById("map").appendChild(table)
    if (mapEvent == false) {
        document.getElementById("eventinfo").innerHTML = landscapeImages[getLocationImageIndex()][1]
    }
    mapEvent = false

    document.getElementById("locationimage").src = "images/" + landscapeImages[getLocationImageIndex()][0]

    if (displayZombie) {
        document.getElementById("currentzombieimage").style.display = "block"
        displayZombie = false
    }
    else {
        document.getElementById("currentzombieimage").style.display = "none"
    }

    if (displayCat) {
        document.getElementById("currentcatimage").style.display = "block"
        displayCat = false
    }
    else {
        document.getElementById("currentcatimage").style.display = "none"
    }
}

function getLocationImageIndex() {
    return (playerY * cols) + playerX
}

function goNorth() {
    if (playerY > 0) {
        playerY--
        //document.getElementById("playerY").innerHTML = playerY
        moveZombie()
        buildMap(rows, cols)
    }
}

function goWest() {
    if (playerX > 0) {
        playerX--
        //document.getElementById("playerX").innerHTML = playerX
        moveZombie()
        buildMap(rows, cols)
    }
}

function goEast() {
    if (playerX < cols - 1) {
        playerX++
        //document.getElementById("playerX").innerHTML = playerX
        moveZombie()
        buildMap(rows, cols)
    }
}

function goSouth() {
    if (playerY < rows - 1) {
        playerY++
        //document.getElementById("playerY").innerHTML = playerY
        moveZombie()
        buildMap(rows, cols)
    }
}