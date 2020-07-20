
let textarea = document.querySelector("#code_box")
let textarea1 = document.querySelector("#code_box1")
let textarea2 = document.querySelector("#code_box2")
let textarea3 = document.querySelector("#code_box3")
let textarea4 = document.querySelector("#code_box4")
textarea.value = 
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Learn Aan.js</title>
    <script src="js/aan.min.js"></script>
</head>
<body>
    <canvas id="chart" width="500" height="300"></canvas>
    <script>
        // Our Javascript will go here.
    </script>
</body>
</html>
`
textarea1.value = 
`
let canvas = document.querySelector('#chart')
let aan = new Aan(canvas)
aan.draw({
    Yaxis:
    [
        {
            data:[123,432,454,342,232],
            color:"#25614A",
            name:"a"
        },
        {
            data:[223,232,354,542,232],
            color:"#4CA138",
            name:"b"
        }
    ],
    type:"line"
})
`

let canvas1 = document.querySelector("#example1")
let aan1 = new Aan(canvas1)
aan1.draw({
    Yaxis:
    [
        {
            data:[123,432,454,342,232],
            color:"#25614A",
            name:"a"
        },
        {
            data:[223,232,354,542,232],
            color:"#4CA138",
            name:"b"
        }
    ],
    type:"line"
})






textarea2.value = 
`
let canvas = document.querySelector('#chart')
let aan = new Aan(canvas)
aan.draw({
    Yaxis:
    [
        {
            data:[123,-432,454,-342,232],
            color:"#25614A",
            name:"a"
        },
        {
            data:[223,232,-354,542,-232],
            color:"#4CA138",
            name:"b"
        }
    ],
    setting:{
        disableAnim:true
    },
    type:"bar"
})
`

let canvas2 = document.querySelector("#example2")
let aan2 = new Aan(canvas2)
aan2.draw({
    Yaxis:
    [
        {
            data:[123,-432,454,-342,232],
            color:"#25614A",
            name:"a"
        },
        {
            data:[223,232,-354,542,-232],
            color:"#4CA138",
            name:"b"
        }
    ],
    setting:{
        disableAnim:true
    },
    type:"bar"
})




textarea3.value =
`
let canvas = document.querySelector('#chart')
let aan = new Aan(canvas)
aan.draw({
    title:{
        name:"Example Title",
        color:"#111111",
        font_size:"15px",
    },
    Yaxis:
    [
        {
            data:[123,432,454,342,232],
            color:"#25614A",
            name:"a"
        },
        {
            data:[223,232,354,542,232],
            color:"#4CA138",
            name:"b"
        }
    ],
    type:"line"
})
`

let canvas3 = document.querySelector('#example3')
let aan3 = new Aan(canvas3)
aan3.draw({
    title:{
        name:"Example Title",
        color:"#111111",
        font_size:"15px",
    },
    Yaxis:
    [
        {
            data:[123,432,454,342,232],
            color:"#25614A",
            name:"a"
        },
        {
            data:[223,232,354,542,232],
            color:"#4CA138",
            name:"b"
        }
    ],
    type:"line"
})


textarea4.value =
`
let canvas = document.querySelector('#chart')
let aan = new Aan(canvas)
aan.draw({
    Yaxis:
    [
        {
            data:[123,432,454,342,232],
            color:"#25614A",
            name:"a"
        }
    ],
    setting:{
        amountDataDisplayed:10
    },
    type:"line"
})

setInterval(()=>{
    aana.update(data => {
        data.Yaxis[0].data.push(Math.floor(Math.random() * 1000))
    })
},1000)
    
`

let canvas4 = document.querySelector('#example4')
let aan4 = new Aan(canvas4)
aan4.draw({
    Yaxis:
    [
        {
            data:[123,432,454,342,232],
            color:"#25614A",
            name:"a"
        }
    ],
    setting:{
        amountDataDisplayed:10,
    },
    type:"line"
})

setInterval(()=>{
aan4.update(data => {
    data.Yaxis[0].data.push(Math.floor(Math.random() * 1000))
})
},1000)
