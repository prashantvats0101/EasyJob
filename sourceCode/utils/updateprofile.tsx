import axios from 'axios';
import apiName, { BASEURL } from '../Api/apiName';

// Function to update job seeker profile
export const updateJobSeekerProfile = async (userData, name, email, selectedGender, selectedDate, address, alternateMobileNumber, HeaderToken) => {
  const url = `${BASEURL}${apiName.EDIT_PROFILE_JobSEEKER}`;

  try {
    const token = HeaderToken;
    const data = {
      name,
      email,
      gender: selectedGender,
      DOB: selectedDate,
      address,
      alterNateNumber: alternateMobileNumber,
      image: userData != null ? userData : y?.image,
    };

    const response = await axios.put(url, data, {
      headers: {
        Authorization: token,
      },
    });

    return response.data; 
  } catch (error) {
    console.error('Error updating job seeker profile:', error);
    throw error; 
  }
};

// Function to update job provider profile
export const updateJobProviderProfile = async (userData, name, email, information, address, mobileNumber, HeaderToken) => {
  const url = `${BASEURL}${apiName.EDIT_CAMPANY_PROFILE}`;

  try {
    const token = HeaderToken;
    const data = {
      companyName: name,
      companyInformation: information,
      companyAddress: address.trim(),
      companyEmail: email.trim(),
      mobileNumber,
      companyLogo: userData != null ? userData : Datafromredux?.companyLogo,
    };

    const response = await axios.put(url, data, {
      headers: {
        Authorization: token,
      },
    });

    return response.data; // Return response data if needed
  } catch (error) {
    console.error('Error updating job provider profile:', error);
    throw error; // Rethrow error to handle in calling component
  }
};
