//FUNCIONAMIENTO DE BOTONES DE PAGO
paypal.Buttons({
    style: {
        color: 'blue',
        shape: 'pill',
        label: 'pay'
    },

    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: 'USD', // Importante: usar USD
                    value: '134.00'
                }
            }]
        });
    },

    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Pago completado por ' + details.payer.name.given_name);
            console.log('Detalles del pago:', details);
        });
    },

    onCancel: function(data) {
        alert("Pago cancelado");
        console.log(data);
    }
}).render('#paypal-button-container');
// FIN DE FUNCIONAMIENTO