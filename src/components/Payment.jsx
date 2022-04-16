import React from 'react';
import { useHistory } from 'react-router-dom';
import AlanEatsLogo from "../Images/AlanEatsLogo.png";
import axios from "axios";

let userCredentials = localStorage.getItem("user logged in");
let user = JSON.parse(userCredentials);

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'

function Payment({price}) {
    const history  = useHistory();
    // let {price}  = useParams();
    console.log(price);

    async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://localhost:3000/razorpay', { 
            method: 'POST',
            body: JSON.stringify({
                cartAmount: price,
                name :user[0]?.name,
                email : user[0]?.email,
                userId: user[0]?._id,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
    }).then((t) =>
			t.json()
		)

		console.log(data)

		const options = {
			key: __DEV__ ? 'rzp_test_oKt4aYMDlmmRMX' : 'PRODUCTION_KEY',
			currency: data.currency,
			amount: price.toString(),//data.amount.toString(),
			order_id: data.id,
			name: 'Order Food',
			description: 'Thank you for ordering..',
			image: AlanEatsLogo,
			handler: function (response) {
				
                alert("Payment id :- " + response.razorpay_payment_id + "successfull..")
				alert("Order id :- " + response.razorpay_order_id)
				alert("Signature :- " + response.razorpay_signature)
                axios.put(`/api/user/cart/${user[0]?._id}`).then((res)=>{
                    console.log(res);
                    history.push("/");
                })
			},
			// prefill: {
			// 	name:user[0]?.name,
			// 	email: user[0]?.email,
			// 	phone_number: "9213753655"
			// }
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}
  
  
    return (
    <>
        <div className="App">
			<header className="App-header">
				<img src={AlanEatsLogo}  alt="logo" />
				<p>
					AlanEats
				</p>
				<a
					className="App-link"
                    style={{cursor:"pointer"}}
					onClick={displayRazorpay}
					target="_blank"
					rel="noopener noreferrer"
				>
					Place Order
				</a>
			</header>
		</div>

    </>
  )
}

export default Payment