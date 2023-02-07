import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { API_URL } from '../../../config/constants';
import AuthContext from '../../../context/auth-context';
import './Profile.css'

const Profile = () => {
    const {user} = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userPicture, setUserPicture] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
      if(user){
        console.log(user);
        setUserId(user.id);
        setUserName(user.name);
        setUserAddress(user.adress);
        setUserPhone(user.phone);
        setUserPicture(user.picture);
        setUserEmail(user.email);
        setUserPassword(user.password);
      } else {
        setUserName("");
        setUserAddress("");
        setUserPhone("");
        setUserPicture("");
        setUserEmail("");
        setUserPassword("");
      }
    },[user])
    const updateUser = async (e) =>{
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", userName);
      formData.append("adress", userAddress);
      formData.append("picture", userPicture);
      formData.append("phone", userPhone);
      formData.append("email", userEmail);
      formData.append("password", userPassword);
      try {
          const response = await axios.post(API_URL+'api/profile'+userId, formData);
          setMessage(response.data.success);
      } catch (error) {
          setMessage(error.message);
          console.log(error.response);
      }
     
  }
    return(
        <form className="row g-3 col-11 mx-auto " onSubmit={updateUser} encType="multipart/form-data">       
            <div className="col-md-6">
              <label className="form-label fw-semibold">Name</label>
              <input type="text" className="form-control" name='name' value={userName} onChange={(e) => setUserName(e.target.value)} required/>
            </div>
            <div className="col-md-6">
                <label className="form-label fw-semibold">Phone</label>
                <input type="number" className="form-control"  name='phone' value={userPhone} onChange={(e) => setUserPhone(e.target.value)} required/>
            </div>
            <div className="col-md-12">
                <label className="form-label fw-semibold">Address</label>
                <input type="text" className="form-control"  name='address' value={userAddress} onChange={(e) => setUserAddress(e.target.value)} required/>
            </div>
            <div className="">
                <label for="formFile" className="form-label fw-semibold">Picture</label>
                <input className="form-control" type="file" id="formFile" name="picture" onChange={(e) => setUserPicture(e.target.files[0])} />
                <img src={API_URL + userPicture} alt="" className="profile_img" />
            </div>
            <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input type="email" className="form-control"  name='email' value={userEmail}  onChange={(e) => setUserEmail(e.target.value)} required/>
              </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input type="password" className="form-control"  name='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required/>
            </div>
            <div className="col-12 d-flex justify-content-end">
              <button type="submit" className="btn btn-success px-4 fw-semibold">Update</button>
            </div>
        </form>
    )
}
export default Profile