import { useContext } from "react";
import { AppContext } from "../../Context";
import { HiCheck, HiPlusSm } from "react-icons/hi";

const Card = (data) => {
  const context = useContext(AppContext);

  const showProduct = (productDetail) => {
    context.openProductDetail();
    context.setProductToShow(productDetail);
    context.closeCheckoutSideMenu();
  };
  const addProductToCart = (event, productData) => {
    event.stopPropagation(); // Para que no se abra el modal de detalle de producto

    context.setCount(context.count + 1);
    context.setCartProducts([...context.cartProducts, productData]);
    // console.log(context.cartProducts);
    context.openCheckoutSideMenu();
    context.closeProductDetail();
  };

  // Check if the product is in the cart:
  const renderIcon = (id) => {
    const productIsInCart =
      context.cartProducts.filter((product) => product.id === id).length > 0;

    if (productIsInCart) {
      return (
        <HiCheck className="absolute top-0 right-0 flex justify-center items-center bg-black rounded-full w-6 h-6 m-2 text-white" />
      );
    } else {
      return (
        <HiPlusSm
          onClick={(event) => addProductToCart(event, data.data)}
          className="absolute top-0 right-0 flex justify-center items-center bg-white rounded-full w-6 h-6 m-2"
        />
      );
    }
  };
  return (
    <div
      className="bg-amber-700/40 cursor-pointer w-56 h-60 rounded-lg"
      onClick={() => showProduct(data.data)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 bg-white/60 rounded-lg text-black text-xs m-2 py-0.5 px-2">
          {/* Fake Store API: */}
          {/* {data.data.category} */}
          {/* Platzi API: */}
          {data.data.category.name}
        </span>
        <img
          className="rounded-lg w-full h-full object-cover"
          // src={data.data.image} // Fake Store API
          src={data.data.images} // Platzi API
          alt={data.data.title} // Fake Store API
        />
        {renderIcon(data.data.id)}
      </figure>
      <p className="flex justify-around">
        <span className="text-sm font-light">{data.data.title}</span>
        <span className="text-lg font-medium">${data.data.price}</span>
      </p>
    </div>
  );
};

export default Card;