
const apiPath = 'schlecht0703';
const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const productsAPI = `${apiUrl}/api/${apiPath}/products/all`;
const checkAPI = `${apiUrl}/api/user/check`;

const app = Vue.createApp({
  data ( ) {
    return {
      products: [],
      tempProduct: {},
    };
    
  },
  methods: {
    //驗證 
    checkLogin(){
      axios.post(checkAPI)
      .then((res) => { 
        console.log('驗證成功');
        this.getProduct(res);
      })
      .catch((err) => {
        // 驗證失敗 alert
        alert(err.data.message);
        // 跳至登入頁面
        location.href = 'login.html';
      })
    },
    getProduct() {
      axios.get(productsAPI)
        .then((res)=>{
          console.log(res);
          this.products = res.data.products;
        })
      }
    },
    checkDetail(id) {
            this.tempProduct = this.products.find(item => item.id === id);
        },
        showImage(id){
            this.tempProduct.imageUrl = this.tempProduct.imageUrl[id]
        },
    
  mounted() {
    // 取出 Token
const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
  axios.defaults.headers.common['Authorization'] = token;
   this.checkLogin();
  }
});
app.mount("#app");
