
const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);


const hashMap = xObject || [
    { logo : 'A', localType: 'text', url: 'https://www.acfun.cn'},
    {
        logo : 'B',
        localType: 'img',
        url: 'https://www.bilibili.com'
    }
]
const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.','').replace('/\/.*/', '')
} //删除/ 开头之后的内容

const render = () => {
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon" >
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', (e) => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()  //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()

$('.addButton').on('click', () => {
    let url = window.prompt('请问你要输入的网址是?')
    if(url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: "text",
        url: url
    });
    render();
});

window.onbeforeunload = () => {
    const str = JSON.stringify(hashMap);
    localStorage.setItem('x', str)
}

$(document).on('keypress', (e) => {
    console.log(e.key)
    const {key} = e;
    for (let i = 0; i < hashMap.length; i++){
        if (hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})

//路径
// parcel build src/index.html --no-minify --public-url https://.../dist

//或者 parcel build src/index.html --no-minify --public-url ./
