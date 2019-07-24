const render = data => {
    const tale = data.text;
    const $result = $(".result");

    // причесать текст, потому что он немножко недодеоанный - кое-где нет пробелов, точек и заглавных букв.
    for(let i= 0; i < 5; i++){
        tale[i] += '. ';
    }
    tale[5] = tale[5].charAt(0).toUpperCase() + tale[5].slice(1) + ' ';
    tale[6] = tale[6].charAt(0).toUpperCase() + tale[6].slice(1) + ' ';
    tale[7] = tale[7].charAt(0).toUpperCase() + tale[7].slice(1) + '!!';

    // выводим начальный текст
    $result.html(tale);

    $(document).ready(function() {
        $(".btn").click(function() {
            // $(document.body).append(form); // подключить форму, submit-required не работает
            const vars = [];
            // получить значения из текстовых полей
            for (let i = 0; i < 6; i++) {
                vars[i] = $(`.var${i+1}`).val();
            }
            const speach = $(".speach").val();
            
            // создаем новую сказку, хотя можно было воспользоваться и старым массивом
            const newTale = [];
            for(let i = 0; i < 7; i++) {
                newTale[i] = tale[i].replace(/{var(\d+)}/g, (_, n) => vars[+n-1])
                };
            newTale[7] = tale[7].replace('{speach}', speach);
            
            // removeForm();
            
            $result.html(newTale);
        });
    });
}

$.getJSON(
    'https://api.myjson.com/bins/jcmhn',   /* url */
    function(data) {                       /* callback */
    console.log(data);                     /* output data to console */
    console.log(data.text[0]);
    render(data);
    }
);

function removeForm() {
    var elem = document.getElementById('form');
    elem.parentNode.removeChild(elem);
    return false;
}


