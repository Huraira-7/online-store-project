import {useEffect} from 'react'

function OrderCancellation() {
  useEffect(() => {
    const maindiv = document.getElementById('maindiv');
    maindiv.scrollTo({top: 0, behavior: 'smooth', })
  }, [])
  
  return (
    <div className="">
      <div className="flex flex-col items-center my-20 gap-20">
          <span className="xl:text-6xl  text-3xl max-[580px]:mx-16 ">Order Cancellation Policy</span>
          <span className="xl:text-4xl w-8/12 text-2xl text-left">You may cancel your order at any time before the order has been processed. Once the order has been shipped, you will receive a shipping confirmation via sms on the contact number provided that will contain the tracking information. As soon as the product has been shipped, our exchange policy will be applicable. Pearls and Tassels has the authority to cancel orders for reasons such as; the item is out of stock, pricing errors, or the credit card payment declined by the issuing financial institution.</span>
      </div>
    </div>
  )
}

export default OrderCancellation