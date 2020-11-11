let allscreen = document.getElementById("allscreen");
allscreen.onclick = () => {
    document.getElementById('hide2').style.display = 'block';

}
let offscreen = document.getElementById("offscreen");
offscreen.onclick = () => {
    document.getElementById('hide2').style.display = 'none';

}
let wechat = document.getElementById("showwechat");
wechat.onclick = () => {
    document.getElementById('hide').style.display = 'block';
    document.getElementById('wechat').style.display = 'block';

}
let close = document.getElementById("wechat");
close.onclick = () => {
    document.getElementById('hide').style.display = 'none';
    document.getElementById('wechat').style.display = 'none';

}