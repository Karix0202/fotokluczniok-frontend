import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

function endpoint(url) {
  return `http://127.0.0.1:8000/api/${url}`;
}

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    apiUrl: 'http://127.0.0.1:8000/api/',
    lastSectionId: localStorage.getItem('last_section_id') || 0,
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    },
    changeLastSectionId(state, id) {
      state.lastSectionId = id;
    },
  },
  actions: {
    changeLastSectionId(context, credentials) {
      return new Promise((resolve) => {
        localStorage.setItem('last_section_id', credentials.id);
        context.commit('changeLastSectionId', credentials.id);

        resolve({ id: credentials.id });
      });
    },
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post(endpoint('auth/login'), {
          email: credentials.email,
          password: credentials.password,
        })
          .then((resp) => {
            const token = resp.data.access_token;

            localStorage.setItem('access_token', token);
            context.commit('retrieveToken', token);

            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    destroyToken(context) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.post(endpoint('auth/logout'))
          .then((resp) => {
            localStorage.removeItem('access_token');
            context.commit('destroyToken');

            resolve(resp);
          })
          .catch((err) => {
            localStorage.removeItem('access_token');
            context.commit('destroyToken');

            reject(err);
          });
      });
    },
    getPhotographyGroups() {
      return new Promise((resolve, reject) => {
        axios.post(endpoint('group'))
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    createPhotographyGroup(context, credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.post(endpoint('group/create'), {
          name: credentials.name,
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deletePhotographyGroup(context, credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.delete(endpoint(`group/delete/${credentials.id}`))
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getPhotographyGroup(context, credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.post(endpoint(`group/get/${credentials.id}`))
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updatePhotographyGroup(context, credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.put(endpoint(`group/update/${credentials.id}`), { name: credentials.name })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getGalleries(context) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.post(endpoint('gallery/all'))
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    createGallery(context, credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.post(endpoint('gallery/create'), { name: credentials.name, private: credentials.private })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getGallery(context, credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.post(endpoint(`gallery/get/${credentials.id}`))
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deleteGallery(context, credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.delete(endpoint(`gallery/delete/${credentials.id}`))
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deleteImages(context, credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.post(endpoint('image/delete'), { images: credentials.images })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    createFile(context, credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.post(endpoint(`file/create/${credentials.id}`), { name: credentials.name, link: credentials.link })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deleteFiles(context, credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.post(endpoint('file/delete'), { files: credentials.files })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    loadIndexData() {
      return new Promise((resolve, reject) => {
        axios.post(endpoint(''))
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    createPhotography(context, credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('thumbnail', credentials.thumbnail);
        formData.append('name', credentials.name);
        formData.append('description', credentials.description);
        formData.append('photography_group_id', credentials.photographyGroup);

        axios.post(endpoint('photography/create'), formData)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getPhotographies(context) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.post(endpoint('photography'))
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deletePhotographies(context, credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.delete(endpoint(`photography/delete/${credentials.id}`))
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getPhotography(context, credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.post(endpoint(`photography/get/${credentials.id}`))
          .then((resp) => { resolve(resp); })
          .catch((err) => { reject(err); });
      });
    },
    assignGalleries(context, credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.post(endpoint(`photography/assign/${credentials.id}`), { galleries: credentials.galleries })
          .then((resp) => { resolve(resp); })
          .catch((err) => { reject(err); });
      });
    },
    deassignGallery(context, credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.put(endpoint(`gallery/deassign/${credentials.id}`))
          .then((resp) => { resolve(resp); })
          .catch((err) => { reject(err); });
      });
    },
    sectionCreate(context, credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        const formData = new FormData();

        formData.append('galleries', credentials.galleries);
        formData.append('description', credentials.description);
        formData.append('type', credentials.type);
        credentials.images.forEach((image) => {
          formData.append('images[]', image, image.name);
        });

        axios.post(endpoint(`section/create/${credentials.id}`), formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((resp) => { resolve(resp); })
          .catch((err) => { reject(err); });
      });
    },
    deleteSection(context, credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;

      return new Promise((resolve, reject) => {
        axios.delete(endpoint(`section/delete/${credentials.id}`))
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
    getApiToken(state) {
      return state.token;
    },
    getApiUrl(state) {
      return state.apiUrl;
    },
    getLastSectionId(state) {
      return state.lastSectionId;
    },
  },
});
