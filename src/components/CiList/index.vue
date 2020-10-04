<template>
  <div class="cinema_body">
    <ul ref="con">
      <li v-for="cinema in cinemas" :key="cinema.key">
        <div>
          <span>{{cinema.name}}</span>
          <span class="q"><span class="price">{{cinema.latitude.toFixed(1)}}</span> 元起</span>
        </div>
        <div class="address">
          <span>{{cinema.address}}</span>
          <span>1763.5km</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li>
      <!-- <li>
        <div>
          <span>大地影院(澳东世纪店)</span>
          <span class="q"><span class="price">22.9</span> 元起</span>
        </div>
        <div class="address">
          <span>金州区大连经济技术开发区澳东世纪3层</span>
          <span>1763.5km</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li>
      <li>
        <div>
          <span>大地影院(澳东世纪店)</span>
          <span class="q"><span class="price">22.9</span> 元起</span>
        </div>
        <div class="address">
          <span>金州区大连经济技术开发区澳东世纪3层</span>
          <span>1763.5km</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li>
      <li>
        <div>
          <span>大地影院(澳东世纪店)</span>
          <span class="q"><span class="price">22.9</span> 元起</span>
        </div>
        <div class="address">
          <span>金州区大连经济技术开发区澳东世纪3层</span>
          <span>1763.5km</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li>
      <li>
        <div>
          <span>大地影院(澳东世纪店)</span>
          <span class="q"><span class="price">22.9</span> 元起</span>
        </div>
        <div class="address">
          <span>金州区大连经济技术开发区澳东世纪3层</span>
          <span>1763.5km</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li>
      <li>
        <div>
          <span>大地影院(澳东世纪店)</span>
          <span class="q"><span class="price">22.9</span> 元起</span>
        </div>
        <div class="address">
          <span>金州区大连经济技术开发区澳东世纪3层</span>
          <span>1763.5km</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: "CiList",
  data() {
    return {
      cinemas: []
    }
  },
  mounted() {
    // https://m.maizuo.com
//     Distance: 1.460982073799317
// address: "北京市西城区前门煤市街北京坊C1区，B1\B2层"
// businessTime: "09:00-23:00"
// cinemaId: 1701
// cityId: 110100
// cityName: "北京市"
// district: {districtId: 110102, name: "西城区"}
// districtId: 110102
// districtName: "西城区"
// eTicketFlag: 1
// gpsAddress: "116.40084880851147:39.90288663866534"
// isVisited: 0
// latitude: 39.90288663866534
// logoUrl: "https://pic.maizuo.comusr/1701/6f7ceb05dc004a2dc145a114c36bf25c.jpg"
// longitude: 116.40084880851147
// lowPrice: 5000
// name: "保利国际影城北京天安门店"
// notice: ""
// phone: "010-63015188"
// seatFlag: 1
// telephones: ["010-63015188"]
    this.$axios({
      url: '/gateway?cityId=110100&ticketFlag=1&k=3324219',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16016335701208311739318273","bc":"110100"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      console.log(res.data.data.cinemas)
      this.cinemas = res.data.data.cinemas
    })
  }
};
</script>

<style lang="scss" scoped>
.cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>