import React, {useState, useEffect} from 'react'
import {PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid} from 'recharts'
import './Chart.css'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer } from '@mui/material'
import DrawerNav from './DrawerNav'




function Chart() {

    const [dogs, setDogs] = useState([])
    const [applicants, setApplicants] = useState([])


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
            setDogs(data);
        };
        getDogs();
    }, []);

    useEffect(() => {
        const getApplications = async () => {
            const url = "http://127.0.0.1:4000/form/applications"
            const response = await fetch (url, {
                method: 'GET',
                headers: new Headers ({
                    "Content-Type": "application/json", 
                }),
            })
            const data = await response.json()
            setApplicants(data.applications)
        }
        getApplications();
    }, [])

    // !piechart info 

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

    // !bar chart info
    // gets number of applications for every dog by dogId
    const applicationCount = {}
    applicants.forEach((applicant)=> {
        const dogId = applicant.petPreferences.dogId
        applicationCount[dogId] = (applicationCount[dogId] || 0) +1;
    })

    const barChartData = dogs.map((dog) => ({
        name: dog.name,
        Applications: applicationCount[dog._id] || 0, // number of applications for this dog
    }))

    // !table info

    const dogsByStatus = (status) => {
        return dogs.filter(dog => dog.adoptionStatus === status).length
    }

    const sponsoredStatus = () => {
        return dogs.filter(dog => dog.sponsorshipStatus).length
    }

    const tableData = [
        {name: 'Available For Adoption', count: dogsByStatus('available')},
        {name: 'Pending Adoption', count: dogsByStatus('pending')},
        {name: 'Adopted', count: dogsByStatus('adopted')},
        {name: 'Sponsored', count: sponsoredStatus('true')}
    ]



    return (
    <div id='chart-container'>
        <DrawerNav />
        
        
        <div className='pie-table-container'>

        <div id='piechart'>
        <h2 id='pie-title'>Dogs by Caseworker</h2>
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

        <div id='table'>
            <div className="table-container">
            <h2 id='table-title'>Adoption Status</h2>
            <TableContainer component={Paper}>
            <Table className="table">
                <TableHead>
                <TableRow className="table-header">
                    <TableCell>Status</TableCell>
                    <TableCell>Number of Dogs</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
                    <TableCell>Total Dogs</TableCell>
                    <TableCell>{totalDogs}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Sponsored</TableCell>
                    <TableCell>{sponsoredStatus()}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Adopted</TableCell>
                    <TableCell>{dogsByStatus('adopted')}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Pending Adoption</TableCell>
                    <TableCell>{dogsByStatus('pending')}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Available for Adoption</TableCell>
                    <TableCell>{dogsByStatus('available')}</TableCell>
                </TableRow>
                
                </TableBody>
            </Table>
            </TableContainer>
            </div>
        </div>
    </div>

        
        <div id='bar-chart'>
        <h2 id='bar-title'>Number of Applications per Dog</h2>
        <BarChart
            width={800}
            height={400}
            data={barChartData}
            >
            <CartesianGrid strokeDasharray={"3 3"} />
            <XAxis dataKey="name" interval={0}/>
            <YAxis ticks={[1,2,3,4,5,6,7,8]} />
            <Tooltip />
            <Bar dataKey="Applications" fill='#49beb7' />
        </BarChart>
        </div>

    </div>
)
}

export default Chart