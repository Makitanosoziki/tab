(function () {
    $.fn.tab = function (options) {

        //コンテンツの配列を作る
        const contentSectionAry = $(options.section).eq(0).find('section');

        //次へ、戻るを変数に入れる
        const prevElement = $(options.tabControle).find('.prev');
        const nextElement = $(options.tabControle).find('.next');

        //メニューをクリックしたら
        const tabMenus = $(this);
        tabMenus.each(function () {
            $(this).find('li').on('click', onClickMenu)
        });

        // クリックしたところが何番目か返して
        function onClickMenu() {
            const tabMenu = $(this).parent();
            const index = tabMenu.find('li').index(this);
            console.log(index);
            move(index);
        }

        let currentNum = 0;

        move(options.defaultNum);
        prevElement.on('click', onClickPrev);

        function onClickPrev() {
            move(currentNum - 1);
        }

        nextElement.on('click', onClickNext);

        function onClickNext() {
            move(currentNum + 1);
        }

        function move(num) {

            if (options.isLoop) {
                if (num >= contentSectionAry.length) {
                    currentNum = 0;
                } else if (num < 0) {
                    currentNum = (contentSectionAry.length - 1);
                } else {
                    currentNum = num;
                }
            } else {
                currentNum = Math.min((contentSectionAry.length - 1), num);
                currentNum = Math.max(0, currentNum);
            }

            tabMenus.each(function () {
                console.log(currentNum);

                console.log($(this));

                //全部のclassを外す
                $(this).find('li').removeClass('on');

                //classつける
                $(this).find('li').eq(currentNum).addClass('on');
            });

            contentSectionAry.removeClass('on');

            contentSectionAry.eq(currentNum).addClass('on');

        }
    }
})(jQuery);
