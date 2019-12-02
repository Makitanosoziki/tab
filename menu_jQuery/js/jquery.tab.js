(function () {
    $.fn.tab = function (options) {

        // メニューの配列を作る
        const menuAry = $(this).find('li');

        // コンテンツの箱の配列を作る
        const contentSectionAry = $(options.section).find('section');

        //次へ、戻るを変数に入れる
        const prevElement = $(options.tabControle).find('.prev');

        const nextElement = $(options.tabControle).find('.next');

        //メニューをクリックしたら
        $(this).each(function () {
            $(this).on('click', onClickMenu);
        });

        // クリックしたところが何番目か返して
        function onClickMenu() {
            const index = menuAry.index(this);
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
                if (num >= menuAry.length) {
                    currentNum = 0;
                } else if (num < 0) {
                    currentNum = menuAry.length - 1;
                } else {
                    currentNum = num;
                }
            } else {
                currentNum = Math.min((menuAry.length - 1), num);
                currentNum = Math.max(0, currentNum);
            }

            // 全部のclassを外す
            menuAry.removeClass('on');
            contentSectionAry.removeClass('on');

            // 同じ番号のcontentなどにclassをつける
            menuAry.eq(currentNum).addClass('on');
            contentSectionAry.eq(currentNum).addClass('on');
        }
    }
})(jQuery);
