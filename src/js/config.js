const CONFIG = {
	cookieKey: 'user',
	api: {
		hBannerUrl: '/src/assets/data/home/banner.json', //首页banner接口地址
		hHotGoodsUrl: '/src/assets/data/home/hotgoods.json', //首页推荐商品接口地址
		hHotSmUrl: '/src/assets/data/home/hotsm.json', //首页套餐推荐接口地址
		hThemeUrl: '/src/assets/data/home/theme.json', //首页推荐商品接口地址
		gGoodsUrl: '/src/assets/data/goods/goods.json', //商品接口地址
		gDetailsUrl: '/src/assets/data/goods/details.json', //商品详情接口地址
		gEvaluatesUrl: '/src/assets/data/goods/evaluates.json', //商品评价接口地址
		categoryUrl: '/src/assets/data/category/category.json', //分类接口地址
		glNewTabsUrl: '/src/assets/data/goodsList/newTabs.json', //新品列表tabs接口地址
		glNewGoodsUrl: '/src/assets/data/goodsList/newGoods.json', //新品列表商品接口地址
		glCAllTabsUrl: '/src/assets/data/goodsList/cAllNewTabs.json', //分类所有商品列表tabs接口地址
		glCAllGoodsUrl: '/src/assets/data/goodsList/cAllNewGoods.json', //分类所有商品列表接口地址
	},
	success: {
		"1": "加载数据成功",
		'101': "操作成功",
		'102': '',
		'103': '',
		'104': '',
		'105': '确认要删除勾选的商品吗？',
		'106': '订单已提交',
	},
	error: {
		'-1': '加载数据失败，请检查网络！',
		'-1010': '操作失败！',
		'-1020': '请选择字段！',
		'-1021': '请选择运算符！',
		'-1022': '请输入条件值！',
		'-1023': '条件值需是数字！',
		'-1030': '证券号不能为空！',
		'-1031': '关键字不能为空！',
		'-1040': '请选择权类型！',
		'-1041': '请选择K线类型！',
		'-1050': '至少选择一种商品！',
		'-1060': '请选择支付方式！',
		'-1061': '请选择配送地点！',
		'-1062': '请选择配送时间！',
	},
	title: {
		'100': '',
	}
}

export default CONFIG