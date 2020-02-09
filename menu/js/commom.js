function tab(options) {
    // メニューの配列を作る
    const menuAry = [].slice.call(options.menu.querySelectorAll('li'));

    // コンテンツの箱の配列を作る
    const contentSectionAry = [].slice.call(options.section.querySelectorAll('section'));

    let currentNum = 0;

    move(options.defaultNum);

    const prevElement = options.tabControle.querySelector('.prev');
    const nextElement = options.tabControle.querySelector('.next');

    setInterval (onClickNext,3000);

    // menuをクリックしたら
    menuAry.forEach(function (tabMenuItemElement) {
        tabMenuItemElement.addEventListener('click', onClickMenu);
    })

    prevElement.addEventListener('click', onClickPrev);

    function onClickPrev() {
        move(currentNum - 1);
    }


    nextElement.addEventListener('click', onClickNext);

    function onClickNext() {
        move(currentNum + 1);
    }

    // クリックしたところが何番目か返して
    function onClickMenu() {
        const index = menuAry.indexOf(this);
        move(index);
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
        menuAry.forEach(function (val, i) {
            menuAry[i].classList.remove("on");
            contentSectionAry[i].classList.remove("on");
        })

        // 同じ番号のcontentなどにclassをつける
        menuAry[currentNum].classList.add("on");
        contentSectionAry[currentNum].classList.add("on");
    }
}

tab({
    defaultNum: 0,
    menu: document.querySelector('.tabMenu'),
    section: document.querySelector('.tabContents'),
    isLoop: true,
    tabControle: document.querySelector('.tabControle'),
    time: 3000
})

tab({
    defaultNum: 0,
    menu: document.querySelector('.tabMenu2'),
    section: document.querySelector('.tabContents2'),
    isLoop: false,
    tabControle: document.querySelector('.tabControle2'),
    time: 3000
})
