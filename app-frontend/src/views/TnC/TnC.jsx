import {useEffect} from 'react'


function TnC() {
  useEffect(() => {
    const maindiv = document.getElementById('maindiv');
    maindiv.scrollTo({top: 0, behavior: 'smooth', })
  }, [])
  
  return (
    <div className="min-h-screen">
     <div className="flex flex-col my-20 w-8/12 mx-auto gap-16">
     <span className="xl:text-6xl text-4xl"> Terms and Conditions</span>
     <span className="text-2xl">EXCHANGE PROCEDURE</span>
     <span className="xl:text-2xl text-xl flex flex-col xl:gap-1 gap-0">
        <span className="">We aim to facilitate all our clients if they wish to exchange their purchased articles, provided that the purchase was made in Pakistan.</span><br />
        <span className="">Any article purchased can be exchanged within 07 days of purchase by receipt by courier.</span><br/>
        <span className="">Articles are qualified for change if they are either damaged only. The article is to be sent to our location in Lahore and we dispatch the new article after receiving it. In case of damaged goods the new article is sent free of cost and for all other reasons delivery charges 300/- apply.</span><br/>
        <span className="">Articles are qualified for change if they are unused, all tags are intact, packing is in its original condition and original invoice is present. Articles purchased on a discount or on sale are not qualified for exchange.</span><br/>
        <span className="">Refunds are not in cash – the client will be issued a coupon of same value valid for Online Store ONLY, which can be used immediately or in the future.</span><br/>
        <span className="">These conditions apply to non-sale orders only.</span><br/>
        <span className="">Defected item can be replaced within 7 days of purchase.</span><br/>
        <span className="">Our rider picks the article and delivers the new article to customer’s doorstep at the cost of 300/- pkr for the to and fro ride.</span><br/>
        <span className="">Sales Item cannot be exchanged.</span><br/>
        <span className="">For further assistance, you can contact our customer service department by emailing us at @gmail.com or you can send us a direct message on instagram. Provide all the required information to our friendly representative and if all the conditions of the exchange are met, we will send the new article at your doorstep.</span><br/>
     </span>
     
     </div>
    </div>
  )
}

export default TnC