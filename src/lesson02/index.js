import * as d3 from 'd3'
import './style.css'

export default () => {
    let width = 500
    let height = 500
    let margin = {
        left: 50,
        top: 30,
        right: 20,
        bottom: 20
    }
    let g_width = width - margin.left - margin.right
    let g_height = height - margin.top - margin.bottom

    //定义svg
    let svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(40,40)")

    let data = [1, 3, 5, 6, 7, 8, 9, 1]

    let scale_x = d3.scale.linear()
        .domain([0, data.length - 1])
        .range([0, g_width])
    let scale_y = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([g_height, 0])
    console.log('scale', scale_x, scale_y)

    let x_axis = d3.svg.axis().scale(scale_x)
    let y_axis = d3.svg.axis().scale(scale_y).orient("left")

    let line_generator = d3.svg.line()
        .x((d, i) => scale_x(i))
        .y((d, i) => scale_y(d))
        .interpolate('cardinal')

    let g = d3.select('g')
        .append('path')
        .attr('d', line_generator(data))

    // X轴
    // svg
    //     .append("g")
    //     .call(x_axis)
    //     .attr("transform", "translate(0+" + g_height + ")")

    // Y轴
    // svg
    //     .append("g")
    //     .call(y_axis)
    //     .append("text")
    //     .text("文字标签")
    //     .attr("transform", "rotate(-90)")
    //     .attr("text-anchor", "end")
    //     .attr("dy", "1em")
}