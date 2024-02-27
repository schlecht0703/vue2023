

let productModal = null;
let delProductModal = null;
const apiPath = 'schlecht0703';
const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const productsAPI = `${apiUrl}/api/${apiPath}/products/all`;
const checkAPI = `${apiUrl}/api/user/check`;

const app = Vue.createApp({
  data ( ) {
    return {
      isNew: false,
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
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
    },
    openModal(isNew, item) {
      if (isNew === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        productModal.show();
      } else if (isNew === 'edit') {
        this.tempProduct = { ...item };
        this.isNew = false;
        productModal.show();
      } else if (isNew === 'delete') {
        this.tempProduct = { ...item };
        delProductModal.show()
      }
    },
mounted() {
    // 取出 Token
const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
  axios.defaults.headers.common['Authorization'] = token;
   this.checkLogin();
   
  //  bs實體化
  this.productModal = new bootstrap.Modal(
      document.getElementById('productModal'),
      {
        keyboard: false,
        backdrop: 'static'
      }
    );
    this.delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    });
  }
}}).mount('#app');

