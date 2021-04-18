const canvas = document.querySelector("canvas")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext("2d")

let mouse = {
    x: 0,
    y: 0
}
window.addEventListener("mousemove", function(e) {
    mouse.x = e.x
    mouse.y = e.y
})

// bubble cord

let bubbleCord = []
let balls = 300

for ( let i = 0 ; i < balls ; i++ ) {
    bubbleCord.push({
        x:Math.random() * innerWidth,
        y:Math.random() * innerHeight,
        radius:Math.floor(Math.random() * 5),
        dx:(Math.random() - 0.5) * 2,
        dy:(Math.random() - 0.5) * 2
    })
}

// draw bubble

function draw() {
    for ( let i = 0 ; i < bubbleCord.length ; i++ ) {
        let bubble = bubbleCord[i]
        c.beginPath()
        c.arc(bubble.x, bubble.y, bubble.radius,0, Math.PI*2, false)
        c.stroke()
        c.fillStyle = "#fff"
        c.fill()
    }
    // draw the line
    c.beginPath()
    for ( let i = 0 ; i < bubbleCord.length ; i++) {
        let l1 = bubbleCord[i]
        c.moveTo(l1.x, l1.y)
        if ( distance(mouse, l1) < 70 ) {
            c.lineTo(mouse.x, mouse.y)
        }
        for ( let j = 0 ; j < bubbleCord.length ; j++ ) {
            let l2 = bubbleCord[j]
            if ( distance(l1, l2) < 70 ) {
                c.lineTo(l2.x, l2.y)
            }
            
        }
    }
    c.lineWidth = "0.05"
    c.strokeStyle = "#fff"
    c.stroke()
}

function update() {
    for ( let i = 0 ; i < bubbleCord.length ; i++ ) {
        let s = bubbleCord[i]
        if (s.x < 0 || s.x > canvas.width) {
            s.dx = -s.dx
        }
        if ( s.y < 0 || s.y > canvas.height) {
            s.dy = -s.dy
        }
        s.x += s.dx
        s.y += s.dy
        
    };
    draw()
    

    
}


function distance(point1, point2) {
    let dx = 0
    let dy = 0

    dx = point2.x - point1.x
    dx = dx * dx

    dy = point2.y - point1.y
    dy = dy * dy

    return Math.sqrt(dx + dy)
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    update()
}
animate()
