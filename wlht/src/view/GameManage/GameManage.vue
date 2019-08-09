<template>
    <div class="game_content-wrapper">
      <!-- Main content -->
      <section class="content">
        <div class="error-page">
          <!-- <h2 class="headline text-yellow">404</h2> -->
          <img src="../../assets/img/header_img.jpg" alt="">
          <div class="error-content">
            <p>
              此功能暂未开放
            </p>

          </div>
          <!-- /.error-content -->
        </div>
        <!-- /.error-page -->
      </section>
      <!-- /.content -->
    </div>
</template>

<script>
export default {
  name: "GameManage"
};
</script>

<style scoped lang="scss">
.game_content-wrapper{
    section{
            min-height: 2.5rem;
            padding: .15rem;
            margin-right: auto;
            margin-left: auto;
            padding-left: .15rem;
            padding-right: .15rem;
            .error-page{
                      width: 50%;
                      margin: 20% auto;
                      display: flex;
                      img{
                        height: 1.5rem;
                      }
                    h2{
                        float: left;
                        font-size: 1rem;
                        color: #f39c12;
                        font-weight: 300;
                    }
                    .error-content{
                        margin-left: .6rem;
                        line-height: 1.5rem;
                        display: block;
                        p{
                            font-size: .3rem;
                        }
                    }
            }
    }
}
</style>
