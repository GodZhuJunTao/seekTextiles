import React, { Component } from 'react';
import '@/sass/details.scss';
import { Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import axios from 'axios';

import DetailsSpec from './DetailsSpec';
import DetailsPic from './DetailsPic';

function renderTabBar(props) {
    return (<Sticky>
        {({ style }) =>{
            return (<div style={style} className="detail-tab">
                <span>
                    <i className="iconfont icon-zuo" onClick={()=>{
                        this.props.history.goBack();
                    }}></i>
                </span>
                <Tabs.DefaultTabBar {...props} />
                <span>
                    <i className="iconfont icon-7"></i>
                    <i className="iconfont icon-gengduo"></i>
                </span>
            </div>)
        }}

    </Sticky>);
}

class Details extends Component {
    constructor() {
        super();
        this.state = {
            detailTabs: [
                { title: '详情' },
                { title: '图文' },
                { title: '评论' },
            ],
            goodsData:{}
        }

        this.updateGoodsData = this.updateGoodsData.bind(this);
        this.getNewData = this.getNewData.bind(this);
        this.gotoDetail = this.gotoDetail.bind(this);
    }

    getNewData(ids){
        let arr = [];
        let idKey = '';
        for(var key in ids){
            arr.push(ids[key]);
        }
        if(arr.length>1){
            idKey = arr.join('|');
        }else{
            idKey = arr[0];
        }
        let gid = this.state.goodsData.spec_list[idKey].split(':')[0];
        this.updateGoodsData(gid);
    }

    updateGoodsData(gid){
        axios({
            method:'get',
            url:`http://api.zhaojiafang.com/v1/goods/goodsdetail/${gid}`,
            params:{
                AppVersion: '3.11',
                Format: 'json',
                SystemName: 'H5',
                key: '',
                storeid: 1,
                timestamp: 1549200394961,
                Sign: '41665ddf556bc1c012a637a6b180dbc1'
            }
        }).then(res=>{
            let data = res.data.datas;
            this.setState({
                goodsData:data
            })
        }).catch((err)=>{
            console.log(err);
        });
    }

    gotoDetail(gid){
        this.props.history.push('/details/' + gid);
    }


    componentWillMount() {
        let {gid} = this.props.match.params;
        // 请求详情页数据
        this.updateGoodsData(gid);
    }
    componentWillReceiveProps(nextProps) {
        let {gid} = nextProps.match.params;
        console.log(nextProps)
        // 请求详情页数据
        this.updateGoodsData(gid);
    }

    render() {
        return (
            <div className="details">
                <StickyContainer className="det-body">
                    <Tabs tabs={this.state.detailTabs}
                        tabBarInactiveTextColor='#999'
                        tabBarActiveTextColor='#000'
                        renderTabBar={renderTabBar.bind(this)}
                        swipeable={false}
                    >
                        <div className="det-content">
                        {
                            this.state.goodsData.goods_oriimage ?
                            <DetailsSpec goodsData={this.state.goodsData} handleUpdate={this.getNewData} handleToDetail={this.gotoDetail}/> :
                            null
                        }
                        </div>
                        <div className="det-content">
                        {
                            this.state.goodsData.goods_oriimage ?
                            <DetailsPic goods_body={this.state.goodsData.goods_body}/> :
                            null
                        }
                        </div>
                        <div className="det-content">
                            <div className="con-review">
                                <p>该商品暂无评价</p>
                            </div>
                        </div>
                    </Tabs>
                </StickyContainer>
                <div className="det-buttons">
                    <div className="btn-left">
                        <a href="javascript:;">
                            <i className="iconfont icon-shouye"></i>
                            <span>店铺</span>
                        </a>
                        <a href="javascript:;">
                            <i className="iconfont icon-qq"></i>
                            <span>平台客服</span>
                        </a>
                        <a href="javascript:;">
                            <i className="iconfont icon-gouwuche"></i>
                            <span>购物车</span>
                        </a>
                    </div>
                    <div className="btn-right">
                        <a href="javascript:;">加入购物车</a>
                        <a href="javascript:;">立即购买</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;