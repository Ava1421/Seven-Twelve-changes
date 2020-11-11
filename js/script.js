
// ----------------------------index c1-------------------------------
function moveImg(list, index) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].className == 'opa-on') {//清除li的透明度样式
            list[i].className = '';
        }
    }
    list[index].className = 'opa-on';
}
function moveIndex(list, num) {//移动小圆圈
    for (var i = 0; i < list.length; i++) {
        if (list[i].className == 'on') {//清除li的背景样式
            list[i].className = '';
        }
    }
    list[num].className = 'on';
}

var imgList = document.getElementById('img').getElementsByTagName('li');
var list = document.getElementById('index').getElementsByTagName('li');
var index = 0;
var timer;


for (var i = 0; i < list.length; i++) {//鼠标覆盖上哪个小圆圈，图片就移动到哪个小圆圈，并停止
    list[i].index = i;
    list[i].onmouseover = function () {
        var clickIndex = parseInt(this.index);
        index = clickIndex;

        moveImg(imgList, index);
        moveIndex(list, index);
        clearInterval(timer);
    };
    list[i].onmouseout = function () {//移开后继续轮播
        play();
    };

}

var nextMove = function () {
    index += 1;
    if (index >= 2) {
        index = 0
    }
    moveImg(imgList, index);
    moveIndex(list, index);
};
var play = function () {
    timer = setInterval(function () {
        nextMove();
    }, 3000);
};
play();



// ----------------------------index c3-------------------------------
window.onload = () => {
    let next_btn = document.getElementById("next");
    let pre_btn = document.getElementById("pre");
    let list = document.getElementById("list");
    let page = list.getElementsByTagName('a');
    let container = document.getElementById("c3");
    let dots = document.getElementById("dot").getElementsByTagName("li");
    let left = 0;
    let auto = null;
    let index = 0; // 当前显示图片的下标
    let status = false; // 当前轮播图动画是否在执行

    next_btn.onclick = () => {
        // 检查当前轮播图是否在动画中
        if (status) {
            return false;
        }
        let new_index = index + 1 > 3 ? 0 : index + 1; // 得到将要显示图片的下标
        animate2(new_index);
    }
    pre_btn.onclick = () => {
        if (status) {
            return false;
        }
        let new_index = index - 1 < 0 ? 3 : index - 1;
        animate2(new_index);
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].onclick = () => {
            if (index == i || status) {
                return false;
            }
            let new_index = i;
            animate2(new_index);
        }
    }
    function animate(new_left) {
        status = true;
        let left = parseInt(list.style.left);
        let offset = new_left - left; //移动距离
        let interval = 10; // 速度单位
        let speed = offset / (1000 / interval); //速度

        function go() {
            left = parseInt(list.style.left); // 当前位置
            let next_left = left + speed; // 下一个位置
            list.style.left = next_left + "px";

            if (speed < 0 && next_left >= new_left || speed > 0 && next_left <= new_left) {
                setTimeout(() => {
                    go();
                }, interval)
            } else {
                list.style.left = new_left + "px"; // 位置强制放到终点
                changeDot();
                status = false; // 动画结束
            }
        }

        go();
    }

    // 淡入淡出的动画方法
    function animate2(new_index) {
        status = true;
        let interval = 10;
        let offset = 1 / (1000 / interval);

        for (let i = 0; i < page.length; i++) {
            page[i].style.zIndex = -1;
        }
        page[index].style.zIndex = 1;
        page[new_index].style.zIndex = 0; // 把将要显示的图片放到第二层

        page[new_index].style.opacity = 0;

        function go() {
            let opacity = parseFloat(page[index].style.opacity);
            opacity -= offset;
            page[index].style.opacity = opacity;

            let opacity2 = parseFloat(page[new_index].style.opacity);
            opacity2 += offset;
            page[new_index].style.opacity = opacity2;

            // 判断当前图片是否完成动画
            if (opacity <= 0) {
                page[0].style.opacity = 0;

                for (let i = 0; i < page.length; i++) {
                    page[i].style.zIndex = -1;
                    page[i].style.opacity = 1;
                }

                page[new_index].style.zIndex = 1;
                index = new_index;
                changeDot();
                status = false;
            } else {
                setTimeout(() => {
                    go()
                }, interval);
            }
        }
        go();
    }

    // 自动轮播图片的方法
    function autoPlay() {
        auto = setInterval(() => {
            next_btn.onclick(); // 每5秒
        }, 5000);
    }

    // 检查并显示对应片图焦点图标签的方法
    function changeDot() {
        for (let i = 0; i < dots.length; i++) {
            if (i == 0) {
                dots[i].className = "p1";
            } else if (i == 1) {
                dots[i].className = "p2";
            } else if (i == 2) {
                dots[i].className = "p3";
            } else {
                dots[i].className = "p4";
            }

        }
        if (index == 0) {
            dots[index].className = "p1 on";
        } else if (index == 1) {
            dots[index].className = "p2 on";
        } else if (index == 2) {
            dots[index].className = "p3 on";
        } else {
            dots[index].className = "p4 on";
        }

    }

    autoPlay();
}


// ---------------------------------

