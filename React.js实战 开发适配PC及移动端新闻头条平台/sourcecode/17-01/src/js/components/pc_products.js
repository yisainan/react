import React from 'react';

export default class PCProduct extends React.Component{
  render(){
    return(
      <div className="area-sub" style={{overflow: 'visible'}}>
          {/* product.html start */}
          <div id="layout-product" className="m-box ui-style-gradient mb12">
            <div id="js_changeView" className="box-bd clearfix" data-module-name="n_product">
              <div className="productlinks clearfix" style={{overflow: 'visible'}}>
                <div className="productlinks-item item-mail">
                  <strong className><a className="productlinks-i-mail" href="http://email.163.com/">邮箱</a></strong>
                  <span className="productlinks-mail-warp js_N_navSelect">
                    <a href="http://email.163.com/#from=ntes_product">免费邮</a>
                    <div className="productlinks-mail-fold">
                      <a href="http://mail.163.com/#from=ntes_product" className="productlinks-fold-163">163邮箱</a>
                      <a href="http://mail.126.com/#from=ntes_product" className="productlinks-fold-126">126邮箱</a>
                      <a href="http://www.yeah.net/#from=ntes_product" className="productlinks-fold-yeah">yeah邮箱</a>
                      <a href="http://mail.163.com/index.htm#tab=tab2&from=ntes_product" className="productlinks-fold-mob">免费注册手机帐号</a>
                    </div>
                  </span> <a href="http://vipmail.163.com/#from=www">VIP邮箱</a> <a href="http://qiye.163.com/">企业邮箱</a> <a href="http://mail.163.com/client/dl.html?from=mail46">邮箱大师</a> <a href="http://yixin.im" className="last">易信</a>
                </div>
                <div className="productlinks-item item-game">
                  <strong className><a href="http://nie.163.com/" className="productlinks-i-game">游戏</a></strong>
                  <a href="http://xyq.163.com/">梦幻西游</a> <a href="http://my.163.com/">梦幻西游手游</a> <a href="http://xy2.163.com/">新大话2</a> <a href="http://x3.163.com/">新大话3</a> <a href="http://dhxy.163.com/">大话西游手游</a> <a href="http://qnm.163.com/" className="pr0">倩女幽魂手游</a> <a href="http://xqn.163.com/fab/" className="pr0">新倩女幽魂</a> <a href="http://www.warcraftchina.com/" className="pr0">魔兽世界</a> <a href="http://wh2.163.com/" className="pr0">武魂2</a> <a href="http://ow.blizzard.cn/" className="pr0">守望先锋</a> <a href="http://tx3.163.com/" className="pr0">天下3</a> <a href="http://dt2.163.com/" className="pr0">大唐无双零</a> <a href="http://tianyu.163.com/">天谕</a> <a href="http://bw.163.com/">西楚霸王</a><a href="http://zmq.163.com/">镇魔曲</a> <a href="http://9.163.com/">炉石传说</a> <a href="http://stzb.163.com/" className="last">率土之滨</a>
                </div>
                <div className="productlinks-item item-sns">
                  <strong className><a href="http://sitemap.163.com/" className="productlinks-i-sns">社区</a></strong>
                  <a href="http://rd.da.netease.com/redirect?t=VGa7BN&p=ve4u5l&proId=1024&target=http%3A%2F%2Fwww.kaola.com%2F%3Ftag%3Dbe3d8d027a530881037ef01d304eb505" className="pr0">考拉海购</a> <a href="http://www.lofter.com/?act=qb163rk_20141031_12" style={{fontFamily: 'Arial', paddingRight: 0}}>LOFTER</a> <a href="http://blog.163.com/?fromService" className="pr0">博客</a> <a href="http://cc.163.com/" className="pr0">CC语音</a> <a href="http://www.bobo.com/" className="pr0">BoBo直播</a> <a href="http://y.163.com/download/index?from=wscp" className="pr0">美聊</a> <a href="http://tie.163.com/" className="pr0">跟贴</a> <a href="http://rd.da.netease.com/redirect?t=f9vnCt&p=fvxKel&proId=1140&target=http%3A%2F%2Fwww.xiupin.com%2F" className="pr0">秀品</a> <a href="http://photo.163.com/" className="pr0">相册</a> <a href="http://love.163.com/?from=wscp" className="pr0">花田</a> <a href="http://yuehui.163.com/?from=wscp" className="pr0">约会</a> <a href="http://manhua.163.com/" className="pr0">漫画</a> <a href="http://x.163.com?source=163webproduct" className="last">青果</a>
                </div>
                <div className="productlinks-item item-recommend">
                  <strong className><a href="http://sitemap.163.com/" className="productlinks-i-recommend">推荐</a></strong>
                  <a href="http://888.163.com/?from=tgnh2">1元购</a> <a href="https://i.epay.126.net/a/8a/static/188activity.html?utm_source=163&utm_medium=recommend_pc&utm_campaign=1888cashfest&mmd=163&mpl=recommend_pc&mkw=1888cashfest">理财</a> <a href="https://pop.lmlc.com/web/activity/practice/index.html?from=tgn163productlist2">赚钱</a> <a href="http://fa.163.com/?from=tgn163cp">贵金属</a> <a href="http://caipiao.163.com/#from=www" className="pr0">彩票</a> <a href="http://baoxian.163.com/car/?from=wycp" className="pr0">车险</a> <a href="http://qian.163.com/" className="pr0">有钱</a> <a href="http://cidian.youdao.com/">有道词典</a> <a href="http://fanyi.youdao.com/?vendor=163homepage">翻译</a> <a href="http://note.youdao.com/?vendor=163index" className="pr0">云笔记</a> <a href="http://yxp.163.com/" className="pr0">印像派</a> <a href="http://open.163.com/" className="pr0">公开课</a> <a href="http://you.163.com?from=web_in_wyshouye" className="last">严选</a> <a href="http://study.163.com/?utm_source=163.com&utm_medium=web_productlist&utm_campaign=business" className="pr2">云课堂</a> <a href="http://yuedu.163.com" className="pr2">云阅读</a> <a href="http://music.163.com/#f=index_productlist" className="pr2">云音乐</a> <a href="http://trip.163.com/" className="pr0">火车票</a> <a href="http://mall.163.com/?from=mmwww" className="pr0">商城</a> <a href="http://gzy.mail.163.com/?from=163product" className="pr0">公正邮</a> <a href="http://1.163.com/?from=portal163cp">1元夺宝</a> <a href="http://i.money.163.com/?imb1" className="pr0">财经客户端</a> <a href="http://www.163.com/newsapp/" className="pr0">新闻客户端</a> <a href="http://www.icourse163.org/?utm_source=163.com&utm_medium=web_productlist&utm_campaign=business" className="last">大学MOOC</a>
                </div>
                <div className="productlinks-item item-sns">
                  <strong className><a href="http://sitemap.163.com/" className="productlinks-i-sns">社区</a></strong>
                  <a href="http://rd.da.netease.com/redirect?t=VGa7BN&p=ve4u5l&proId=1024&target=http%3A%2F%2Fwww.kaola.com%2F%3Ftag%3Dbe3d8d027a530881037ef01d304eb505" className="pr0">考拉海购</a> <a href="http://www.lofter.com/?act=qb163rk_20141031_12" style={{fontFamily: 'Arial', paddingRight: 0}}>LOFTER</a> <a href="http://blog.163.com/?fromService" className="pr0">博客</a> <a href="http://cc.163.com/" className="pr0">CC语音</a> <a href="http://www.bobo.com/" className="pr0">BoBo直播</a> <a href="http://y.163.com/download/index?from=wscp" className="pr0">美聊</a> <a href="http://tie.163.com/" className="pr0">跟贴</a> <a href="http://rd.da.netease.com/redirect?t=f9vnCt&p=fvxKel&proId=1140&target=http%3A%2F%2Fwww.xiupin.com%2F" className="pr0">秀品</a> <a href="http://photo.163.com/" className="pr0">相册</a> <a href="http://love.163.com/?from=wscp" className="pr0">花田</a> <a href="http://yuehui.163.com/?from=wscp" className="pr0">约会</a> <a href="http://manhua.163.com/" className="pr0">漫画</a> <a href="http://x.163.com?source=163webproduct" className="last">青果</a>
                </div>
                <div className="productlinks-item item-recommend">
                  <strong className><a href="http://sitemap.163.com/" className="productlinks-i-recommend">推荐</a></strong>
                  <a href="http://888.163.com/?from=tgnh2">1元购</a> <a href="https://i.epay.126.net/a/8a/static/188activity.html?utm_source=163&utm_medium=recommend_pc&utm_campaign=1888cashfest&mmd=163&mpl=recommend_pc&mkw=1888cashfest">理财</a> <a href="https://pop.lmlc.com/web/activity/practice/index.html?from=tgn163productlist2">赚钱</a> <a href="http://fa.163.com/?from=tgn163cp">贵金属</a> <a href="http://caipiao.163.com/#from=www" className="pr0">彩票</a> <a href="http://baoxian.163.com/car/?from=wycp" className="pr0">车险</a> <a href="http://qian.163.com/" className="pr0">有钱</a> <a href="http://cidian.youdao.com/">有道词典</a> <a href="http://fanyi.youdao.com/?vendor=163homepage">翻译</a> <a href="http://note.youdao.com/?vendor=163index" className="pr0">云笔记</a> <a href="http://yxp.163.com/" className="pr0">印像派</a> <a href="http://open.163.com/" className="pr0">公开课</a> <a href="http://you.163.com?from=web_in_wyshouye" className="last">严选</a> <a href="http://study.163.com/?utm_source=163.com&utm_medium=web_productlist&utm_campaign=business" className="pr2">云课堂</a> <a href="http://yuedu.163.com" className="pr2">云阅读</a> <a href="http://music.163.com/#f=index_productlist" className="pr2">云音乐</a> <a href="http://trip.163.com/" className="pr0">火车票</a> <a href="http://mall.163.com/?from=mmwww" className="pr0">商城</a> <a href="http://gzy.mail.163.com/?from=163product" className="pr0">公正邮</a> <a href="http://1.163.com/?from=portal163cp">1元夺宝</a> <a href="http://i.money.163.com/?imb1" className="pr0">财经客户端</a> <a href="http://www.163.com/newsapp/" className="pr0">新闻客户端</a> <a href="http://www.icourse163.org/?utm_source=163.com&utm_medium=web_productlist&utm_campaign=business" className="last">大学MOOC</a>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  };
}
