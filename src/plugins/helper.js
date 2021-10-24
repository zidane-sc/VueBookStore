"use strict"
import Vue from 'vue'

const Helper = {
    install(Vue) {
        Vue.prototype.appName = process.env.VUE_APP_NAME
        Vue.prototype.getImage = function (image) {
            if(image != null && image.length > 0) {
                return process.env.VUE_APP_BACKEND_URL + "/images" + image
            }
            // default image jika tidak ditemukan,
            // letakkan image ini pada folder /public/img di project Vue
            return "/img/unavailable.png"
        }
    }
}

Vue.use(Helper)