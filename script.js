// let header = document.querySelector('header');
// let section = document.querySelector('section');

// function getData(){
//     const axios = require('axios');
//     const url = "http://localhost:8080";
//     axios.get(url).then(response => {

//         this.results = response.data
//         console.log(response.data)
//         });
// };
// getData();
const url = "http://localhost:8080";
const vm = new Vue({
  el: "#app",
  //Mock data for the value of BTC in USD
  data() {
    return {
      person: [],
      pageSize: 3,
      pageNumber: 0,
      edit: false,
      size: 10,
      search: "",
      newPerson: [ id= "", name= "", email= "", funds="", city= "", phone= ""] 
    };
  },
  mounted() {
    axios
      .get(url)
      .then(response => (this.person = response.data.data))
      .catch(error => console.log(error));
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    page(number) {
      this.pageNumber = number;
    },
   
    editItem(newPerson) {
      console.log(this.person);
      const str = JSON.stringify(this.person);
      axios
        .post(url, str)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.person.length / this.size);
    },
    filteredRow: function() {
      return this.person.filter(item => {
        for (var key in item) {
          if (String(item[key]).indexOf(this.search) !== -1) {
            return true;
          }
        }
        return false;
      });
    },
    paginatedData() {
      let start = this.pageNumber * this.size;
      let end = start + this.size;
      return this.filteredRow.slice(start, end);
    }
  }
});
