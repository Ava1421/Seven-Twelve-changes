let i = 0;
let click = document.getElementById("click");
click.onclick = () => {
    if (i == 0) {
        document.getElementById('hide3').style.display = 'none';
        i = 1
    } else {
        document.getElementById('hide3').style.display = 'block';
        i = 0
    }

}