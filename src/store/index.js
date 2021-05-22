import { createStore } from 'vuex'
import {db, storage, firebase} from '@/firebase'

export default createStore({
  state: {
    cart: [],
    item: [],
    categories: [],
    pagination: {
      start: 0,
      end: 8
    }
  },
  mutations: {
    getProducts(state, data){
      const products = db.collection('products').orderBy('created', 'desc').endAt(8)
      if(data.reset){
        state.item = []
        products.get().then(res => res.forEach(data => state.item = [...state.item, data.data()]))
      }else{
        products.get().then(res => res.forEach(data => state.item = [...state.item, data.data()]))
      }
    },
    whereProducts(state, data){
      state.item = []
      const products = db.collection('products').where(data.where, '==', data.value).orderBy('created', 'desc').endAt(8)
      products.get().then(res => res.forEach(data => state.item = [...state.item, data.data()]))
    },
    nextProduct(state){
      console.log(state.pagination.start + 8)
      if(!(state.item.length <= 7)){
        const products = db.collection('products').orderBy('created', 'desc').startAt(state.pagination.start += 8).endAt(state.pagination.end += 8)
        products.get().then(res => {
          state.item = []
          res.forEach(data => state.item = [...state.item, data.data()])
        })
      }
    },
    previousProduct(state){
      console.log(state.pagination.start - 8)
      if((state.pagination.start - 8) >= 0){
        const products = db.collection('products').orderBy('created', 'desc').startAt(state.pagination.start -= 8).endAt(state.pagination.end -= 8)
        products.get().then(res => {
          state.item = []
          res.forEach(data => state.item = [...state.item, data.data()])
        })
      }
    },
    getCategory(state, data){
      const categories = db.collection('categories')
      if(data.reset){
        state.categories = []
        categories.get().then(res => res.forEach(data => state.categories = [...state.categories, data.data()]))
      }else{
        categories.get().then(res => res.forEach(data => state.categories = [...state.categories, data.data()]))
      }
    },
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
      const imgupload = storage.ref(`/images/${data.img.name}`).put(data.img)
      imgupload.then(() => {
        imgupload.snapshot.ref.getDownloadURL().then(function(response) {
          data.img = response
          filePreview = () => {
            if(data.imgPreview.length >= 1){
              var keyImgPreview = 0;
              data.imgPreview.forEach((file) => {
                var upload = storage.ref(`/images/${file.name}`).put(file)
                upload.then(() => {
                  upload.snapshot.ref.getDownloadURL().then(function(url) {
                    keyImgPreview += 1
                    listFilePreview = [...listFilePreview, url]
                    if(keyImgPreview === data.imgPreview.length){
                      var product = db.collection('products').doc(add.id)
                      product.update({
                        imgPreview: listFilePreview
                      })
                    }
                  })
                })
              })
              add.set({
                id: add.id,
                name: data.name,
                price: data.price,
                stock: data.stock,
                img: data.img,
                categories: data.categories,
                description: data.description,
                imgPreview: listFilePreview,
                created: firebase.firestore.FieldValue.serverTimestamp()
              })
            }
          }
          filePreview()
        })
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
