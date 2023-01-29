import React, { useState, useEffect } from 'react';
import axios from 'axios'

const AdminForm = (props) => {
    const [listProducts, setListProducts] = useState([]);
    const [stripeProductId, setStripeProductId] = useState("")
    useEffect(() => {
        axios.get('http://localhost:8000/v1/products')
            .then(res => {
                // console.log(res)
                const holdResponse = res.data.data;
                console.log(typeof(holdResponse))
                console.log(res.data.data)
                console.log(holdResponse[0])
                const result = [];
                for(let i = 0; i < holdResponse.length; i++){
                    if(holdResponse[i].default_price === null){
                        result.push(holdResponse[i]);
                    }
                }
                setStripeProductId([...result][0].id);
                setListProducts([...result]);
                setDbName(result[0].name)
                console.log(listProducts);

            })
            .catch(err => console.error(err));
    }, [])


    //Product States
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [size, setSize] = useState([]);
    const [imgUrls, setImgUrls] = useState([]);
    const [img1, setImg1] = useState("");
    const [img2, setImg2] = useState("");
    const [img3, setImg3] = useState("");
    const [img4, setImg4] = useState("");
    const [brand, setBrand] = useState("");
    const [categories, setCategories] = useState([]);

    //Price States
    const [stripePrice, setStripePrice] = useState("")
    const [price, setPrice] = useState("")


    //Database states
    const [dbName, setDbName] = useState("")

    const putImagesTogether = () => {
        const tempArray = [img1, img2, img3, img4]
        setImgUrls([...tempArray])
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // console.log(imgUrls.split("~"));
        putImagesTogether();
        console.log(img1);
        console.log(imgUrls)
        axios.post('http://localhost:8000/api/shoe', {
            name,
            description,
            imgUrls,
            size: size.split(","),
            price,
            brand,
            categories
        })
            .then(res => {
                console.log(res)
                console.log(imgUrls)
                axios.post('http://localhost:8000/v1/products', {
                    name,
                    description,
                    // images: [`${imgUrls}`]
                    images: imgUrls
                })
                    .then(res => {
                        setName("");
                        setDescription("");
                        setBrand("");
                        setSize("");
                        setImg1("");
                        setImg2("");
                        setImg3("");
                        setImg4("");
                        setPrice("");
                        setImgUrls([]);
                        console.log(res)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.error(err))
    }

    const priceSubmitHandler = (e) => {
        e.preventDefault();
        // console.log(stripeProductId)
        // console.log(dbName)
        axios.post('http://localhost:8000/v1/prices', {
            stripePrice,
            stripeProductId
        })
            .then(res => {
                        // axios.get('http://localhost:8000/v1/prices/' + res.data.id)
                        //     .then(res => {

                        //     })
                        const stripePriceId = res.data.id
                        console.log(stripePriceId)
                        // console.log(typeof(stripePriceId));
                        // const config = { headers: {'Content-Type': 'text/plain'} };
                    axios.put('http://localhost:8000/v1/products/'+ stripeProductId , {
                        default_price: stripePriceId
                    })
                        .then(res => console.log(res))
                        .catch(err => console.error(err))
                    console.log("hello from first response");
                    console.log(res)
                    axios.get(`http://localhost:8000/db/shoe/${dbName}`)
                        .then(res => {
                            console.log(res.data._id)
                            console.log("hello from axios get")
                            axios.put('http://localhost:8000/api/shoe/' + res.data._id, {
                                price: stripePrice
                            })
                                .then(res => {
                                    setStripePrice("")
                                    console.log(res)
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h2 className="text-center text-2xl">Add a Product</h2>
            <form className="mx-auto w-1/2 border p-3 rounded-md" onSubmit={onSubmitHandler}>
                <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Product Name:</label>
                    <div>
                        <input type="text" className="w-full border rounded-md p-2" onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Product Description:</label>
                    <div>
                        <input type="text" className="w-full border rounded-md p-2" onChange={(e) => setDescription(e.target.value)} value={description} />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Product Brand:</label>
                    <div>
                        <input type="text" className="w-full border rounded-md p-2" onChange={(e) => setBrand(e.target.value)} value={brand} />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Shoe Sizes:</label>
                    <div>
                        <input type="text" className="w-full border rounded-md p-2" onChange={(e) => setSize(e.target.value)} value={size}/>
                    </div>
                </div>
                {/* <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Price:</label>
                    <div>
                        <input type="number" className="w-full border rounded-md p-2" onChange={(e) => setPrice(e.target.value)} value={price}/>
                    </div>
                </div> */}
                <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Image URL 1:</label>
                    <div>
                        <input id="img1" type="text" className="w-full border rounded-md p-2" onChange={(e) => setImg1(e.target.value)} value={img1}/>
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Image URL 2:</label>
                    <div>
                        <input id="img2" type="text" className="w-full border rounded-md p-2" onChange={(e) => setImg2(e.target.value)} value={img2} />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Image URL 3:</label>
                    <div>
                        <input id="img3" type="text" className="w-full border rounded-md p-2" onChange={(e) => setImg3(e.target.value)} value={img3} />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Image URL 4:</label>
                    <div>
                        <input id="img4" type="text" className="w-full border rounded-md p-2" onChange={(e) => setImg4(e.target.value)} value={img4} />
                    </div>
                </div>
                <button type="submit" onClick={() => putImagesTogether()} className="bg-dark-blue hover:bg-light-blue text-white rounded-md p-2">Create Product</button>
            </form>

            <h2 className="text-center text-2xl mt-5">Add a price</h2>
            <form className="mx-auto w-1/2 border p-3" onSubmit={priceSubmitHandler}>
                <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Price of Product:</label>
                    <div>
                        <input type="number" className="w-full border rounded-md p-2" onChange={(e) => setStripePrice(e.target.value)} value={stripePrice}/>
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Products:</label>
                    <div>
                        <select className="w-full border rounded-md p-2" onChange={(e) => {
                            setStripeProductId(e.target.value.split("@")[0])
                            setDbName(e.target.value.split("@")[1])
                        }} 
                            id="product-name"
                        >
                            {listProducts.map((option, i) => {
                                return <option key={i} value={`${option.id}@${option.name}`} name={option.name}>{option.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <button type="submit" className="bg-dark-blue hover:bg-light-blue text-white rounded-md p-2">Create Product Price</button>
            </form>

            <h2 className="text-center text-2xl mt-5">Add a Category</h2>
            <form className="mx-auto w-1/2 border p-3">
                <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Name of Category:</label>
                    <div>
                        <input type="text" className="w-full border rounded-md p-2" />
                    </div>
                </div>
                <button type="submit" className="bg-dark-blue hover:bg-light-blue text-white rounded-md p-2">Add Category</button>
            </form>
        </div>
    );
}

export default AdminForm;