import React from 'react';


import Navbar from '../comps/Navbar/Navbar';
import Footer from '../comps/Footer/Footer';


import Home from '../views/Home/home';
import Product from '../views/Product/Product';
import Contact from '../views/Contact/contact';
import TnC from '../views/TnC/TnC';
import OrderCancellation from '../views/OrderCancellation/OrderCancellation';
import Category from '../views/Category/Category';




const Layout = (props) => {

  const component = props.pagename
  return (
    <>
      <Navbar {...props}/>

      {component === 'home' ? <Home {...props} /> : (
            component === 'product' ? <Product {...props} />  : (
                component === 'contact' ? <Contact {...props} />  : (
                    component === 'termsandconditions' ? <TnC {...props} /> :(
                        component === 'ordercancellation' ? <OrderCancellation {...props}/> :
                        <Category {...props}/>
                    )
                )
            )
          )
       }
        
      <Footer {...props}/>
    </>
  );
};

export default Layout;
