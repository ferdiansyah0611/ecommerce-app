import { createStore } from 'vuex'
import {db, storage} from '@/firebase'

export default createStore({
  state: {
	cart: [],
  item: []
  },
  mutations: {
    addCart(state, data){
      state.cart = [...state.cart, data]
    },
    updateCart(state, data){
      state.cart = [...state.cart, data]
    },
    removeCart(state, id){
      state.cart = state.cart.filter((data) => data.id !== id)
    },
    addData(state, data){
      state[data.name] = [...state[data.name], data.data]
    },
    createProduct(state, data){
      let add, filePreview, listFilePreview = []
      add = db.collection('products').doc()
      filePreview = () => {
        if(data.imgPreview.length >= 1){
          data.imgPreview.forEach((data) => {
            const upload = storage.ref(`/images/${data.name}`).put(data)
            upload.on('state_changed', status => {
              var progress = (status.bytesTransferred / status.totalBytes) * 100;
              console.log('Progress ' + progress + '%')
            }, e => console.log(e), () => {
              upload.snapshot.ref.getDownloadURL().then(function(url) {
                listFilePreview.push(url)
              })
            })
          })
        }
      }
      filePreview()
      add.set({
        id: add.id,
        name: data.name,
        price: data.price,
        stock: data.stock,
        img: data.img,
        categories: data.categories,
        imgPreview: listFilePreview,
        created: db.FieldValue.serverTimestamp()
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
