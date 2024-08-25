import { FooterContact, navbar } from "../../constants";

export const Footer = () => {
  return (
    <footer className="bg-white py-[50px] text-black flex justify-around items-center flex-wrap gap-x-[15px] gap-y-[20px] px-5 absolute w-full mt-[100px]">
      <div>
        <div id="navbar-logo" className="flex flex-col items-center">
        <img src={navbar.logo} className='h-8 min-[1000px]:h-10 select-none mb-5 invert' alt="Nike Logo" />
          <p>Copyright © 2024</p>
        </div>
      </div>

      <div className="flex flex-col min-[2000px]:text-[18px] gap-3">
        {FooterContact.map((item) => (
          <div key={item.label} className="flex items-center">
            <p className="pl-2">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-evenly items-center text-[30px] min-[2000px]:text-[40px] gap-x-5">
        {navbar.links.map((link) => (
          <a
            key={link.name}
            href={link.link}
            className="hover:text-[#3E8959] transition-all"
          >
          </a>
        ))}
      </div>
    </footer>
  );
};
