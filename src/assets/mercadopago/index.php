<?php 

require __DIR__  . '/vendor/autoload.php';

/*=============================================
Dominio
=============================================*/

$domain = "localhost";

/*=============================================
Credenciales 
=============================================*/

$sandbox = true;

if($sandbox){

	$public_key = "TEST-8c14c934-a247-4ecc-8585-019baed70a84";
	$access_token = "TEST-2768452783809373-090301-c2daf236a653f0979ae17620fd74ee07-581022450";

}else{

	$public_key = "";
	$access_token = "";

}


/*=============================================
Petición a la API de Cambio de Moneda 
=============================================*/
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://free.currconv.com/api/v7/convert?q=USD_MXN&compact=ultra&apiKey=dcb6748b6632cd353ac4",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "Cookie: __cfduid=d33a8b671902df6f1dfc8eb1d98756da61592509616"
  ),
));

$response = curl_exec($curl);

curl_close($curl);

$jsonResponse = json_decode($response, true);

/*=============================================
Formulario de MercadoPago  mai, polycy bc    
=============================================*/ 

if(isset($_GET["_x"]) && $_GET["_x"] == md5(base64_decode($_COOKIE["_x"]))){
	
	echo '
	<div style="width:100%; height:100vh; position:fixed; background:url(mp-bg.jpg); background-repeat:no-repeat; background-size:cover">

	<div style="text-align:center; position:absolute; top:45vh; right:120px">

	<form action="http://localhost/marketplace-sales/src/mercadopago/index.php" method="POST">
	  <script
	    src="https://www.mercadopago.com.mx/integrations/v1/web-tokenize-checkout.js"
	    data-public-key="'.$public_key.'"
	    data-button-label="Next"
	    data-summary-product-label="'.$_COOKIE["_p"].'"
	    data-transaction-amount="'.$jsonResponse["USD_MXN"]*base64_decode($_COOKIE["_x"]).'">
	  </script >
	</form>

	</div>

</div>';

}
// data-transaction-amount="'.$jsonResponse["USD_MXN"]*base64_decode($_COOKIE["_x"]).'">
/*=============================================
Recibir la respuesta de Mercado Pago
=============================================*/

if(isset($_REQUEST["token"])){

	/*=============================================
	Obtener los datos del comprador
	=============================================*/

	$token = $_REQUEST["token"];
	$payment_method_id = $_REQUEST["payment_method_id"];
	$installments = $_REQUEST["installments"];
	$issuer_id = $_REQUEST["issuer_id"];

	/*=============================================
	Realizar el pago con el SDK de Mercado Pago
	=============================================*/

	MercadoPago\SDK::setAccessToken($access_token);
    //...
    $payment = new MercadoPago\Payment();
    $payment->transaction_amount = ceil($jsonResponse["USD_MXN"]*base64_decode($_COOKIE["_x"]));
    $payment->token = $token;
    $payment->description = $_COOKIE["_p"];
    $payment->installments = $installments;
    $payment->payment_method_id = $payment_method_id;
    $payment->issuer_id = $issuer_id;
    $payment->payer = array(
    "email" => $_COOKIE["_e"]
    );
    // Guarda y postea el pago
    $payment->save();

    echo $payment->status;

    //...
    // Imprime el estado del pago
    if($payment->status == "approved"){

    	setcookie('_i', $payment->id, time() + 3600, "/", $domain);
    	setcookie('_k', $public_key, time() + 3600, "/", $domain);
    	setcookie('_a', $access_token, time() + 3600, "/", $domain);

    	echo '<script>

			window.close();

    	</script>';

    }

}
