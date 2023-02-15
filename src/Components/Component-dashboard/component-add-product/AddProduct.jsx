import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../../../config/constants';
import validator from 'validator';

import './AddProduct.css'

const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("1");
    const [picture, setPicture] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscout] = useState("");
    const [stock, setStock] = useState("");
    const [message, setMessage] = useState("");
    const [priceError, setPriceError] = useState("");
    const [discountError, setDiscountError] = useState("");

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
            await axios.post(API_URL + "api/add-product", formData);
            setMessage('Added successuful');
        } catch (err) {
            setMessage(err.message);
            console.log(err.response);
        }
    };
    const handlePriceChange = (e) => {
        if (e.target.value === "" || validator.isInt(e.target.value, { min: 0 })) {
            setPrice(e.target.value);
            return;
        }
    }

    return (
        <form class="row g-3 col-10 mx-auto mt-1" onSubmit={handleSubmit} method='POST' encType="multipart/form-data">
            <div class="col-md-6 mb-2">
                <label class="form-label fw-semibold">Title <span class="text-danger">*</span></label>
                <input type="text" class="form-control" name='title' value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div class="col-md-6 ">
                <label class="form-label fw-semibold"> Category <span class="text-danger">*</span></label>
                <select class="form-select" aria-label="Default select example" onChange={(e) => {
                    setCategory(e.target.value)
                }} name='category' >
                    <option value="1">Women</option>
                    <option value="2">Men</option>
                    <option value="3">Kids</option>
                    <option value="4">Accessories</option>
                </select>
            </div>
            <div class="mb-2">
                <label for="formFile" class="form-label fw-semibold">Picture <span class="text-danger">*</span></label>
                <input class="form-control" type="file" id="formFile" name="picture" onChange={(e) => setPicture(e.target.files[0])} required />
            </div>
            <div class="mb-2">
                <label class="form-label fw-semibold">Description <span class="text-danger">*</span></label>
                <textarea name="description" class="form-control" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea >
            </div>

            <div class="col-md-4">
                <label class="form-label fw-semibold">price (dh) <span class="text-danger">*</span></label>
                <input type="number" class="form-control" name='price' value={price} onChange={handlePriceChange} required />
                {priceError && <div className='alert alert-danger'>{priceError}</div>}
            </div>
            <div class="col-md-4">
                <label class="form-label fw-semibold">Discount rate (%)</label>
                <input type="number" class="form-control" name='discount' value={discount} onChange={(e) => setDiscout(e.target.value)} />
            </div>
            <div class="col-md-4">
                <label class="form-label fw-semibold">Stock <span class="text-danger">*</span></label>
                <input type="number" class="form-control" name='stock' value={stock} onChange={(e) => setStock(e.target.value)} required />
            </div>
            <div className="text-warning fw-semibold text-center fs-5 mt-3">{message ? <p>{message}</p> : null}</div>
            <div class="col-12 d-flex justify-content-end mt-3">
                <button type="submit" class="btn btn-warning px-4 fw-semibold ">Submit</button>
            </div>
        </form>
    )
}
export default AddProduct