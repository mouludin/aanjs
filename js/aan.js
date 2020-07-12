let map = (a,b,c,d,e) =>  d + (((a - b) / (c - b)) * (e - d))

function determine_of_y(max){
    let the_number = 0.0000000001
    let run = true
    while(run){
        if(Math.floor(max / the_number) == 0){
            run = false
        }else{
            the_number *= 10
        }
    }
    if(max <= the_number * 0.5 && max > the_number * 0.2){the_number *= 0.5}
    else if(max <= the_number * 0.2 && max > the_number * 0.1){the_number *= 0.2}
    else if(max <= the_number * 0.1){the_number *= 0.1}


    return the_number
}

function getMousePos(canvas, evt){
    var rect = canvas.getBoundingClientRect()
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
}


let Aan = function(elem){
    this.ctx = elem.getContext("2d")
    this.global_y = []
    this.elem = elem
}

Aan.prototype.draw = function(para){
    let canvas = this.elem
    let c = this.ctx
    let wh = window.innerHeight
    let ctxh = canvas.height
    let x_axis_length = (canvas.width * (9/10)) - (canvas.width * (1/10))
    // let y_axis_length = (canvas.height * (9/10)) -  (canvas.height * (1/10))
    let x_axis_length_for_axis_point = x_axis_length * 0.95
    // let y_axis_length_for_axis_point = y_axis_length * 0.9
    let xx = (x_axis_length - x_axis_length_for_axis_point) / 2
    // let yy = (y_axis_length - y_axis_length_for_axis_point) / 2
    let average_of_canvas_size = (canvas.width + canvas.height) / 2

    
    this.mode = para.type
    let type = this.mode
    
    for(let i of para.Yaxis){for(let j of i.data){this.global_y.push(j)}}
    
    let y_max = Math.max(...this.global_y)
    // let y_min = Math.min(...this.global_y)

    let ny
    if(ctxh > wh * 0.8){
        ny = 10
    }else if(ctxh > wh * 0.4 && ctxh <= wh * 0.8){
        ny = 5
    }else if(ctxh > wh * 0.2 && ctxh <= wh * 0.4){
        ny = 4
    }

    function circle(x,y,color,width){
        c.fillStyle = color
        c.beginPath();
        c.arc(x, y, width, 0, Math.PI * 2, true); // Outer circle
        c.fill()
    }

    function rectangle(x,y,w,h){
        c.beginPath();
        c.fillStyle = "rgba(220,220,220,0.5)"
        c.rect(x, y, w, h);
        c.fill();
    }
    
    function draw_white_board(){
        c.fillStyle = 'rgba(255, 255, 255, 1)';
        c.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    function drawTitle(){
        if(para.title){
            c.fillStyle = para.title.color?para.title.color:"#111111"
            c.textAlign = "left"
            let font_size = para.title.font_size || `${canvas.height * 0.09}px`
            let font_family = para.title.font_family || "Arial"
            c.font = `${font_size} ${font_family}`
            c.fillText(para.title.name, canvas.width * 0.01, canvas.height * 0.07 )
        }
    }

    function draw_label(){
        let show = true
        if(para.setting){
            show = para.setting.show_label
        }
        if(para.Yaxis.length > 1 && show){
            let width_area_of_label = canvas.width * 0.5
            for(let i = 0; i < para.Yaxis.length;i++){
                let x = width_area_of_label + (width_area_of_label * (i / para.Yaxis.length))
                let y = canvas.height * 0.05
                circle(x,y,para.Yaxis[i].color, average_of_canvas_size * 0.015)
                circle(x,y,"#ffffff", average_of_canvas_size * 0.0075)
                c.fillStyle = "#111111"
                c.textAlign = "left"
                c.font =    `${average_of_canvas_size * 0.03}px Arial`
                c.fillText(para.Yaxis[i].name, x + average_of_canvas_size * 0.02, y + average_of_canvas_size * 0.0075)
            }
        }
    }
    
    
    let smallest = [canvas.height * (1/10) - canvas.height * (0.9/10),canvas.width * (1/10) - canvas.width * (0.9/10)]
    let longest_of_data = 0

    function draw_square_line(){
        c.strokeStyle = 'rgb(0, 0, 0)';
        c.beginPath()
        c.lineWidth = 2
        c.moveTo((canvas.width * (1/10)),(canvas.height * (1/10)))
        c.lineTo((canvas.width * (1/10)),(canvas.height * (9/10)))
        c.lineTo((canvas.width * (9/10)),(canvas.height * (9/10)))
        c.lineTo((canvas.width * (9/10)),(canvas.height * (1/10)))
        c.lineTo((canvas.width * (1/10)),(canvas.height * (1/10)))
        c.stroke()
    }

    function Xaxis(){
        if(!para.Xaxis){
            let arr = []
            for(let i of para.Yaxis){arr.push(i.data.length)}
            longest_of_data = Math.max(...arr)
        }else{
            // x_axis point
            longest_of_data = para.Xaxis.data.length
            for(let i = 0; i < longest_of_data; i++){
                c.beginPath()
                let x
                if(type == "chart"){
                    x = canvas.width * (1/10) + (x_axis_length_for_axis_point * (i / (longest_of_data - 1))) + xx
                }else if(type == "bar"){
                    x = canvas.width * 0.1 + (x_axis_length * ((i + 1)/ (longest_of_data + 1)))
                }
                c.moveTo(x,map(canvas.height * (1/10),0,canvas.height,canvas.height,0))
                c.lineTo(x,map(canvas.height * (1/10) - Math.min(...smallest),0,canvas.height,canvas.height,0) )
                c.stroke()
                c.fillStyle = 'rgb(0, 0, 0)';
                c.textAlign = "center"
                c.font = "15px Arial"
                c.fillText(`${para.Xaxis.data[i]}`, x, map(canvas.height * (0.5/10),0,canvas.height,canvas.height,0));
            }
        }
    }
    
    let nny = determine_of_y(y_max)
    let d = canvas.height * (8.5/10) - canvas.height * (1/10)
    function Yaxis(){
        // y_axis_point
        for(let i = 1; i <= ny; i++){
            c.beginPath()
            let a = map(nny * (i / ny),0,nny,0,d )
    
            let y = map((canvas.height * (1/10) + a) ,0,canvas.height,canvas.height,0)
    
            c.moveTo(canvas.width * (1/10) ,y)
    
            c.lineTo(canvas.width * (1/10) - Math.min(...smallest) ,y)
            c.stroke()
    
            let value = nny * (i / ny)
            c.fillStyle = 'rgb(0, 0, 0)';
            c.textAlign = "right"
            c.font = `${(canvas.width * 0.15) * 0.20}px Arial`
            c.fillText(value, canvas.width * (0.8/10), y + ((canvas.height * 0.2) * 0.25) * (1/3))
        }
    }

    function draw_data_visualzation(){
        if(type == 'chart'){
            function draw_curva(){
                c.fillStyle = 'rgba(255, 255, 255, 1)';
                c.fillRect(canvas.width * 0.1, canvas.height * 0.1, canvas.width * 0.8 , canvas.height * 0.8);
                for(let Yaxis of para.Yaxis){
                    // curva point
                    c.beginPath()
                    c.lineWidth = 2
                    for(let j = 0; j < longest_of_data;j++){
                        let x = canvas.width * (1/10) + (x_axis_length_for_axis_point * (j / (longest_of_data - 1))) + xx
                        let y = map((canvas.height * (1/10)) + map(Yaxis.data[j], 0, nny,0,d),0,canvas.height,canvas.height,0)
                        j == 0?c.moveTo(x,y):c.lineTo(x,y)
                    }
        
                    Yaxis.color?c.strokeStyle = Yaxis.color:null
                    c.stroke()
                }
            }

            draw_curva()

            for(let j = 0; j < longest_of_data;j++){
                canvas.addEventListener('mousemove',e => {
                    let x = canvas.width * (1/10) + (x_axis_length_for_axis_point * (j / (longest_of_data - 1))) + xx
                    let mousePos = getMousePos(canvas,e)
                    if(mousePos.x < x + 20 && mousePos.x > x - 20){
                        draw_white_board()
                        drawTitle()
                        draw_label()
                        Xaxis()
                        Yaxis()
                        draw_curva()
                        for(let k of para.Yaxis){
                            if(k.data[j]){
                                let x = canvas.width * (1/10) + (x_axis_length_for_axis_point * (j / (longest_of_data - 1))) + xx
                                let y = map(canvas.height * 0.1 + map(k.data[j],0,nny,0,canvas.height * 0.75), 0,canvas.height,canvas.height,0)
                                circle(x, y,k.color,10)
                                circle(x, y,"#ffffff",5)
                            }
                        }
                        draw_square_line()
                        let x_for_rect = canvas.width * (1/10) + (x_axis_length_for_axis_point * (j / (longest_of_data - 1))) + xx
                        let y_for_rect = canvas.height * 0.15

                        if(j >= longest_of_data * 0.5){
                            x_for_rect -= canvas.width * 0.25
                        }else{
                            x_for_rect += canvas.width * 0.05
                        }

                        let data_index_j = []
                        for(let k of para.Yaxis){
                            if(k.data[j]){
                                data_index_j.push(k.data[j])
                            }
                        }

                        let data_length = 0
                        data_index_j.forEach(e=>{
                            data_length += e
                        })
                        
                        let average_of_data_index_j = data_length / data_index_j.length
                        if(average_of_data_index_j > nny * 0.5){
                            y_for_rect = canvas.height * 0.65
                        }

                        rectangle(x_for_rect,y_for_rect,canvas.width * 0.2,canvas.height * 0.2)


                        let each_of_data = []
    
                        for(let Yaxis of para.Yaxis){
                            for(let j = 0; j < Yaxis.data.length;j++){
                                if(each_of_data[j] == undefined){
                                    each_of_data[j] = []
                                }
                                each_of_data[j].push(Yaxis.data[j])
                            }
                        }

                        let Xaxiss = []
                        for(let n = 0; n < para.Yaxis.length;n++){
                            if(para.Yaxis[n].data[j]){
                                Xaxiss.push(1)
                            }
                            c.fillStyle = para.Yaxis[n].color;
                            c.textAlign = "left"
                            c.font = `${(canvas.width * 0.2) * 0.12}px Arial`
                            if(Xaxiss.length > 0){
                                let as = (Xaxiss.length - 1) /each_of_data[j].length
                                if(para.Yaxis[n].data[j]){
                                    c.fillText(para.Yaxis[n].name, x_for_rect + (canvas.width * 0.2) * 0.01 , y_for_rect + ((canvas.height * 0.2) * as) + (canvas.height * 0.2) * 0.2)
                                    c.textAlign = "right"
                                    c.fillText(para.Yaxis[n].data[j], x_for_rect + canvas.width * 0.2 - ((canvas.width * 0.2) * 0.01), y_for_rect + ((canvas.height * 0.2) * as) + (canvas.height * 0.2) * 0.2)
                                }
                            }
                            
                        }

                    }
                    
                    if(mousePos.x < canvas.width * 0.1 || mousePos.x > canvas.width * 0.9 || mousePos.y < canvas.height * 0.1 || mousePos.y > canvas.height * 0.9){
                        draw_white_board()
                        drawTitle()
                        draw_label()
                        Xaxis()
                        Yaxis()
                        draw_curva()
                        draw_square_line()
                    }
                })
            }
        }else if(type == 'bar'){
            let each_of_y = []
    
            for(let Yaxis of para.Yaxis){
                for(let j = 0; j < Yaxis.data.length;j++){
                    if(each_of_y[j] == undefined){
                        each_of_y[j] = []
                    }
                    each_of_y[j].push(Yaxis.data[j])
                }
            }

    
            let x_line_length = canvas.width * 0.9 - canvas.width * 0.1
            let Xaxis_length = []
            let bar_width = x_line_length * (0.6 / longest_of_data) 
            for(let i = 0; i < para.Yaxis.length;i++){
                for(let j = 0; j < para.Yaxis[i].data.length;j++){
                    if(Xaxis_length[j] == undefined){
                        Xaxis_length[j] = []
                    }
                    Xaxis_length[j].push(1)
    
    
                    let thick_of_each_bar = bar_width * (1/each_of_y[j].length)
    
                    let each_bar = (bar_width * ((Xaxis_length[j].length - 1)/ each_of_y[j].length))
                    

                    let x = canvas.width * 0.1 + (x_axis_length * ((j + 1)/ (longest_of_data + 1))) + each_bar - (bar_width * 0.5)
    
                    let y = map(canvas.height * 0.1, 0, canvas.height, canvas.height,0)
    
    
                    c.fillStyle = para.Yaxis[i].color
                    c.fillRect(x,y,thick_of_each_bar,map(para.Yaxis[i].data[j],0,nny,0,(canvas.height * 0.85) - (canvas.height * 0.1)) * -1)

                }
            }
        }
    }
    
    function draw(){
        draw_white_board()
        drawTitle()
        draw_label()
        Xaxis()
        Yaxis()
        draw_data_visualzation()
        draw_square_line()
    }

    draw()
}