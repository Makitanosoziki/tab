;

(function ($) {
    $.fn.tab = function () {

        function tab(options) {
            // メニューの配列を作る
            const menuAry = $(options.menu).find('li');

            // コンテンツの箱の配列を作る
            const contentSectionAry = $(options.section).find('section');

            //次へ、戻るを変数に入れる
            const prevElement = $(options.tabControle).find('.prev');

            const nextElement = $(options.tabControle).find('.next');

            menuAry.on('click', onClickMenu)

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
    }
})(jQuery);

tab({
    defaultNum: 0,
    menu: document.querySelector('.tabMenu'),
    section: document.querySelector('.tabContents'),
    isLoop: true,
    tabControle: document.querySelector('.tabControle')
})

tab({
    defaultNum: 0,
    menu: document.querySelector('.tabMenu2'),
    section: document.querySelector('.tabContents2'),
    isLoop: false,
    tabControle: document.querySelector('.tabControle2')
})
