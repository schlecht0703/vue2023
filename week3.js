let productModal = null;
let delProductModal = null;

const app = Vue.createApp({
    data() {
        return {
             apiUrl: 'https://vue3-course-api.hexschool.io/v2',
             apiPath: 'schlecht0703',
             products: [],
             isNew: false,
             tempProduct: {
             imagesUrl: [],
      }, 
        }
    },
    methods: {
         checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios.post( url )
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message)
          window.location = 'login.html';
        })
    },
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios.get(url)
      .then((response) => {
        this.products = response.data.products;
      }).catch((err) => {
        alert(err.response.data.message);
      })
    },
 updateProduct() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let http = 'post';

      if (!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        http = 'put'
      }

      axios[http](url, { data: this.tempProduct }).then((response) => {
        alert(response.data.message);
        productModal.hide();
        this.getData();
      }).catch((err) => {
        alert(err.response.data.message);
      })
    },
    openModal(isNew, item) {
      if (isNew === 'new') {
        this.tempProduct = {
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
    delProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

      axios.delete(url).then((response) => {
        alert(response.data.message);
        delProductModal.hide();
        this.getData();
      }).catch((err) => {
        alert(err.response.data.message);
      })
    },
     createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
    },
      mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin(); 
  productModal = new bootstrap.Modal(document.getElementById('productModal'), 
  { keyboard: false  });

    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    });  
  },
})
app.mount('#app');