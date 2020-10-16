/*=============================================
Exportamos la ruta para tomar imágenes
=============================================*/
export let Path = {

	url: 'http://localhost:4200/assets/'

	//Cuando necestiemos trabajar con certificado SSL (registro o ingreso con facebook)
	// url: 'https://localhost:4200/assets/'

}

/*=============================================
Exportamos el endPoint de la APIREST de Firebase
=============================================*/
export let Api = {

	url: 'https://market-place-31cf1.firebaseio.com/' // YOUR FIREBASE ENDPOINT

}

/*=============================================
Exportamos el endPoint para el registro de usuarios en Firebase Authentication
=============================================*/

export let Register = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCT1TFYrbUXA_h3ZovrSLP3hgN3MNP746c'
}

/*=============================================
Exportamos el endPoint para el ingreso de usuarios en Firebase Authentication
=============================================*/

export let Login = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCT1TFYrbUXA_h3ZovrSLP3hgN3MNP746c'
}


/*=============================================
Exportamos el endPoint para enviar verificación de correo electrónico
=============================================*/

export let SendEmailVerification = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCT1TFYrbUXA_h3ZovrSLP3hgN3MNP746c'

}

/*=============================================
Exportamos el endPoint para confirmar email de verificación
=============================================*/

export let ConfirmEmailVerification = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCT1TFYrbUXA_h3ZovrSLP3hgN3MNP746c'

}


/*=============================================
Exportamos el endPoint para tomar la data del usuario en Firebase auth
=============================================*/

export let GetUserData = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCT1TFYrbUXA_h3ZovrSLP3hgN3MNP746c'

}

/*=============================================
Exportamos el endPoint para Resetear la contraseña
=============================================*/

export let SendPasswordResetEmail = {

 url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCT1TFYrbUXA_h3ZovrSLP3hgN3MNP746c'

}

/*=============================================
Exportamos el endPoint para confirmar el cambio de la contraseña
=============================================*/

export let VerifyPasswordResetCode = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyCT1TFYrbUXA_h3ZovrSLP3hgN3MNP746c'

}

/*=============================================
Exportamos el endPoint para enviar la contraseña
=============================================*/

export let ConfirmPasswordReset = {

	url:'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyCT1TFYrbUXA_h3ZovrSLP3hgN3MNP746c'

}

/*=============================================
Exportamos el endPoint para cambiar la contraseña
=============================================*/

export let ChangePassword = {

	url:'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCT1TFYrbUXA_h3ZovrSLP3hgN3MNP746c'
}


/*=============================================
Exportamos el endPoint del servidor para administrar archivos
=============================================*/

export let Server = {

	url:'http://localhost/marketplace-stores/src/assets/img/index.php?key=AIzaSyCT1TFYrbUXA_h3ZovrSLP3hgN3MNP746c',
	delete: 'http://localhost/marketplace-stores/src/assets/img/delete.php?key=AIzaSyCT1TFYrbUXA_h3ZovrSLP3hgN3MNP746c'
}

/*=============================================
Exportamos el endPoint del servidor para enviar correos electrónicos
=============================================*/

export let Email = {

	url:'http://localhost/marketplace-sales/src/assets/email/index.php?key=AIzaSyCT1TFYrbUXA_h3ZovrSLP3hgN3MNP746c'

}

/*=============================================
Exportamos las credenciales de PAYU
=============================================*/

export let Payu = {

	//Sandbox
	action: 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/',
	merchantId: '508029',
	accountId: '512324', //Solo para México
	responseUrl: 'http://localhost:4200/checkout',
	confirmationUrl: 'http://www.test.com/confirmation',
	apiKey: '4Vj8eK4rloUd272L48hsrarnUA',
	test: 1

	//live
	//action: 'https://checkout.payulatam.com/ppp-web-gateway-payu/',
	//merchantId: '',
	//accountId: '',
	//responseUrl: '',
	//confirmationUrl: '',
	//apiKey:''
	//test: 0 


}

/*=============================================
Exportamos las credenciales de MERCADO PAGO
=============================================*/

export let MercadoPago = {

	//Sandbox
	public_key: "TEST-8c14c934-a247-4ecc-8585-019baed70a84",
	access_token: "TEST-2768452783809373-090301-c2daf236a653f0979ae17620fd74ee07-581022450"

	//Live
	// public_key: "APP_USR-8cd49018-96f1-4745-8776-708dcb265755",
	// access_token:"APP_USR-1682012079503888-061818-0f2e62c0cbd82a7c9863d55cb615502d-184874455"


}