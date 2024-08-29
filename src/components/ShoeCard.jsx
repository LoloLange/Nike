/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
export const ShoeCard = ({ id, name, description, image, price, color, characteristics, benefits }) => {

    const imageExist = () => {
        if (image.slice(0, 1) === 'h') {
            return true
        } else return false
    }

    const defaultImage = "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a3e7dead-1ad2-4c40-996d-93ebc9df0fca/dunk-low-retro-mens-shoes-5FQWGR.png"
    return (
        <div className="text-black rounded-lg font-poppins mb-[100px]">
            <Link to={`/men/${name.replace(/\s+/g, '-')}`} state={{ name: name, price: price, image: imageExist() ? image : defaultImage, description: description, benefits: benefits, characteristics: characteristics }}>
            <img className="rounded-xl shadow-lg select-none cursor-pointer w-auto" src={imageExist() ? image : defaultImage} alt={name} />
            <p className="font-bold mt-5 min-[1300px]:mt-8 min-[2200px]:mt-10 text-3xl min-[600px]:text-2xl min-[1300px]:text-3xl min-[1750px]:text-3xl min-[2200px]:text-4xl">{name}</p>
            <p className="text-2xl min-[600px]:text-xl min-[1300px]:text-2xl min-[1750px]:mt-2 min-[1750px]:text-2xl min-[2200px]:text-3xl">{price}</p>
            </Link>
        </div>
    )
}