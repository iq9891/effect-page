$(function(){
	var $home = $('#home'),
		$prev = $('#prev'),
		$next = $('#next'),
		$last = $('#last'),
		$pageNum = $('#pageNum'),
		$go = $('#go'),
		$toChange = $('#toChange'),
		$data = $('#data'),
		$dataNum = $('#dataNum'),
		aData = [], //数据
		iDataNum = $dataNum.val()-0,//20,	//每页20条数据
		iIndex = 0, //第几个索引
		iNow = 1,	//第几页
		iPageNum = 10,//每页10个分页按钮
		iAllPage = 0;//一共4个分页
	
	//模拟数据 start
	for (var a=0; a<323; a++) {
		aData.push({'iNow':a+1});
	}
	//模拟数据 end
	
	reSetFn();
	loadDataFn(1);
	
	if(iAllPage<iPageNum){
		createPageFn(0,iAllPage);
	}else{
		createPageFn(0,iPageNum);
	}
	
	//下一页
	$next.click(function(){
		
		iIndex++;
		iNow++;
		
		loadDataFn(iNow);

		$('.pBtn').removeClass('on').eq(iIndex).addClass('on');
		
		if(iNow == 2){
			showPrevHomePage();
		}
	
		if(iNow == iAllPage){
			hideNextLastPage();
			return;
		}

		if(iIndex == 10){
			var _this = $('.pBtn').eq(iIndex-1).html()-0;
			if(_this+iPageNum>iAllPage){
				createPageFn(_this,iAllPage);
			}else{
				createPageFn(_this,_this+iPageNum);
			}
			iIndex = 0;
		}

	});

	//上一页
	$prev.click(function(){
		if(iIndex == 0){
			var _this = $('.pBtn').eq(iIndex).html()-1;
			if(_this-iPageNum<1){
				if(iAllPage<iPageNum){
					createPageFn(0,iAllPage);
				}else{
					createPageFn(0,iPageNum);
				}
				iIndex = _this;
			}else{
				createPageFn(_this-iPageNum,_this);
				showNextLastPage();
				iIndex = iPageNum;
			}
			iNow = _this+1;
		}
		
		if(iNow == 2){
			hidePrevHomePage();
		}

		if(iNow == iAllPage-1){
			showNextLastPage();
		}

		iIndex--;
		iNow--;
		
		$('.pBtn').removeClass('on').eq(iIndex).addClass('on');

		loadDataFn(iNow);
		
	});

	//最后一页
	$last.click(function(){
		hideNextLastPage();
		showPrevHomePage();
		if(iAllPage<iPageNum){
			iNow = iAllPage-1;
			iIndex = iNow;
			createPageFn(0,iNow+1);
		}else{
			iNow = iAllPage-1;
			createPageFn(iNow-iPageNum+1,iAllPage);
			iIndex = iAllPage-(iNow-iPageNum+2);
		}
		
		loadDataFn(iNow+1);

		$('.pBtn').removeClass('on').eq(iIndex).addClass('on');
	});

	//第一页
	$home.click(function(){
		iIndex = 0;
		iNow = 1;
		if(iAllPage<iPageNum){
			createPageFn(0,iAllPage);
		}else{
			createPageFn(0,iPageNum);
		}
		loadDataFn(iNow);
		hidePrevHomePage();
		showNextLastPage();
		$('.pBtn').removeClass('on').eq(iIndex).addClass('on');
	});

	//点击跳转
	$go.click(function(){
		iNow = $pageNum.val()-0;
		iIndex = 0;
		
		loadDataFn(iNow);

		$('.pBtn').removeClass('on').eq(iIndex).addClass('on');
		
		if(iNow+iPageNum>iAllPage){
			if(iNow==iAllPage){
				hideNextLastPage();
				showPrevHomePage();
				createPageFn(iNow-1,iNow);
			}else{
				createPageFn(iNow-1,iAllPage);
				showPrevHomePage();
			}
		}else if(iNow==0){
			showNextLastPage();
			hidePrevHomePage();
			createPageFn(iNow-1,iNow+iPageNum);
		}else{
			createPageFn(iNow-1,iNow+iPageNum);
			showNextLastPage();
			showPrevHomePage();
		}
	});

	//改变数据条数
	$toChange.click(function(){
		iDataNum = $dataNum.val()-0;
		reSetFn();
		loadDataFn(1);	
	});
	
	//改变每页条数时候的重置
	function reSetFn(){
		iAllPage = Math.ceil(aData.length / iDataNum);
		$('#all').html(iAllPage);
	};
	
	//创建分页列表
	function createPageFn(iStart,iEnd){//iNow
		var i = iStart,
			$pageBtn = $('.pageBtn'),
			$pBtn = $pageBtn.find('.pBtn'),
			sPageHtml = '';
		
		if($pBtn.length>0){
			$pageBtn.empty();
		}
		for (; i<iEnd; i++) {
			sPageHtml += '<a class="pBtn" href="javascript:;">'+ (i+1) +'</a>';
		}
		$pageBtn.append(sPageHtml);
		$('.pBtn').eq(0).addClass('on');
		$('.pBtn').on('click', function(){
			iNow = $(this).html();
			iIndex = $(this).index();
			$('.pBtn').removeClass('on').eq(iIndex).addClass('on');
			loadDataFn(iNow);
			
			if(iNow != 1){
				showPrevHomePage();
			}else{
				hidePrevHomePage();
			}
			if(iNow != iAllPage){
				showNextLastPage();
			}else{
				hideNextLastPage();
			}
		});
	};

	//载入数据
	function loadDataFn(iNow){
		
		var sHtml = '',
			b=(iNow-1)*iDataNum,
			iLen = b+iDataNum>aData.length-1?aData.length-1:b+iDataNum;
		if($data.find('li').length!=0){
			$data.empty();
		}
		
		for (; b<iLen; b++) {
			sHtml+= '<li>'+ aData[b].iNow +'</li>';
		}
		$data.append(sHtml);
	};

	//显示上一页和首页
	function showNextLastPage(){
		$next.show();
		$last.show();
	};
	//显示下一页和末页
	function showPrevHomePage(){
		$home.show();
		$prev.show();
	};
	//隐藏上一页和首页
	function hidePrevHomePage(){
		$home.hide();
		$prev.hide();
	};
	//隐藏下一页和末页
	function hideNextLastPage(){
		$next.hide();
		$last.hide();
	};
});