<template>
  <div class="movie_body">
    <ul>
      <li v-for="item in comingSoonList" :key="item.id">
        <div class="pic_show"><img :src="item.img | setWH(128, 180)" /></div>
        <div class="info_list">
          <h2>{{item.nm}} <img v-if="item.version" :src="item.version | versionType"/></h2>
          <p><span class="person">{{item.wish}}</span> 人想看</p>
          <p>主演: {{item.star}}</p>
          <p>{{item.rt}}上映</p>
        </div>
        <div class="btn_pre">预售</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'ComingSoon',
    data() {
      return {
        comingSoonList: []
      }
    },
    mounted() {
//       comingTitle: "10月5日 周一"
// globalReleased: false
// haspromotionTag: false
// id: 1336822
// img: "http://p1.meituan.net/w.h/movie/828d68173a64a721d54a61be167a9c864358691.jpg"
// nm: "再见吧！少年"
// preShow: false
// rt: "2020-10-05"
// sc: 0
// showInfo: "今天5家影院放映5场"
// showst: 4
// star: "刘敏涛,荣梓杉,谭凯"
// version: ""
// wish: 26347

      this.$axios.get('/ajax/comingList?ci=10&token=&limit=10&optimus_uuid=BEDC8590053911EB9A5577ABB602C988CEF95AB0B1994C41A216B22F0A914DCB&optimus_risk_level=71&optimus_code=10').then(res => {
        if(res.status == 200){
          console.log(res)
          this.comingSoonList = res.data.coming
          // this.comingSoonList = this.comingSoonList.map(item=>{
          //   item.img = item.img.replace('w.h/', '') + '@1l_1e_1c_128w_180h'
          //   return item
          // })
        }
      })
    }
};
</script>

<style lang="scss" scoped>
.movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>