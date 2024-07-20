import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdModeEdit } from "react-icons/md";

const ProfileInformation = () => {
  const [profileInfo, setProfileInfo] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const token = localStorage.getItem("token");

  const fetchUserProfileInfo = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/v1/user/user-profile-info", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      setProfileInfo(res.data.Profile);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchUserProfileInfo();
  }, []);

  useEffect(() => {
    console.log("goa", profileInfo);
  }, [profileInfo]);

  const submitProfilePicture = async () => {
    const formData = new FormData();
    formData.append("imageFile", imageFile);

    const maxAttempts = 5; // Adjust the maximum number of retry attempts as needed
    let attempt = 0;
    let success = false;

    while (attempt < maxAttempts && !success) {
      try {
        const res = await axios.post("http://localhost:9090/api/v1/user/update-profile-picture", formData, {
          headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        });
        console.log("Upload successful!", res);
        success = true;
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error);
        attempt++;
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
      }
    }
    if (!success) {
      console.log("Failed to upload after multiple attempts.");
    }
  }

  const isBase64 = (str) => {
    return str && str.startsWith("/9j/");
  };

  const getImageSrc = (image) => {
    if (image instanceof Blob || image instanceof File) {
      return URL.createObjectURL(image);
    } else if (isBase64(image)) {
      return `data:image/jpeg;base64,${image}`;
    }
    return image;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <>
      <h1 className=' text-center fs-4 py-2 fw-bold text-white mb-0' style={{ backgroundColor: "#B3C8CF" }}>Profile Information</h1>
      <div className=' overflow-hidden overflow-y-scroll pt-3' style={{ height: "500px" }}>
        <div className='' style={{width: "75%"}}>
          <div className='position-relative d-flex justify-content-start flex-column align-items-start '>
            <div className=' overflow-hidden rounded-circle' style={{ width: "200px", height: "200px" }}>
              <img src={profileInfo.image ? getImageSrc(profileInfo.image) : "/images/user-logo.png"} className=' w-100 h-100 object-fit-cover ' />
            </div>
            <form className='' onSubmit={submitProfilePicture}>
              <div className=' text-center'>
                <input
                  id='file-upload'
                  className=' visually-hidden'
                  type='file'
                  name='image'
                  accept='image/jpg, image/jpeg, image/png'
                  onChange={handleFileChange}
                />
                <label
                  htmlFor='file-upload'
                  className=' bg-blue-500 text-white p-1 bg-info rounded-circle position-absolute' style={{ top: "0px", left: "150px" }}
                >
                  <MdModeEdit className=' text-black' style={{ height: "30px", width: "30px" }} />
                </label>
                <button type="submit" className=' btn btn-success' disabled={imageFile ? false : true}>Add</button>
              </div>
            </form>
          </div>
          <table className='table table-borderless w-50'>
            <caption className=' caption-top'></caption>
            <tbody>
              <tr>
                <th scope="col" className=' fs-4'>First Name</th>
                <td className=' fs-4'>{profileInfo.firstName}</td>
              </tr>
              <tr>
                <th scope="col" className=' fs-4'>Last Name</th>
                <td className=' fs-4'>{profileInfo.lastName}</td>
              </tr>
              <tr>
                <th scope="col" className=' fs-4'>Gender</th>
                <td className=' fs-4'>{profileInfo.gender}</td>
              </tr>
              <tr>
                <th scope="col" className=' fs-4'>DOB</th>
                <td className=' fs-4'>{profileInfo.dob}</td>
              </tr>
              <tr>
                <th scope="col" className=' fs-4'>Email</th>
                <td className=' fs-4'>{profileInfo.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ProfileInformation
