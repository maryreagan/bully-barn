import React, {useState, useEffect} from 'react'
import {PieChart, Pie, Cell, Legend, Tooltip, Label} from 'recharts'


function Chart() {

    const [dogs, setDogs] = useState([])


    useEffect(() => {
        const getDogs = async () => {
            const url = "http://127.0.0.1:4000/dog/";
            const response = await fetch(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
            })
            });
            const data = await response.json();
            console.log(data)
            setDogs(data);
        };
        getDogs();
    }, []);

    const caseworkerCount = {}
    dogs.forEach((dog) => {
        const caseworker = dog.caseworker;
        caseworkerCount[caseworker] = (caseworkerCount[caseworker] || 0) + 1;
        // for every dog, save caseworker name in variable caseworker - then we add 1 to the caseworkerCount object at the caseworker value
        // need the || 0 to handle first occurrence of each caseworker 
    })

    const totalDogs = dogs.length;
    const datasets = Object.entries(caseworkerCount).map(([name, value]) => ({
        name,
        value,
        percentage: Math.round((value/totalDogs)*100),
    }));

    const colorsPie = ['#085f63', '#49beb7', '#facf5a', '#ff5959', '#a2a8d3'];




    return (
    <div>
        <h3>Dogs by Caseworker</h3>
        <PieChart width={400} height={400}>
            <Pie
                data={datasets}
                dataKey="percentage"
                nameKey="name"
                //label
                fill="#8884d8">
                {datasets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colorsPie[index % colorsPie.length]} />
                ))}
                </Pie>
                <Tooltip formatter={(percentage) => `${percentage}%`} />
                <Legend />
        </PieChart>

    </div>
)
}

export default Chart