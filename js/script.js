
let textarea1 = document.querySelector("#code_box1")
let textarea2 = document.querySelector("#code_box2")
textarea1.value = 
`<canvas id="data_visualization" width="1000" height="500"></canvas>
<script>
    let canvas = document.querySelector('#data_visualization')
    let aan = new Aan(canvas)
    aan.draw({
        Xaxis:{
            data:[1,2,3,4,5]
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
        type:"chart"
    })
</script>`
textarea2.value = 
`<canvas id="data_visualization" width="1000" height="500"></canvas>
<script>
    let canvas = document.querySelector('#data_visualization')
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
        type:"bar"
    })
</script>`

let canvas1 = document.querySelector("#example1")
let aan2 = new Aan(canvas1)
aan2.draw({
    Xaxis:{
        data:[1,2,3,4,5]
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
    type:"chart"
})

let canvas2 = document.querySelector("#example2")
let aan1 = new Aan(canvas2)
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
    type:"bar"
})