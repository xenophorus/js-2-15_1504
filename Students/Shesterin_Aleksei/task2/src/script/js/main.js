// Я не смог реализовать это классом. Если честно, я не очень понимаю смысла его использования,
// ведь наследования нет, сходных объектов тоже. В результате я не знаю, как его использовать.



function render(price, cal) {
    document.getElementById('summary_price').innerText = price;
    document.getElementById('summary_cal').innerText = cal;

}

function counter(allInputs) {
    document.getElementById('addspice').removeAttribute('data-set');
    let price = 0;
    let cal = 0;
    allInputs.forEach((el) => {
        if (el.hasAttribute('data-set')) {
            price += parseInt(el.dataset.price);
            cal += parseInt(el.dataset.cal);
        }
    })
    render(price, cal);
}

function checkBoxStatus(allInputs) {
    let spice = document.getElementsByName('spice');
    let chbox = document.getElementById('addspice');
    chbox.addEventListener("change", function () {
        if (chbox.checked === true) {
            spice.forEach((el) => {
                el.removeAttribute('disabled');
            })
        } else if (chbox.checked === false) {
            spice.forEach((el) => {
                el.removeAttribute('data-set');
                el.checked = false;
                el.setAttribute('disabled', 'disabled');

            })
        }
        counter(allInputs);
    })
}

function inputsStatus(allInputs) {
    allInputs.forEach((el) => {
        el.addEventListener('change', function () {
            if (el.checked === true) {
                document.getElementsByName(el.name).forEach((el) => {
                    if (el.hasAttribute('data-set'))
                        el.removeAttribute('data-set')
                })
                el.setAttribute('data-set', '1');
            }
            counter(allInputs);
        })
    })

}

function begin() {
    let allInputs = document.querySelectorAll('input');
    counter(allInputs); // выводим предварительный результат
    checkBoxStatus(allInputs);
    inputsStatus(allInputs)
}

begin();
