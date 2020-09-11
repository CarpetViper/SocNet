import * as axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
     //'API-KEY':'41ba3a3d-1e56-41b5-9dfc-41a242896377',
     //'API-KEY':'64ca6c0c-d2d3-472c-b42a-f2849c27004e'
     //'API-KEY':'d5badcff-fae6-4f62-a7bf-7da5c9b14673',
     //'API-KEY':'981bfc6a-0b82-4119-ab34-06295e1e45be',
     //'API-KEY':'446079b3-5e5d-43f9-b313-b5795acbab19'
    'API-KEY':'e7177fed-4f56-4f21-8042-3483c6f061a1' // drivechannel@yahoo.com
    //'API-KEY':'af70c230-994a-4bb9-8321-3753352671ff' // temir_jm@yahoo.com
    //'API-KEY':'80d0d2a9-8a06-482c-8ff0-516917965ccc' //janybekmasud@yahoo.com
          //'API-KEY':''                                    //enter.channel@yahoo.com
  }
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    .then(response => {
    return response.data;
    });
  },
  getProfile(userId) {
    console.warn('Obsolete method. Please use profileAPI object')
    return profileAPI.getProfile(userId);
  }
}

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status) {
    return instance.put(`profile/status`, {status: status});
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append('image', photoFile);

    return instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  saveProfile(profile) {
    return instance.put(`profile`, profile);
  }
}

export const authAPI = {
  me() {
      return instance.get(`auth/me`);
  },
  login(email, password, rememberMe = false, captcha = null) {
      return instance.post(`auth/login`, {email, password, rememberMe, captcha});
  },
  logout() {
      return instance.delete(`auth/login`);
  }
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  }
}
