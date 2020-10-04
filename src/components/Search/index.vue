<template>
  <div class="search_body">
    <div class="search_input">
      <div class="search_input_wrapper">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" v-model="keyWord" />
      </div>
    </div>
    <div class="search_result">
      <h3>电影/电视剧/综艺</h3>
      <ul>
        <li v-for="item in movies" :key="item.id">
          <div class="img"><img :src="item.img | setWH(60, 84)" /></div>
          <div class="info">
            <p>
              <span>{{ item.nm }}</span
              ><span>{{ item.sc }}</span>
            </p>
            <p>
              <span>{{ item.enm }}</span
              ><img v-if="item.version" :src="item.version | versionType" />
            </p>
            <p>{{ item.cat }}</p>
            <p>{{ item.rt }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      keyWord: "",
      movies: [],
      cinemas: [],
    };
  },
  methods: {
    // 防抖
    cancelReq() {
      if (typeof this.source === "function") {
        this.source("终止请求");
      }
    },
  },
  // 搜索可以通过watch也可以监听输入框的input事件
  watch: {
    keyWord(value) {
      // 取消上一次请求
      this.cancelReq()
      this.movies = []
      this.cinemas = []

      this.$axios
        .get(`/ajax/search?kw=${value}&cityId=10&stype=-1`, {
          cancelToken: new this.$axios.CancelToken((c) => {
            this.source = c;
          }),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.movies && res.data.movies.list.length)
              this.movies = res.data.movies.list;
            if (res.data.cinemas && res.data.cinemas.list.length)
              this.cinemas = res.data.cinemas.list;
            // this.movies = movies.map(item=>{
            //   item.img = item.img.replace('w.h/', '') + '@1l_1e_1c_128w_180h'
            //   return item
            // })
          }
        })
        .catch((err) => {
          if (this.$axios.isCancel(err)) {
            // 请求如果被取消，这里返回取消请求的信息
            console.log("Rquest canceled", err.message);
          } else {
            console.log(err);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.search_body {
  flex: 1;
  overflow: auto;
}
.search_body .search_input {
  padding: 8px 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
.search_body .search_input_wrapper {
  padding: 0 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  line-height: 20px;
}
.search_body .search_input_wrapper i {
  font-size: 16px;
  padding: 4px 0;
}
.search_body .search_input_wrapper input {
  border: none;
  font-size: 13px;
  color: #333;
  padding: 4px 0;
  outline: none;
  margin-left: 5px;
  width: 100%;
}
.search_body .search_result {
}
.search_body .search_result h3 {
  font-size: 15px;
  color: #999;
  padding: 9px 15px;
  border-bottom: 1px solid #e6e6e6;
}
.search_body .search_result ul {
}
.search_body .search_result li {
  border-bottom: 1px #c9c9c9 dashed;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
}
.search_body .search_result .img {
  width: 60px;
  float: left;
}
.search_body .search_result .img img {
  width: 100%;
}
.search_body .search_result .info {
  float: left;
  margin-left: 15px;
  flex: 1;
}
.search_body .search_result .info p {
  height: 22px;
  display: flex;
  line-height: 22px;
  font-size: 12px;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1) {
  font-size: 18px;
  flex: 1;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2) {
  font-size: 16px;
  color: #fc7103;
}
.search_body .search_result .info p:nth-of-type(2) {
  align-items: center;
}
.search_body .search_result .info p:nth-of-type(2) span {
  flex: 1;
}
.search_body .search_result .info p:nth-of-type(2) img {
  width: 50px;
  height: 16px;
}
</style>