export default {
    namespaced: true,
    state: {
        carts: [],
      },
      mutations: {
        insert: (state, payload) => {
          state.carts.push({
            id: payload.id,
            title: payload.title,
            cover: payload.cover,
            price: payload.price,
            weight: payload.weight,
            quantity: 1,
          })
        },
        update: (state, payload) => {
          // mendeteksi payload ada di index keberapa
          let idx = state.carts.indexOf(payload);
          state.carts.splice(idx,1, {
            id: payload.id,
            title: payload.title,
            cover: payload.cover,
            price: payload.price,
            weight: payload.weight,
            quantity: payload.quantity,
          });
    
          if (payload.quantity <= 0) {
            // menhapus item carts jika quantity-nya nol
            state.carts.splice(idx, 1)
          }
        },
        // batch update carts
        set: (state, payload) => {
          state.carts = payload
        },
      },
      actions: {
        add: ({state, commit}, payload) => {
          // mendeteksi apakah data yang diinput ada pada carts
          let cartItem = state.carts.find(item => item.id === payload.id)
          // jika tidak ada maka mutation insert dijalankan
          if (!cartItem) {
              commit('insert', payload)
          }
          // jika ada maka mutation update dijalankan
          else {
            cartItem.quantity++
            commit('update', cartItem)
          }
        },
        // menghapus cart pada item tertentu
        remove: ({state, commit}, payload) => {
          let cartItem = state.carts.find(item => item.id === payload.id)
          if (cartItem) {
            cartItem.quantity--
            commit('update', cartItem)
          }
        },
        // batch update carts
        set: ({commit}, payload) => {
          commit('set', payload)
        },
      },
      getters: {
        carts : state => state.carts,
        count : (state) => {
            return state.carts.length
        },
        // menghitung total harga
        totalPrice: (state) => {
          let total = 0
          state.carts.forEach((cart) => {
            total += cart.price * cart.quantity
          })

          return total
        },
        // total jumlah barang
        totalQuantity: (state) => {
          let total = 0
          state.carts.forEach((cart) => {
            total += cart.quantity
          })

          return total
        },
        // total berat barang
        totalWeight: (state) => {
          let total = 0
          state.carts.forEach((cart) => {
            total += cart.weight
          })

          return total
        }
      }
}