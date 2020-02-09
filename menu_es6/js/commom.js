class Tab  {
    constructor(options) {
        this.currentNum = 0;
        this.menuAry = [].slice.call(options.menu.querySelectorAll('li'));
        this.contentAry = [].slice.call(options.content.querySelectorAll('section'));
        this.isLoop = options.isLoop;
        this.prevElement = options.tabControle.querySelector('.prev');
        this.nextElement = options.tabControle.querySelector('.next');
        this.setMenuItemEvent();
        this.prevClickEvent();
        this.nextClickEvent();
        this.move(options.defaultNum);
        }

    setMenuItemEvent() {
        this.menuAry.forEach( (tabMenuItemElement) => {
                tabMenuItemElement.addEventListener('click', (click) => {
                    const index = this.menuAry.indexOf(click.target);
                    this.move(index);
                })
            })
    }

    prevClickEvent() {
        this.prevElement.addEventListener('click', () => {
            this.move(this.currentNum - 1);
        })
    }

    nextClickEvent() {
        this.nextElement.addEventListener('click', () => {
            this.move(this.currentNum + 1);
        })
    }

    move(num) {
        if (this.isLoop) {
                if (num >= this.menuAry.length) {
                    this.currentNum = 0;
                } else if (num < 0) {
                    this.currentNum = this.menuAry.length - 1;
                } else {
                    this.currentNum = num;
                }
            } else {
                this.currentNum = Math.min((this.menuAry.length - 1), num);
                this.currentNum = Math.max(0, this.currentNum);
            }

        const menu = this.menuAry;
        const content = this.contentAry;

        // 全部のclassを外す
        this.menuAry.forEach(function (val, i) {
            menu[i].classList.remove("on");
            content[i].classList.remove("on");
        })

        // 同じ番号のcontentなどにclassをつける
        menu[this.currentNum].classList.add("on");
        content[this.currentNum].classList.add("on");
    }

    // setInterval(nextClickEvent, this.count);
}

const tab = new Tab({
    menu: document.querySelector('.tabMenu'),
    content: document.querySelector('.tabContents'),
    tabControle: document.querySelector('.tabControle'),
    isLoop: true,
    defaultNum: 0,
    count: 2000
})

const tab2 = new Tab({
    menu: document.querySelector('.tabMenu2'),
    content: document.querySelector('.tabContents2'),
    tabControle: document.querySelector('.tabControle2'),
    isLoop: false,
    defaultNum: 0,
    count: 2000
})