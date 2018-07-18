const CONFIG = {
	cookieKey: 'user',
	ajaxCount: 0,
	api: {
		hBannerUrl: '/src/assets/data/home/banner.json', //首页banner接口地址
		hHotGoodsUrl: '/src/assets/data/home/hotgoods.json', //首页推荐商品接口地址
		hHotSmUrl: '/src/assets/data/home/hotsm.json', //首页套餐推荐接口地址
		hThemeUrl: '/src/assets/data/home/theme.json', //首页推荐商品接口地址
		themeGoodsUrl: '/src/assets/data/home/themeGoods.json', //首页推荐商品接口地址
		gGoodsUrl: '/src/assets/data/goods/goods.json', //商品接口地址
		gDetailsUrl: '/src/assets/data/goods/details.json', //商品详情接口地址
		gEvaluatesUrl: '/src/assets/data/goods/evaluates.json', //商品评价接口地址
		gGoodsSmUrl: '/src/assets/data/goods/goodsSm.json', //套餐商品接口地址
		gDetailsSmUrl: '/src/assets/data/goods/detailsSm.json', //套餐商品详情接口地址
		gEvaluatesSmUrl: '/src/assets/data/goods/evaluatesSm.json', //套餐商品评价接口地址
		categoryUrl: '/src/assets/data/category/category.json', //分类接口地址
		glNewTabsUrl: '/src/assets/data/goodsList/newTabs.json', //新品列表tabs接口地址
		glNewGoodsUrl: '/src/assets/data/goodsList/newGoods.json', //新品列表商品接口地址
		glCAllTabsUrl: '/src/assets/data/goodsList/cAllNewTabs.json', //分类所有商品列表tabs接口地址
		glCAllGoodsUrl: '/src/assets/data/goodsList/cAllNewGoods.json', //分类所有商品列表接口地址
		goodsSmListUrl: '/src/assets/data/goodsList/goodsSmList.json', //套餐商品列表接口地址
		user: '/src/assets/data/admin/user/user.json', //个人中心接口
		userInfo: '/src/assets/data/admin/user/userInfo.json', //用户信息接口
		saveModify: '/src/assets/data/admin/user/save.json', //保存信息修改接口
		orderComplete: '/src/assets/data/admin/order/orderComplete.json', //已完成订单接口
		orderReceive: '/src/assets/data/admin/order/orderReceive.json', //待收货订单接口
		orderDistribution: '/src/assets/data/admin/order/orderDistribution.json', //配送中订单接口
		orderBack: '/src/assets/data/admin/order/orderBack.json', //已完成订单接口
		recordIntegral: '/src/assets/data/admin/integral/recordIntegral.json', //积分记录接口
		signIn: '/src/assets/data/admin/integral/signIn.json', //签到接口
		integralShop: '/src/assets/data/admin/integral/integralShop.json', //积分商城接口
		integralOrderGoods: '/src/assets/data/admin/integral/integralOrderGoods.json', //积分订单商品接口
		usedIntegral: '/src/assets/data/admin/integral/usedIntegral.json', //消费积分接口
		collectUrl: '/src/assets/data/admin/collect/collect.json', //收藏列表接口
	},
	success: {
		"1": "加载数据成功",
		'101': "操作成功",
		'102': '',
		'103': '',
		'104': '',
		'105': '确认要删除勾选的商品吗？',
		'106': '订单已提交',
		'107': '支付成功',
		'108': '保存成功',
		'109': '确认要删除此订单吗？',
		'110': '确认要退货吗？',
		'1100': '您的退货申请已提交给商家，请耐心等待',
		'111': '收货成功',
		'112': '确认要删除此条收藏吗？',
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
		'-1070': '支付失败！',
		'-1080': '值不能为空！',
		'-1090': '删除失败！',
		'-1100': '',
		'-1110': '提交失败！',
		'-1120': '删除失败！',

	},
	title: {
		'100': '',
	}
}

export default CONFIG