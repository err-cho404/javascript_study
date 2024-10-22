$(function () {

    /*
     * 갤러리
     */
    $('#gallery').each(function () {

        var $container = $(this),  //기존 내용
            $loadMoreButton = $('#load-more'), // 추가 버튼			//추가된 내용
            $filter = $('#gallery-filter'),    // 필터링 양식
            addItemCount = 16,                 // 한 번에 표시 할 항목 수
            addedd = 0,                        // 표시 된 항목 수
            allData = [],                      // 모든 JSON 데이터
            filteredData = [];                 // 필터링 된 JSON 데이터

        $container.masonry({//기존 내용
            columnWidth: 230,
            gutter: 10,
            itemSelector: '.gallery-item'
        });

        // JSON을 검색하고 initGallery 함수를 실행
        $.getJSON('./data/content.json', initGallery);  			//변경됨

        // 갤러리 초기화
        function initGallery (data) {  								//변경되어 추가된 내용

            // 취득한 JSON 데이터(이미지별 객체 정보) 전체를 배열로 저장
            allData = data;

            // 초기 상태에서는 필터링하지 않고 그대로 전체 데이터를 전달
            filteredData = allData;

            // 첫 번째 항목을 표시하는 메서드를 호출(전체 이미지 중에서 설정된 개수(16)만큼만 표시)
            addItems();

            // 추가 버튼을 클릭하면 추가로 표시(표현되지 않은 이미지를 추가하여 표시)
            $loadMoreButton.on('click', addItems);

            // 필터 라디오 버튼이 변경되면 필터링을 수행
            $filter.on('change', 'input[type="radio"]', filterItems);
        }

        // 항목을 생성하고 문서에 삽입
        function addItems (filter) {								//추가된 내용

            var elements = [],		// 빈 배열을 선언
                // 추가 데이터의 배열
                slicedData = filteredData.slice(addedd, addedd + addItemCount); //0부터 16개, 16개부터 32개....
				//filteredData배열에 맨처음에는 모든 이미지가 배열로 들어가 있다. 그중에서 필요한 만큼 잘라내서 
				//sliceData배열로 저장한다.

            // slicedData의 요소마다 DOM 요소를 생성
            $.each(slicedData, function (i, item) {
                var itemHTML =
                        '<li class="gallery-item is-loading">' +
                            '<a href="' + item.images.large + '">' +
                                '<img src="' + item.images.thumb + '" alt="">' +
                                '<span class="caption">' +
                                    '<span class="inner">' +
                                        '<b class="title">' + item.title + '</b>' +
                                        '<time class="date" datatime="' + item.date + '">' +
                                            item.date.replace(/-0?/g, '/') +
                                        '</time>' +
                                    '</span>' +
                                '</span>' +
                            '</a>' +
                        '</li>';
                elements.push($(itemHTML).get(0));
            });

            // DOM 요소의 배열을 컨테이너에 넣고 Masonry 레이아웃을 실행
            $container
                .append(elements)
                .imagesLoaded(function () {
                    $(elements).removeClass('is-loading');
                    $container.masonry('appended', elements);

                    // 필터링시 재배치
                    if (filter) {
                        $container.masonry();
                    }
                });

            // 추가 된 항목 수량 갱신
            addedd += slicedData.length;

            // JSON 데이터가 추가 된 후에 있으면 추가 버튼을 지운다
            if (addedd < filteredData.length) {
                $loadMoreButton.show();
            } else {
                $loadMoreButton.hide();
            }
        }

        // 항목을 필터링한다.
        function filterItems () {
            var key = $(this).val(), // 체크 된 라디오 버튼의 value

                // 추가 된 Masonry 아이템
                masonryItems = $container.masonry('getItemElements');

            // Masonry 항목을 삭제
            $container.masonry('remove', masonryItems);

            // 필터링 된 항목의 데이터를 재설정과
            // 추가 된 항목 수를 재설정
            filteredData = [];
            addedd = 0;

            if (key === 'all') {
                // all이 클릭 된 경우 모든 JSON 데이터를 저장
                filteredData = allData;
            } else {
                // all 이외의 경우, 키와 일치하는 데이터를 추출
				// $.grep() 배열엣 조건에 맞는 요소만 고르는 메서드로 배열명, 조건에 해당하는 함수를 인자로 받는다.
                filteredData = $.grep(allData, function (item) {
                    return item.category === key;
                });
            }

            // 항목을 추가
            addItems(true);
        }
    });

    // jQuery UI Button radio버튼을 다른 버튼 모양으로 바꾼다.
    $('.filter-form input[type="radio"]').button({
        icons: {
            primary: 'icon-radio'
        }
    });

    // Resize page header
    $('.page-header').each(function () {
        var $header = $(this),
            headerHeight = $header.outerHeight(),
            headerPaddingTop = parseInt($header.css('paddingTop'), 10),
            headerPaddingBottom = parseInt($header.css('paddingBottom'), 10);
        $(window).on('scroll', $.throttle(1000 / 60, function () {
            var scroll = $(this).scrollTop(),
                styles = {};
            if (scroll > 0) {
                if (scroll < headerHeight) {
                    styles = {
                        paddingTop: headerPaddingTop - scroll / 2,
                        paddingBottom: headerPaddingBottom - scroll / 2
                    };
                } else {
                    styles = {
                        paddingTop: 0,
                        paddingBottom: 0
                    };
                }
            } else {
                styles = {
                    paddingTop: '',
                    paddingBottom: ''
                }
            }
            $header.css(styles);
        }));
    });

});
