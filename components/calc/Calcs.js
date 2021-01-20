import React from 'react'

export function Calc (values, money) {

}

export function LessNumberBills (values) {
    let ans = [
        {id:1, value: 1, quant: 0},
        {id:2, value: 2, quant: 0},
        {id:3, value: 5, quant: 0},
        {id:4, value: 10, quant: 0},
        {id:5, value: 20, quant: 0},
        {id:6, value: 50, quant: 0},
        {id:7, value: 100, quant: 0},
        {id:8, value: 200, quant: 0}
    ]
    console.log(values)
    console.log(ans.length)
    values.forEach(element => {
        console.log(element)
        let currentValue = Number(element.value);
        for(let i=ans.length - 1; i>=0 ;i--) {
            while(currentValue>=ans[i].value) {
                console.log('entrou')
                ans[i].quant = Number(ans[i].quant) + Number(element.quant);
                currentValue = Number(currentValue) - Number(ans[i].value);
            }
        }
    });
    return(ans);
}