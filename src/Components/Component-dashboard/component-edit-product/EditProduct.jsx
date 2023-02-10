import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../config/constants';
import './EditProduct.css'

const EditProduct = () => {
    const [id, setId] = useState();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [picture, setPicture] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [stock, setStock] = useState("");
    const [message, setMessage] = useState("");
    const params = useParams();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(API_URL + 'api/details/' + params.id)
            .then(response => response.json())
            .then(result => {
                setId(result.product.id);
                setTitle(result.product.title);
                setPicture(result.product.picture);
                setDescription(result.product.description);
                setPrice(result.product.price);
                setStock(result.product.stock);
                setCategory(result.product.category_id);
                setDiscount(result.product.discount_rate);

                setCategories(result.categories);
            })
    }, []);

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
            const response = await axios.post(API_URL + 'api/edit-product/' + id, formData);
            setMessage(response.data.success);
        } catch (error) {
            setMessage(error.message);
            console.log(error.response);
        }

    }
    return (
        <form className="row g-3 col-10 mx-auto" onSubmit={handleSubmit} method='POST' encType="multipart/form-data">
            <div className="col-md-6 mb-2">
                <label className="form-label">Title <span className="text-danger">*</span></label>
                <input type="text" className="form-control" name='title' value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="col-md-6 ">
                <label className="form-label"> Category <span className="text-danger">*</span></label>
                <select className="form-select" aria-label="Default select example" name='category' onChange={(e) => setCategory(e.target.value)}>
                    {categories.map(productCategory => productCategory.id === category ?
                        <option selected key={productCategory.id} value={productCategory.id}>{productCategory.title}</option> :
                        <option key={productCategory.id} value={productCategory.id}>{productCategory.title}</option>)}
                </select>
            </div>
            <div className="">
                <label for="formFile" className="form-label">Picture <span className="text-danger">*</span></label>
                <input className="form-control" type="file" id="formFile" name="picture" onChange={(e) => setPicture(e.target.files[0])} />
                <img src={API_URL + picture} alt="" width='100px' className='mt-1' />
            </div>
            <div className="">
                <label className="form-label">Description <span className="text-danger">*</span></label>
                <textarea name="description" className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea >
            </div>

            <div className="col-md-4">
                <label className="form-label">price (dh) <span className="text-danger">*</span></label>
                <input type="number" className="form-control" name='price' value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className="col-md-4">
                <label className="form-label">Discount rate (%)</label>
                <input type="number" className="form-control" name='discount' value={discount} onChange={(e) => setDiscount(e.target.value)} />
            </div>
            <div className="col-md-4">
                <label className="form-label">Stock <span className="text-danger">*</span></label>
                <input type="number" className="form-control" name='stock' value={stock} onChange={(e) => setStock(e.target.value)} required />
            </div>
            {message ? <p className='alert alert-warning text-center'>{message}</p> : null}
            <div className="col-12 d-flex justify-content-end mt-4">
                <button type="submit" className="btn btn-primary ">Submit</button>
            </div>
        </form>
    )
}

export default EditProduct