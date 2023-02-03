import { useContext, useEffect, useState } from 'react';
import { API_URL } from '../../../config/constants';
import AuthContext from '../../../context/auth-context';
import './Profile.css'

const Profile = () => {
    const {user} = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userPicture, setUserPicture] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    useEffect(() => {
      if(user){
        console.log(user);
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
    return(
        <form className="row g-3 col-11 mx-auto " encType="multipart/form-data">       
            <div className="col-md-6">
              <label className="form-label fw-semibold">Name</label>
              <input type="text" className="form-control" name='name' value={userName} required/>
            </div>
            <div className="col-md-6">
                <label className="form-label fw-semibold">Phone</label>
                <input type="number" className="form-control"  name='phone' value={userPhone} required/>
            </div>
            <div className="col-md-12">
                <label className="form-label fw-semibold">Address</label>
                <input type="text" className="form-control"  name='address' value={userAddress} required/>
            </div>
            <div className="">
                <label for="formFile" className="form-label fw-semibold">Picture</label>
                <input className="form-control" type="file" id="formFile" name="picture"  />
                <img src={API_URL + userPicture} alt="" className="profile_img" />
            </div>
            <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input type="email" className="form-control"  name='email' value={userEmail} required/>
              </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input type="password" className="form-control"  name='password' value={userPassword} required/>
            </div>
            <div className="col-12 d-flex justify-content-end">
              <button type="submit" className="btn btn-success px-4 fw-semibold">Update</button>
            </div>
        </form>
    )
}
export default Profile