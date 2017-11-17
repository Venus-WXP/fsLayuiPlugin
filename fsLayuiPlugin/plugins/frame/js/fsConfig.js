/**
 * @Description: 基础配置
 * @Copyright: 2017 www.fallsea.com Inc. All rights reserved.
 * @author: fallsea
 * @version 1.0.2
 * @date: 2017年11月11日 下午3:51:35
 */
layui.define([], function (exports) {

	var fsConfig = {};
	
	/**
	 * 错误码处理定义
	 */
	fsConfig["filters"] = {
		// 未登录
		"-999" : function(result) {
			top.window.location.href = fsConfig["global"]["loginUrl"];
		}
	};
	
	/**
	 * 项目中需要调用到的常量、变量这里配置
	 */
	fsConfig["global"] = {
		"servletUrl":"https://fs.fallsea.com", //异步请求地址
		"loginUrl" : "/login", //登录url
		"uploadUrl" : "https://fs.fallsea.com/upload", //上传附件url
		"uploadHtmlUrl" : "/plugins/frame/views/upload.html", //上传附件html地址，默认/plugins/frame/views/upload.html
		"result" : { //响应结果配置
	    "statusName": "errorNo", //数据状态的字段名称，默认：errorNo
	    "msgName": "errorInfo", //状态信息的字段名称，默认：errorInfo
	    "dataName" : "results.data", //数据列表的字段名称，默认：results.data
		},
		"page" : { //分页配置
			"request": {//请求配置
				"pageName": "pageNum", //页码的参数名称，默认：pageNum
				"limitName": "pageSize" //每页数据量的参数名，默认：pageSize
			},
			"response": {//响应配置
				"countName": "results.data.total", //数据总数的字段名称，默认：results.data.total
				"dataName" : "results.data", //数据列表的字段名称，默认：results.data
				"dataNamePage": "results.data.list" //分页数据列表的字段名称，默认：results.data.list
			}
		}
	};
	
	/**
	 * 拓展form表单验证规则
	 */
	fsConfig["verify"] = {
		/**
		 * 对比两个值相等
		 */
		"equals": function(value, item){ //value：表单的值、item：表单的DOM对象
	    var equalsId = $(item).attr("equalsId");
	    if(_.isEmpty(equalsId)){
        return '未配置对比id';
	    }
	    var value2 = $("#"+equalsId).val();
	    
	    if(!_.eq(value,value2))
	    {
        var equalsMsg = $(item).attr("equalsMsg");
        if(_.isEmpty(equalsMsg))
        {
        	equalsMsg = "值不相等";
        }
        return equalsMsg;
	    }
		},
		/**
		 * 用户名验证
		 */
		"username": [
			/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){2,19}$/,
			'用户名格式不正确!'
		],
		/**
		 * 最小、最大长度判断
		 */
		"length": function(value, item){ //value：表单的值、item：表单的DOM对象
	    var minLength = $(item).attr("minLength");//最小长度
	    var maxLength = $(item).attr("maxLength");//最大长度
	    if(!_.isEmpty(minLength) && !_.eq('0',minLength) && _.gt(minLength,value.length)){
	    	return "输入内容小于最小值:"+minLength;
	    }
	    if(!_.isEmpty(maxLength) && !_.eq('0',maxLength) && _.gt(value.length,maxLength)){
	    	return "输入内容大于最小值:"+maxLength;
	    }
		}
	};
	exports('fsConfig', fsConfig);
});