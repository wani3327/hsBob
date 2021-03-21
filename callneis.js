function callApi(date)
{
    let res;

    $.ajax({
        url: 'https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=c539846fc8384ce69947d3c4c785a609&Type=JSON&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010115&MLSV_YMD=' + date,
        success: function (data) {
            let raw = JSON.parse(data)['mealServiceDietInfo'][1]['row'];
            let d = [];
            for (let i in raw)
            {
                d.push([raw[i]['MMEAL_SC_NM'], raw[i]['DDISH_NM']]);
            }
            res = d;
        },
        error: function (data) {
            res = [['네트워크 오류', '']]
        },
        async: false
    });

    return res;
}

function makeHTML(date)
{
    let data = callApi(date)
    let ht = '';

    for (let eat in data)
    {
        ht += `<div class='cell'>
                <b>${data[eat][0]}</b><br>
                ${data[eat][1]}
            </div>`;
    }

    return ht;
}

const DAYNAME = ['', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', ''];
var today = new Date(); //1607655600000

function getMeal()
{
    let i = new Date();
    i.setDate(today.getDate() - (today.getDay() - 1));

    while (i.getDay() != 6)
    {
        function makeDateURL(date)
        {
            return ('' + date.getFullYear()
                       + ('0' + (date.getMonth() + 1)).slice(-2)
                       + ('0' + date.getDate()).slice(-2));
        }

        function makeDateStr(date)
        {
            return ((date.getMonth() + 1) + '월 '
                   + date.getDate() + '일');
        }

        $('#' + DAYNAME[i.getDay()] + ' .date').html(makeDateStr(i));

        let dayCell = $('#' + DAYNAME[i.getDay()])
        dayCell.html(dayCell.html() + makeHTML(makeDateURL(i)));

        if (today.getDay() == i.getDay())
        $('#' + DAYNAME[i.getDay()] + ' div').addClass('today');

        i.setDate(i.getDate() + 1);
    }
}

function goToday() {
    $('#' + DAYNAME[today.getDay()])[0].scrollIntoView();
}
    /* return [['조식', `흑미밥(k)<br>
    메이플피칸(k)2.6.<br>
    근대된장국(k)5.6.<br>
    건파래볶음(k)5.<br>
    김치볶음(k)10.9.<br>
    닭살카레볶음5.6.13.15.<br>
    귤<br>
    오레오오즈5.6.<br>
    하루견과3<br>
    배식우유2.<br>`],
    ['중식', `흑미밥(k)<br>
    메이플피칸(k)2.6.<br>
    근대된장국(k)5.6.<br>
    건파래볶음(k)5.<br>
    김치볶음(k)10.9.<br>
    닭살카레볶음5.6.13.15.<br>
    귤<br>
    오레오오즈5.6.<br>
    하루견과3<br>
    배식우유2.<br>`]]; */