$(function(){
    let duration = 300;
    
    /* 입체 텍스트 그림자 스크립트   */ 
    $('#typo').typoShadow();

    /*  다양한 버튼 스크립트    */ 
    $('#buttons1 .inner button:nth-child(-n+4)').on('mouseover',function(){
        $(this).stop().animate({
            backgroundColor : '#7365bd',
            color : '#fff'
        }, duration)
    }).on('mouseout', function(){
        $(this).stop().animate({
            backgroundColor : '#FFF',
            color : '#ebc000'
        }, duration)
    } );

    $('#buttons1 .inner button:nth-child(n+5):nth-child(-n+8)').on('mouseover',function(){
        $(this).stop().animate({
            borderWidth : '10px',
            color : 'purple'
        }, duration)
    }).on('mouseout', function(){
        $(this).stop().animate({
            borderWidth : '0px',
            color : '#ebc000'
        }, duration)
    } );
    $('#buttons1 .inner button:nth-child(n+9):nth-child(-n+12)').on('mouseover',function(){
        $(this).find('>span').stop().animate({ width : '100%'}, duration);
    }).on('mouseout', function(){
        $(this).find('>span').stop().animate({ width : '0%'}, duration);
    } );


    /* 원형버튼 스크립트   */ 
    $('#buttons2 button').each(function(index){
        let position = index * 40 - 40 ;
        $(this).css({top :  position + "px"});
    }); //기준을 설정해서 대각선으로 배치
    $('#buttons2 button').on('mouseover', function(){
        let $btn = $(this);
        $btn.stop().animate({ backgroundColor : 'yellow', color : "black"}, duration);
        $btn.find('img:nth-child(1)').stop().animate({opacity : 0}, duration);
        $btn.find('img:nth-child(2)').stop().animate({opacity : 1}, duration);
    }).on('mouseout', function(){
        let $btn = $(this);
        $btn.stop().animate({ backgroundColor : 'white', color : "green"}, duration);
        $btn.find('img:nth-child(1)').stop().animate({opacity : 1}, duration);
        $btn.find('img:nth-child(2)').stop().animate({opacity : 0}, duration);
    });

    /* 사이드 버튼 네비게이션  */ 
    let $aside = jQuery('.page-main>aside');
    let $asideButton = $('.page-main>aside button'); // $aside.find('button');
    $asideButton.on('click', function(){
        $aside.toggleClass('open');
        if( $aside.hasClass('open') ){
            $aside.stop().animate({'left' : '-30px'}, duration, 'easeOutBounce');
            $asideButton.find('img').attr('src', './img/btn_close.png');
        }else{
            $aside.stop().animate({'left' : '-350px'}, duration, 'easeOutBounce');
            $asideButton.find('img').attr('src', './img/btn_open.png');
        }
    })
});
