'use strict'
let map = (a,b,c,d,e) =>  d + (((a - b) / (c - b)) * (e - d))
function determine_of_y(min,max){
    let the_number = 0.0000000001
    let run = true
    let choice
    max > Math.abs(min)?choice = max:choice = Math.abs(min)
    while(run){
        Math.floor(choice / the_number) == 0?run = false:the_number *= 10
    }
    if(choice <= the_number * 0.5 && choice > the_number * 0.2){the_number *= 0.5}
    else if(choice <= the_number * 0.2 && choice > the_number * 0.1){the_number *= 0.2}
    else if(choice <= the_number * 0.1){the_number *= 0.1}

    let start
    let Yabs
    if(min < 0){
        start = the_number * -1
        Yabs = Math.abs(the_number - start)
    }else{
        start = 0
        Yabs = Math.abs(the_number)
    }
    console.log(choice,the_number)

    return [start,the_number,Yabs]
}

let cursorX
let cursorY
document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
}

let getMousePos = canvas => {
    let rect = canvas.getBoundingClientRect()
    return {
        x: cursorX - rect.left,
        y: cursorY - rect.top
    }
}


let Aan = function(elem){
    this.ctx = elem.getContext("2d")
    this.elem = elem
    this.action
    this.longest_of_data
    this.data = {}
}

Aan.prototype.update = function(cb){cb(this.data)}

Aan.prototype.draw = function(para){
    if(typeof para != "object"){console.error("parameter must be object")}

    let canvas = this.elem
    let c = this.ctx
    let wh = window.innerHeight
    let ctxh = canvas.height
    let x_line = (canvas.width * 0.9) - (canvas.width * 0.1)
    let x_line_for_axis_point = x_line * 0.95
    let xx = (x_line - x_line_for_axis_point) / 2

    let anim = true
    if(para.setting){
        para.setting.disableAnim?anim = false:anim = true
    }
 
    this.data.Yaxis = para.Yaxis
    if(para.Xaxis){this.data.Xaxis = para.Xaxis}

    let substracData = () => {
        let length_each_data = []
        for(let i of this.data.Yaxis ){length_each_data.push(i.data.length)}

        let amount_longest_data = Math.max(...length_each_data)

        let longest = 0
        this.data.Yaxis.forEach(e => {if(e.data.length > longest){longest = e.data.length}})

        if(para.setting){
            if(para.setting.amountDataDisplayed){
                let dataDisplayed = para.setting.amountDataDisplayed
                if(longest >= para.setting.amountDataDisplayed){
                    for(let i = 0; i < this.data.Yaxis.length;i++){
                        this.data.Yaxis[i].data = this.data.Yaxis[i].data.slice(amount_longest_data - dataDisplayed,amount_longest_data)
                    }
                }
            }
        }
    }

    substracData()

    this.mode = para.type
    let type = this.mode
    
    let d = canvas.height * 0.85 - canvas.height * 0.1
    let y_max
    let y_min
    let ny
    let nny
    let startY
    let Yabs
    let new_data_process = () => {
        let all_y_data = []
        for(let i of this.data.Yaxis){for(let j of i.data){all_y_data.push(j)}}
        y_max = Math.max(...all_y_data)
        y_min = Math.min(...all_y_data)
        nny = determine_of_y(y_min,y_max)[1]
        startY = determine_of_y(y_min,y_max)[0]
        Yabs = determine_of_y(y_min,y_max)[2]
        if(ctxh > wh * 0.8){ny = 10}
        else if(ctxh > wh * 0.4 && ctxh <= wh * 0.8){ny = 5}
        else if(ctxh > wh * 0.2 && ctxh <= wh * 0.4){ny = 4}
        if(y_min < 0){ny -= 1}
    }

    new_data_process()


    let circle = (x,y,color,width) => {
        c.fillStyle = color
        c.beginPath()
        c.arc(x, y, width, 0, Math.PI * 2, true)
        c.fill()
    }

    let rectangle = (x,y,w,h) => {
        c.beginPath()
        c.fillStyle = "rgba(220,220,220,0.5)"
        c.rect(x, y, w, h)
        c.fill()
    }
    
    let draw_white_board = () => {
        let color = "#ffffff"
        if(para.setting){para.setting.backgroundColor?color = para.setting.backgroundColor: null}
        c.fillStyle = color
        c.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    let drawTitle = () => {
        if(para.title){
            c.fillStyle = para.title.color?para.title.color:"#111111"
            c.textAlign = "left"
            let font_size = para.title.font_size || `${canvas.height < canvas.width? canvas.height *0.09:canvas.width * 0.09}px`
            
            let font_family = para.title.font_family || "Arial"
            c.font = `bolder ${font_size} ${font_family}`

            c.fillText(para.title.name, canvas.width * 0.01, canvas.height * 0.07 )
        }
    }

    let draw_label = () => {
        let show = true
        if(para.setting){show = para.setting.showLabel}
        if(this.data.Yaxis.length > 1 && show){
            let width_area_of_label 
            let start
            if(para.title){
                width_area_of_label = canvas.width * 0.5
                start = canvas.width * 0.5
            }else{
                width_area_of_label = canvas.width * 0.9
                start = canvas.width * 0.1
            }
            for(let i = 0; i < this.data.Yaxis.length;i++){
                let x = start + (width_area_of_label * (i / this.data.Yaxis.length))
                let y = canvas.height * 0.05
                circle(x,y,this.data.Yaxis[i].color, 8)
                circle(x,y,"#ffffff", 4)
                c.fillStyle = "#111111"
                c.textAlign = "left"
                c.font =  `15px Arial`
                c.fillText(this.data.Yaxis[i].name, x + 10, y + 5)
            }
        }
    }

    let Xaxis = () => {
        let smallest = [canvas.height * 0.1 - canvas.height * 0.09,canvas.width * 0.1 - canvas.width * 0.09]
        if(!this.data.Xaxis){
            let arr = []
            for(let i of this.data.Yaxis){arr.push(i.data.length)}
            this.longest_of_data = Math.max(...arr)
        }else{
            // x_axis point
            this.longest_of_data = this.data.Xaxis.labels.length
            for(let i = 0; i < this.longest_of_data; i++){
                c.beginPath()
                let x
                if(type == "line"){
                    x = canvas.width * 0.1 + (x_line_for_axis_point * (i / (this.longest_of_data - 1))) + xx
                }else if(type == "bar"){
                    x = canvas.width * 0.1 + (x_line * ((i + 1)/ (this.longest_of_data + 1)))
                }
                c.moveTo(x,map(canvas.height * 0.1,0,canvas.height,canvas.height,0))
                c.lineTo(x,map(canvas.height * 0.1 - Math.min(...smallest),0,canvas.height,canvas.height,0) )
                c.stroke()
                c.fillStyle = 'rgb(0, 0, 0)';
                c.textAlign = "center"
                c.font = "15px Arial"
                c.fillText(`${this.data.Xaxis.labels[i]}`, x, map(canvas.height * 0.05,0,canvas.height,canvas.height,0));
            }
        }
    }
    
    let Yaxis = () => {
        let smallest = [canvas.height * 0.1 - canvas.height * 0.09,canvas.width * 0.1 - canvas.width * 0.09]
        // y_axis_point
        for(let i = 0; i <= ny; i++){
            let a = map(Yabs * (i / ny) + startY,startY,nny,0,d )
            
            let y = map((canvas.height * 0.1 + a) ,0,canvas.height,canvas.height,0)
            
            let value = Yabs * (i / ny) + startY
            
            c.strokeStyle = 'rgb(100, 100, 100)'
            value == 0?c.lineWidth = 1: c.lineWidth = 0.3
            c.beginPath()
            c.moveTo(canvas.width * 0.9 ,y)
            c.lineTo(canvas.width * 0.1 - Math.min(...smallest) ,y)
            c.stroke()
    
            c.fillStyle = 'rgb(0, 0, 0)';
            c.textAlign = "right"
            c.font = `15px Arial`
            c.fillText(value, canvas.width * 0.1 - Math.min(...smallest) - 1, y + 5 )
        }
    }

    let draw_data_visualzation = () => {
        if(type == 'line'){
            let draw_curva = () => {
                for(let Yaxis of this.data.Yaxis){
                    // curva point
                    c.beginPath()
                    c.lineWidth = 2
                    for(let j = 0; j < this.longest_of_data;j++){
                        let x = canvas.width * 0.1 + (x_line_for_axis_point * (j / (this.longest_of_data - 1))) + xx
                        let y = map((canvas.height * 0.1) + map(Yaxis.data[j], startY, nny,0,d),0,canvas.height,canvas.height,0)
                        j == 0?c.moveTo(x,y):c.lineTo(x,y)
                    }
        
                    Yaxis.color?c.strokeStyle = Yaxis.color:null
                    c.stroke()
                }
            }

            draw_curva()

            for(let j = 0; j < this.longest_of_data;j++){
                let x = canvas.width * 0.1 + (x_line_for_axis_point * (j / (this.longest_of_data - 1))) + xx
                let mousePos = getMousePos(canvas)
                let border = (x_line_for_axis_point * (1 / (this.longest_of_data))) / 2
                if(mousePos.x < x + border && mousePos.x > x - border && mousePos.y > canvas.height * 0.1 && mousePos.y < canvas.height * 0.9){
                    for(let k of this.data.Yaxis){
                        if(k.data[j]){
                            let x = canvas.width * 0.1 + (x_line_for_axis_point * (j / (this.longest_of_data - 1))) + xx
                            let y = map(canvas.height * 0.1 + map(k.data[j],startY,nny,0,canvas.height * 0.75), 0,canvas.height,canvas.height,0)
                            circle(x, y,k.color,10)
                            circle(x, y,"#ffffff",5)
                        }
                    }
                    let x_for_rect = canvas.width * 0.1 + (x_line_for_axis_point * (j / (this.longest_of_data - 1))) + xx
                    let y_for_rect = canvas.height * 0.35

                    j >= this.longest_of_data * 0.5?x_for_rect -= canvas.width * 0.25:x_for_rect += canvas.width * 0.05

                    let data_index_j = []
                    this.data.Yaxis.forEach(k => {if(k.data[j]){data_index_j.push(k.data[j])}})

                    let data_length = 0
                    data_index_j.forEach(e=> data_length += e)
                    
                    let average_of_data_index_j = data_length / data_index_j.length
                    if(average_of_data_index_j > Yabs * 0.5){
                        y_for_rect = canvas.height * 0.45
                    }

                    rectangle(x_for_rect,y_for_rect,canvas.width * 0.2,20 * data_index_j.length)

                    let each_of_data = []

                    this.data.Yaxis.forEach(Yaxis => {
                        for(let j = 0; j < Yaxis.data.length;j++){
                            if(each_of_data[j] == undefined){each_of_data[j] = []}
                            each_of_data[j].push(Yaxis.data[j])
                        }
                    })

                    let Xaxiss = []
                    for(let n = 0; n < this.data.Yaxis.length;n++){
                        if(this.data.Yaxis[n].data[j]){Xaxiss.push(1)}
                        c.fillStyle = this.data.Yaxis[n].color;
                        c.textAlign = "left"
                        c.font = `15px Arial`
                        if(Xaxiss.length > 0){
                            let as = (Xaxiss.length - 1) /each_of_data[j].length
                            if(this.data.Yaxis[n].data[j]){
                                let y = y_for_rect + (20 * data_index_j.length * as) + (canvas.height * 0.2) * 0.2
                                c.fillText(this.data.Yaxis[n].name, x_for_rect + (canvas.width * 0.2) * 0.01 , y)
                                c.textAlign = "right"
                                c.fillText(this.data.Yaxis[n].data[j], x_for_rect + canvas.width * 0.2 - ((canvas.width * 0.2) * 0.01), y)
                            }
                        }   
                    }
                }
            }
        }else if(type == 'bar'){
            let each_of_y = []
    
            for(let Yaxis of this.data.Yaxis){
                for(let j = 0; j < Yaxis.data.length;j++){
                    if(each_of_y[j] == undefined){
                        each_of_y[j] = []
                    }
                    each_of_y[j].push(Yaxis.data[j])
                }
            }

            let x_line_length = canvas.width * 0.9 - canvas.width * 0.1
            let Xaxis_length = []
            let bar_width = x_line_length * (0.6 / this.longest_of_data) 
            for(let i = 0; i < this.data.Yaxis.length;i++){
                for(let j = 0; j < this.data.Yaxis[i].data.length;j++){
                    if(Xaxis_length[j] == undefined){Xaxis_length[j] = []}

                    Xaxis_length[j].push(1)
    
                    let thick_of_each_bar = bar_width * (1/each_of_y[j].length)
    
                    let each_bar = (bar_width * ((Xaxis_length[j].length - 1)/ each_of_y[j].length))
                 
                    let x = canvas.width * 0.1 + (x_line * ((j + 1)/ (this.longest_of_data + 1))) + each_bar - (bar_width * 0.5)
    
                    let y 
                    
                    if(y_min < 0){
                        y = map(canvas.height * 0.1 + d / 2, 0, canvas.height, canvas.height,0)
                    }else{
                        y = map(canvas.height * 0.1, 0, canvas.height, canvas.height,0)
                    }
                    c.fillStyle = this.data.Yaxis[i].color
                    c.fillRect(x,y,thick_of_each_bar,map(this.data.Yaxis[i].data[j],0,Yabs,0,(canvas.height * 0.85) - (canvas.height * 0.1)) * -1)
                    
                }
            }
        }
    }
    
    function action(){
        new_data_process()
        draw_white_board()
        drawTitle()
        draw_label()
        Xaxis()
        Yaxis()
        draw_data_visualzation()
        // draw_square_line()
        substracData()
        if(anim){
            requestAnimationFrame(action)
        }
    }

    action()
}
