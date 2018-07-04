const CONFIG = {
	url: 'http://localhost',
	cookieKey: 'user',
	success: {
		"1": "加载数据成功",
		'101': "操作成功",
		'102': '',
		'103': '',
		'104': ''
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
		'-1041': '请选择K线类型！'
	}
}

export default CONFIG