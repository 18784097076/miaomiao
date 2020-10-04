<template>
  <div class="city_body">
    <div class="city_list">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li>上海</li>
          <li>北京</li>
          <li>上海</li>
          <li>北京</li>
          <li>上海</li>
          <li>北京</li>
          <li>上海</li>
          <li>北京</li>
        </ul>
      </div>
      <div class="city_sort" ref="city_sort">
        <div v-for="(cityList, letter) in cityDataObj" :key="letter">
          <h2>{{letter}}</h2>
          <ul>
            <li v-for="city in cityList" :key="city.id">{{city.nm}}</li>
          </ul>
        </div>  
      </div>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(cityList, letter) in cityDataObj" :key="letter" @click="goLetter(letter)">{{letter}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: 'City',
    // async created () {
    //     this.cityList = await this.$axios.get('https://m.maoyan.com/dianying/cities.json')
    // }
    data() {
      return {
        cityDataObj: null
      }
    },
    mounted() {
      this.$axios.get('/dianying/cities.json')
      .then(res=>{
        if(res.status == 200){
          this.cityDataObj = this.formatCityList(res.data.cts)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    methods:{
      // 格式化返回的城市列表数据
      formatCityList(cities){
        let obj = {}
          for(let i = 65;i < 91; i++){
            let letter = String.fromCharCode(i)
            obj[letter] = cities.filter(city=>city.py.startsWith(letter.toLowerCase()))
            if(!obj[letter].length){
              delete obj[letter]
            }
          }
        return obj
      },
      goLetter(letter) {
        // 获取所有的h2
        var h2List = this.$refs.city_sort.getElementsByTagName('h2')
        for(let i=0;i<h2List.length;i++){
          // h2的内容和传入的字母一致
          if(h2List[i].innerText === letter){
            // 将该字母所在的h2的offsetTop，赋值给滚动容器的scrollTop
            this.$refs.city_sort.parentNode.scrollTop = h2List[i].offsetTop
          }
        }
         
      }
    }
};
</script>

<style lang="scss" scoped>
.city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}

.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}

.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>