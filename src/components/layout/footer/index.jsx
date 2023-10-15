import { Link } from "react-router-dom";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer>
      <div className="container footer__item">
        <div className="footer__item__left">
          <Link>Finstreet 118 2561 Fintown</Link>
          <br />
          <Link>Hello@finsweet.com 020 7993 2905</Link>
        </div>
        <div className="footer__item__right">
          <img src="/images/footer/Facebook/Negative.svg" alt="" />
          <img src="/images/footer/Twitter/Negative.svg" alt="" />
          <img src="/images/footer/instagram/Instagram/Negative.svg" alt="" />
          <img src="/images/footer/LinkedIn/Negative.svg" alt="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
