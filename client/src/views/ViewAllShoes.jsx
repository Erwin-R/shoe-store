import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import Navbar from '../components/NavBar'
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';


const ViewAllShoes = () => {
    // const [allShoes, setAllShoes] = useState([]);
    // const [loaded, setLoaded] = useState("");

    // useEffect(() => {
    //     axios.get('http://localhost:8000/api/shoes')
    //         .then(res => {
    //             setAllShoes(res.data);
    //             setLoaded(true);
    //         })
    //         .catch(err => console.log(err))
    // }, [allShoes])

    return(
        <div>
            <Navbar/>
            <SideBar/>
            {/* {loaded && <ProductList allShoes={allShoes}/>} */}
            <Footer />
        </div>
    );
}

export default ViewAllShoes;