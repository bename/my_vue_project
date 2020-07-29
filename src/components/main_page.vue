<template>
  <div >
    <div class="search_container">
      <v-text-field clearable append-icon="search" label="Search" outline v-model="search_input"></v-text-field>
      <v-btn @click="get_stock(search_input)">Serach</v-btn>
      <v-btn @click="sort_col('price')">Sort price</v-btn>
    </div>

    <table id='stock_table'>
      <thead>
        <tr>
          <th v-for="head in headers">{{head}}</th>
        </tr>
      </thead>
      <tr v-for="row in table_data">
        <td>{{row.symbol}}</td>
        <td>{{row.size}}</td>
        <td>{{row.price}}</td>
        <td>{{get_time_by_epoch(row.time)}}</td>
        <td><v-icon @click="remove_row(row.symbol)">delete</v-icon></td>
        
      </tr>
    </table>
  </div>
</template>

<script>
  import {make_server_request} from '../request_manager'
  export default {
    data: () => ({
      search_input: '',
      table_data: [],
      headers: ['Symbol','Size','Price','Time', 'remove']
    }),

  beforeMount(){
    this.get_data_from_storage()
  },

  methods:{
    get_stock: function(stock) {
      make_server_request('get_stock', {stock: stock}).then((response)=>{
        if(response.data.length > 0){
          for(let row in response.data){
                this.table_data.push(response.data[row])
          }
          this.update_storage();
        }
      })
    },
    sort_col: function(header){
      this.table_data.sort(function(a, b){
        if (a[header] > b [header]) return 1;
        if (a[header] < b [header]) return -1;

        return 0;
    })
  },
  get_time_by_epoch: function(epoch){
    var a = new Date(epoch);
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  },
  remove_row: function(symbol_to_remove){
    for(let row in this.table_data){
      if(this.table_data[row].symbol == symbol_to_remove){
        this.table_data.splice(row,1);
        this.update_storage();
        break;
      }
    }
  },
  update_storage: function(){
    localStorage.setItem('table_data', JSON.stringify(this.table_data));
  },

  get_data_from_storage: function(){
    let stored_data = localStorage.getItem('table_data')
    if(stored_data){
      let parsed_data = JSON.parse(localStorage.getItem('table_data'))
      for(let row in parsed_data){
        this.table_data.push(parsed_data[row])
      }
    }
  }
}

  };
</script>
<style>
.search_container{
  position: relative;
  width: 400px;
  margin: 50px auto;
}

#stock_table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 70%;
  margin: 0 auto;
}

#stock_table td, #stock_table th {
  border: 1px solid #ddd;
  padding: 8px;
}

#stock_table tr:nth-child(even){background-color: #f2f2f2;}

#stock_table tr:hover {background-color: #ddd;}

#stock_table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}


</style>