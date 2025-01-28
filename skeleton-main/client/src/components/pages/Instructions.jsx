import "./Instructions.css";

const Instructions = () => {
  return (
    <div className="Instructions-container">
      <h1 className="Instructions-title">Instructions Page</h1>
      <div className="Instructions-sectionContainer">
        <div className="Instructions-textContainer">
          <h3 className="Instructions-subtitle">An Introduction</h3>
          <div className="Instructions-text">
            Welcome to DormDeals! Thanks for taking the time to check out our wonderful website! If
            you are unsure where to start, do not worry! We will show you how to use all the amazing
            features this website has to offer just below. Thanks again!
          </div>
        </div>
      </div>
      <div className="Instructions-sectionContainer">
        <div className="Instructions-textContainer">
          <h3 className="Instructions-subtitle">Home Page</h3>
          <div className="Instructions-text">
            When you log in, you will end up in the home page. The home page is the main part of the
            website and is where you can find all sorts of sales and deals around the MIT campus!
            Here, feel free to browse the numerous items currently being sold and add appropriate
            filters on the left-hand side to better fit your needs. Applying filters will
            automatically update the feed so that you can easily see what available items there are
            that fit your criteria. If you see an item you like, click on the card, which will take
            you to a new page with more details on the item. The home page is accessible through
            clicking the "Dorm Deals" icon on the left side of the navigation bar.
          </div>
        </div>
        <div className="Instructions-videoContainer">Video Here</div>
      </div>
      <div className="Instructions-sectionContainer">
        <div className="Instructions-textContainer">
          <h3 className="Instructions-subtitle">Item Details</h3>
          <div className="Instructions-text">
            Once you click on an item, you will be taken to a page with more details about that
            product. If you are interested in purchasing this item, feel free to click the "Add to
            Cart" or "Purchase Now" button, which will then redirect you to the cart page.
          </div>
        </div>
        <div className="Instructions-videoContainer">Video Here</div>
      </div>
      <div className="Instructions-sectionContainer">
        <div className="Instructions-textContainer">
          <h3 className="Instructions-subtitle">Cart</h3>
          <div className="Instructions-text">
            The cart page displays all the items you have added to it. Feel free to remove any items
            you no longer want or checkout items you will buy. You can access this page any time by
            clicking the shopping cart icon in the navigation bar.
          </div>
        </div>
        <div className="Instructions-videoContainer">Video Here</div>
      </div>
      <div className="Instructions-sectionContainer">
        <div className="Instructions-textContainer">
          <h3 className="Instructions-subtitle">Checkout/Buying</h3>
          <div className="Instructions-text">
            See something you want to buy? Select all the items you want to checkout and by clicking
            the "Proceed to Checkout" button, it will redirect you to the purchase page, where you
            can confirm your orders. It is now up to you to contact the seller about your purchase
            and agree on a place and time to exchange. After confirming your purchase, you will be
            taken to your "My Purchases" page, where you can see the status of all your items.
          </div>
        </div>
        <div className="Instructions-videoContainer">Video Here</div>
      </div>
      <div className="Instructions-sectionContainer">
        <div className="Instructions-textContainer">
          <h3 className="Instructions-subtitle">Profile</h3>
          <div className="Instructions-text">
            The profile page can be accessed by clicking the person icon in the navigation bar.
            Here, you are able to edit your own profile to include a description and email so others
            know how to contact you if they have any questions. Clicking the email will open a new
            window to send an email with the user as the recipient. You can customize your picture
            as well to give your profile more personality! Also included in the profile page are all
            the items that person is selling, making it easier for you to access a favorite person's
            items. The item icons are clickable, meaning you can easily check out whatever seems
            interesting to you. Finally, there is a rating of the user below their picture, which
            takes you to a page that shows all reviews of that person when clicked. Your reviews can
            be easily accessed by clicking the star icon in the navigation bar.
          </div>
        </div>
        <div className="Instructions-videoContainer">Video Here</div>
      </div>
      <div className="Instructions-sectionContainer">
        <div className="Instructions-textContainer">
          <h3 className="Instructions-subtitle">Reviewing</h3>
          <div className="Instructions-text">
            When you checkout an item and the seller has marked it as "Sold", you will have the
            option to leave a review and rating for the seller. To do that, go to "My Purchases" by
            clicking the shopping bag icon in the navigation bar. There, you will find a list of all
            items you have bought and an option to leave a review and rating for those that have
            been sold.
          </div>
        </div>
        <div className="Instructions-videoContainer">Video Here</div>
      </div>
      <div className="Instructions-sectionContainer">
        <div className="Instructions-textContainer">
          <h3 className="Instructions-subtitle">Selling</h3>
          <div className="Instructions-text">
            Now that we have covered how to buy items, here is how to sell items. Start by clicking
            the plus icon in the navigation bar where you can enter all the information about what
            you want to sell. Once everything is completed, hit "Post Order", and your item will
            appear on the home page if successful! Selling items comes with a couple more features.
          </div>
          <div className="Instructions-text">
            One feature includes having the ability to mark items as sold or removing them
            completely. To do this, navigate to your item page (most easily done by going to My
            Items) and selecting the appropriate button. You are able to unlist an item as sold but
            are unable to retrieve a deleted item. Be sure to list an item as sold once you hand it
            to the buyer!
          </div>
        </div>
        <div className="Instructions-videoContainer">Video Here</div>
      </div>
    </div>
  );
};

export default Instructions;
