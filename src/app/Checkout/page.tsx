const checkout = () => {
  const orderNumber = Math.floor(1000000000 + Math.random() * 9000000000);
  
  return (
    <div className="grid place-content-center text-[clamp(1.8rem,3vw,2.2rem)] p-[5rem]">
      <h1 className="text-[clamp(2.6rem,4vw,3rem)] font-bold p-[2rem] mb-[4rem] text-center">
        Successful Transaction
      </h1>
      <p className="text-[2.3rem] font-medium mb-[5rem]">
        Order Number: <span className="font-semibold">{orderNumber}</span>
      </p>
      <p className="mb-[3rem]">
        Thank you for your purchase, your receipt has been sent to your email.
      </p>
      <p>Your order will be shipped soon.</p>
    </div>
  );
}

export default checkout