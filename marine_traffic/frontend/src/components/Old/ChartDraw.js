import * as d3 from 'd3';
import { useEffect, useMemo, useRef, useState } from 'react';

const ChartDraw = (props) => {
    const chartRef = useRef(null);

    //ШИРИНА И ВЫСОТА SVG-ЭЛЕМЕНТА. ПО-УМОЛЧАНИЮ ПО 0;
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    //заносим в состояние ширину и высоту svg-элемента (800, 400)
    useEffect(() => {
        const svg = d3.select(chartRef.current);
        setWidth(parseFloat(svg.style('width')));
        setHeight(parseFloat(svg.style('height')));
    });
    //задаём отступы в svg-элементе
    const margin = {
        top:10,
        bottom:60,
        left:40,
        right:10
    };

    //вычисляем ширину и высоту области для вывода графиков
    const boundsWidth = width - margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

    //ПЕРВОНАЧАЛЬНЫЙ ФОН
    useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();

        svg    
        .append('rect')
        .attr('x', margin.left)
        .attr('y', margin.top)
        .attr('width', boundsWidth)
        .attr('height', boundsHeight)
        .style('fill', 'lightgrey')

        svg                              //СООБЩЕНИЕ, ЧТО НИЧЕГО НЕ ВЫБРАНО
        .append('text')
        .attr('x', margin.left + boundsWidth / 2)
        .attr('y', margin.top + boundsHeight / 2)
        .attr('text-anchor', 'middle')   //ВЫРАВНИВАНИЕ ЧТОБЫ ПО ЦЕНТРУ БЫЛ ПО ГОРИЗОНТАЛИ
        .attr('dominant-baseline', 'middle') //ВЫРАВНИВАНИЕ ЧТОБЫ ПО ЦЕНТРУ БЫЛ ПО ВЕРТИКАЛИ
        .style('font-size', '30px')
        .text('Не выбраны значения по оси OY!');

    });


    
    //МИН И МАКС;
    let [min, max] = (props.horiz[0] == false) ? d3.extent(props.data.map(d => d.values[0])) //ВЫБРАН ТОЛЬКО МИН - БЕРЁТСЯ ИЗ МИН. ЗНАЧЕНИЯ
                     : (props.horiz[1] == true) 
                     ? [d3.min(props.data.map(d => d.values[0])), d3.max(props.data.map(d => d.values[1]))] //ВЫБРАН И МИН И МАКС - ТОГДА ОНИ БЕРУТСЯ ИЗ СООТВЕТСТВУЮЩИХ ЗНАЧЕНИЙ;
                     : d3.extent(props.data.map(d => d.values[1])) //ВЫБРАН ТОЛЬКО МАКС - БЕРЁТСЯ ИЗ НЕГО
    

  /*  let [min, max] = (props.horiz[0] == false) ? d3.extent(props.data.map(d => d.values[0])) //ЕСЛИ ВЫБРАН ТОЛЬКО МИНИМУМ, ТО ЗНАЧЕНИЯ НА ЕГО ОСНОВЕ. ИНАЧЕ НА МАКСИМУМЕ;
                     : d3.extent(props.data.map(d => d.values[1]))            */         
  

  //  alert(max+'   '+min)                 

    // формируем шкалы для осей
    const scaleX = useMemo(() => {
      return d3
        .scaleBand()
        .domain(props.data.map(d => d.labelX))  //что будет отображаться на графике (ОБЛАСТЬ ОПРЕДЕЛЕНИЯ)   
        .range([0, boundsWidth])  //диапазон расположений (ОБЛАСТЬ ЗНАЧЕНИЙ)
    }, [props.data, boundsWidth]);
    
    const scaleY = useMemo(() => {
        return d3
          .scaleLinear()    //ЦИФРЫ СОПОСТАВЛЯЮТСЯ С ЦИФРАМИ
          .domain([min * 0.85, max * 1.1 ])
          .range([boundsHeight, 0])
    }, [boundsHeight, min, max]);

    useEffect(() => {

          if (props.horiz[0] == false && props.horiz[1] == false) return

          const svg = d3.select(chartRef.current);
          svg.selectAll("*").remove();

          // рисуем оси
          const xAxis = d3.axisBottom(scaleX);
          svg .append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            //СТИЛИЗАЦИЯ ТЕКСТА
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`)
          .call(yAxis);

        //РИСУЕМ ГРАФИК
        for (let i=0;i<=1;i++) {
          if (props.horiz[i] == false) continue;

          if (props.chartType == 'scatter') {
            svg .selectAll(".dot")
              .data(props.data)
              .enter()
              .append("circle")
              .attr("r", 5)
              .attr("cx", d => scaleX(d.labelX)+(3.5*(-1*i)) + scaleX.bandwidth() / 2)
              .attr("cy", d => scaleY(d.values[1-i] ) )
              .attr("transform", `translate(${margin.left}, ${margin.top})`)
              .style("fill", (i==0) ? "red" : 'blue')

          } else if (props.chartType == 'bar') {
              svg.selectAll(".bar")
                .data(props.data)
                .enter()
                .append("rect")
                .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() * (0.3+(0.2*i))) // центрируем
                .attr("y", d => scaleY(d.values[1-i]))
                .attr("width", scaleX.bandwidth() * 0.2) 
                .attr("height", d => height - margin.bottom*1.15 - scaleY(d.values[1-i]))
                .attr("transform", `translate(${margin.left},
                                              ${margin.top})`)    
                .attr("fill", (i==0) ? "red" : 'blue');  

            }
        }

        
    }, [scaleX, scaleY, props.data]);    

    return (
      <>
        <svg ref={ chartRef } > </svg>
      </>  
    )
}


export default ChartDraw;












/*
          } else {
            let line = d3.line()
                .x(d => scaleX(d.labelX))
                .y(d => scaleY(d.values[1-i]))
                .curve(d3.curveCatmullRom.alpha(0.5))

            const thisPath = svg.append('path')
              .datum(props.data)
              .attr('d', line)
              .attr('transform', `translate(${margin.left}, ${margin.top})`)
              
              .style('stroke-width', '2')
              .style('stroke', (i==0) ? "red" : 'blue')
              .style("fill", "none")

            const totalLength = thisPath.node().getTotalLength();
            
            thisPath                                   //ЭТО АНИМАЦИЯ
              .attr('stroke-dashoffset', totalLength)
              .attr('stroke-dasharray', totalLength)
              .transition()
              .ease(d3.easeLinear)
              .duration(6000)
              .attr('stroke-dashoffset', 0)
          }
*/              