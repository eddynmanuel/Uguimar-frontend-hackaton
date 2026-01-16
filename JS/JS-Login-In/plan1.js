//FUNCIONAMIENTO DE BOTONES DE PAGO - PLAN BÁSICO
paypal.Buttons({
    style: {
        color: 'blue',
        shape: 'pill',
        label: 'pay'
    },

    createOrder: function (data, actions) {
        return actions.order.create({
            purchase_units: [{
                description: 'Plan Básico - UGuimar',
                amount: {
                    currency_code: 'USD',
                    value: '53.00'
                }
            }]
        });
    },

    onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
            // Guardar información de la compra
            const compra = {
                plan: 'Básico',
                precio: 53.00,
                fecha: new Date().toISOString(),
                transaccionId: data.orderID,
                pagador: details.payer.name.given_name + ' ' + details.payer.name.surname,
                email: details.payer.email_address
            };

            // Guardar en localStorage
            let compras = JSON.parse(localStorage.getItem('compras')) || [];
            compras.push(compra);
            localStorage.setItem('compras', JSON.stringify(compras));

            // Marcar usuario como suscrito
            localStorage.setItem('planActivo', 'Básico');
            localStorage.setItem('fechaSuscripcion', new Date().toISOString());

            alert('¡Pago completado exitosamente! Bienvenido al Plan Básico, ' + details.payer.name.given_name);
            console.log('Detalles del pago:', details);

            // Redirigir a la página de inicio
            window.location.href = 'inicioj.html';
        });
    },

    onCancel: function (data) {
        alert("Pago cancelado. Puedes intentarlo de nuevo cuando quieras.");
        console.log('Pago cancelado:', data);
    },

    onError: function (err) {
        console.error('Error en el pago:', err);
        alert('Hubo un error procesando el pago. Por favor, intenta de nuevo.');
    }
}).render('#paypal-button-container');
// FIN DE FUNCIONAMIENTO