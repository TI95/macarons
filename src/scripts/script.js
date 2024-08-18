document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}

document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open')
    }
});


function scrollToForm(button) {
    const product = button.closest('.macaroon-card');
    const macaroonTitle = product.querySelector('.macaroon-title').textContent;
     document.getElementById('input-order').value = macaroonTitle;
     document.querySelector('.order').scrollIntoView({ behavior: 'smooth' });
}

document.querySelectorAll('.btn-order').forEach(function(button) {
    button.addEventListener('click', function() {
        scrollToForm(this);
    });
});
let loader = $('.loader');
let formDelete = $('.order-macaroon');
let popup = $('.popup')
$('#submit').click(function () {

    const product = $('#input-order');
    const name = $('#name');
    const phone = $('#phone');
    let hasError = false;

    $('.error-input').hide()

    if (!product.val()) {
        product.next().show();
        product.css({'margin-bottom': '10px', 'border-color': 'red'})
        hasError = true;
    }else {
        product.css('border-color',' #770a1c')
    }

    if (!name.val()) {
        name.next().show();
        name.css({'margin-bottom': '10px', 'border-color': 'red'})
        hasError = true;
    } else {
        name.css('border-color',' #770a1c')
    }

    if (!phone.val()) {
        phone.next().show();
        phone.css({'margin-bottom': '10px', 'border-color': 'red'})
        hasError = true;
    } else {
        phone.css('border-color',' #770a1c')

    }

    if (phone.val() && name.val()&& product.val()){
        loader.css('display', 'flex')

    }

    if (!hasError) {
        $.ajax({
            method: "POST",
            url: " https://testologia.ru/checkout",
            data: {order: product.val(), name: name.val(), phone: phone.val()}
        })
            .done(function (msg) {
                if (msg.success){
                    formDelete.hide();
                    popup.css('display', 'flex')

                }else {

                    alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.")
                }
                loader.hide();
                console.log(msg)
            });
    }
})
