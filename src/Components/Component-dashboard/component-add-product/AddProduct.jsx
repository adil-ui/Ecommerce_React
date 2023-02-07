import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config/constants';

import './AddProduct.css'

const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [picture, setPicture] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscout] = useState("");
    const [stock, setStock] = useState("");
    //const [promoPrice, setPromoPrice] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("picture", picture);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("discount", discount);
        formData.append("stock", stock);
        try {
            const res = await axios.post(API_URL + "api/add-product", formData);
            console.log(res.data);
            navigate('/login');
        } catch (err) {
            setMessage(err.message);
            console.log(err.response);
        }
    };

    return (
        <form class="row g-3 col-10 mx-auto mt-1" onSubmit={handleSubmit} method='POST' encType="multipart/form-data">
            <div class="col-md-6 mb-2">
                <label class="form-label">Title <span class="text-danger">*</span></label>
                <input type="text" class="form-control" name='title' value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div class="col-md-6 ">
                <label class="form-label"> Category <span class="text-danger">*</span></label>
                <select class="form-select" aria-label="Default select example" onChange={(e) => {
                    console.log(e.target.value);
                    setCategory(e.target.value)
                }} name='category' >
                    <option value="1">Women</option>
                    <option value="2">Men</option>
                    <option value="3">Kids</option>
                    <option value="4">Accessories</option>
                </select>
            </div>
            <div class="mb-2">
                <label for="formFile" class="form-label">Picture <span class="text-danger">*</span></label>
                <input class="form-control" type="file" id="formFile" name="picture" onChange={(e) => setPicture(e.target.files[0])} required />
            </div>
            <div class="mb-2">
                <label class="form-label">Description <span class="text-danger">*</span></label>
                <textarea name="description" class="form-control" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea >
            </div>

            <div class="col-md-4">
                <label class="form-label">price (dh) <span class="text-danger">*</span></label>
                <input type="number" class="form-control" name='price' value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div class="col-md-4">
                <label class="form-label">Discount rate (%)</label>
                <input type="number" class="form-control" name='discount' value={discount} onChange={(e) => setDiscout(e.target.value)} />
            </div>
            <div class="col-md-4">
                <label class="form-label">Stock <span class="text-danger">*</span></label>
                <input type="number" class="form-control" name='stock' value={stock} onChange={(e) => setStock(e.target.value)} required />
            </div>
            <div className="message">{message ? <p>{message}</p> : null}</div>
            <div class="col-12 d-flex justify-content-end mt-4">
                <button type="submit" class="btn btn-primary ">Submit</button>
            </div>
        </form>
    )
}
export default AddProduct