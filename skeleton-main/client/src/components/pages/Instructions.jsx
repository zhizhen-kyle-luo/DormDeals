import "./Instructions.css";

const Instructions = () => {
  return (
    <div className="Instructions-container">
      <h1 className="Instructions-title">Instructions Page</h1>
      <div className="Instructions-sectionContainer">
        <h3 className="Instructions-subtitle">An Introduction</h3>
        <div className="Instructions-text">
          Welcome to DormDeals! Thanks for taking the time to check out our wonderful website! If
          you are unsure where to start, do not worry! We will show you how to use all the amazing
          features this website has to offer just below. Thanks again!
        </div>
      </div>
      <div className="Instructions-sectionContainer">
        <h3 className="Instructions-subtitle">Home Page</h3>
        <div className="Instructions-text">
          When you log in, you will end up in the home page. The home page is the main part of the
          website and is where you can find all sorts of sales and deals around the MIT campus!
          Here, feel free to browse the numerous items currently being sold and add appropriate
          filters on the left-hand side to better fit your needs. Applying filters will
          automatically update the feed so that you can easily see what available items there are
          that fit your criteria. If you see an item you like, click on the card, which will take
          you to a new page with more details on the item. The home page is accessible through
          clicking the website icon on the left side of the navigation bar.
        </div>
      </div>
      <div className="Instructions-sectionContainer">
        <h3 className="Instructions-subtitle">Item Details</h3>
        <div className="Instructions-text">
          Once you click on an item, you will be taken to a page with more details about that
          product. If you are interested in purchasing this item, feel free to click the "Add to
          Cart" button, which will then redirect you to the cart page.
        </div>
      </div>
      <div className="Instructions-sectionContainer">
        <h3 className="Instructions-subtitle">Cart</h3>
        <div className="Instructions-text">_</div>
      </div>
      <div className="Instructions-sectionContainer">
        <h3 className="Instructions-subtitle">Profile</h3>
        <div className="Instructions-text">_</div>
      </div>
      <div className="Instructions-sectionContainer">
        <h3 className="Instructions-subtitle">Reviewing</h3>
        <div className="Instructions-text">_</div>
      </div>
      <div className="Instructions-sectionContainer">
        <h3 className="Instructions-subtitle">Selling</h3>
        <div className="Instructions-text">_</div>
      </div>
    </div>
  );
};

export default Instructions;
