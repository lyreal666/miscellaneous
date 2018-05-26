let links = $("#coursetree div.ncells a");
let firstLink = links[0];
let matchArr = firstLink.href.match(/.+?'(\d+)'.+?'(\d+)'.+/);
let [firstArg, secondArg] = [matchArr[1], matchArr[2]];
links.each((index, ele) => {
    let href = `javascript:getTeacherAjax('${firstArg}','${secondArg}','thirdArg')`
    let h4 = $(ele).find('h4');
    if (h4.length > 0) {
        let matchArr = h4[0].id.match(/[a-z]+(\d)+/);
        if (matchArr) {
            let thirdArg = matchArr[1]
            console.log(matchArr)
            href = href.replace("thirdArg", thirdArg)
            ele.href = href
            console.log(thirdArg)
            return
        }
    }
    let h5 = $(ele).find("h5");
    if (h5.length > 0) {
        let matchArr = h5[0].id.match(/[a-z]+(\d+)/);
        if (matchArr) {
            let thirdArg = matchArr[1]
            console.log(thirdArg)
            href = href.replace("thirdArg", thirdArg)
            ele.href = href
        }
    }
    
})