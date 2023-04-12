import "../styles/footer.css";

export const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer__container">
        <div className="footer__container__left">
          <div className="footer__container__left__logo"></div>
          <div className="footer__container__left__text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              euismod bibendum laoreet. Proin gravida dolor sit amet lacus
              accumsan et viverra justo commodo. Proin sodales pulvinar tempor.
              Cum sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
              vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget
              odio.
            </p>
          </div>
        </div>
        <div className="footer__container__right">
          <div className="footer__container__right__title">
            <h2>Quick Links</h2>
          </div>
          <div className="footer__container__right__links">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Portfolio</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
