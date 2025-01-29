import React from "react";
import "./Instructions.css";
import dancingBeaver from "../../assets/dancingBeaver.gif";
import fireworks from "../../assets/fireworks.gif";
import wavingBag from "../../assets/wavingBag.gif";

const Instructions = () => {
  return (
    <div className="Instructions-container">
      <div className="Instructions-hero">
        <div className="hero-content">
          <div className="hero-badge">Welcome to DormDeals!</div>
          <h1 className="hero-title">Instructions & About Us</h1>
          <p className="hero-subtitle">Your one-stop platform for campus deals and trades</p>
        </div>
      </div>

      <div className="Instructions-content">
        <section className="content-section">
          <div className="section-header">
            <span className="section-number">01</span>
            <h2>About Us</h2>
          </div>
          <div className="section-body">
            <p>
              We are a team of 3 MIT students from the Class of 2028—Zhizhen (Kyle) Luo, Fatima
              Danishyar, Anthony Zheng—who created DormDeals to make buying and selling items on
              campus easier and more efficient. We believe that the current method of advertising items
              through Dormspam and Dormsoup lacks organization and convenience. For DormSpam, students are forced
              to browse through many slideshows to see if there is anything of interest to them. For
              DormSoup, it miscategories events as sales and does not include any email sales from individual senders.
              To address this demand, we created DormDeals to centralize all the sales and deals around
              MIT, along with compelling features such as rating and review system, filtering sales, 
              streamlined communication between buyers and sellers, and more!
            </p>
            <div className="section-image">
              <img src={dancingBeaver} alt="MIT Beaver" className="section-gif" />
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="section-header">
            <span className="section-number">02</span>
            <h2>Home Page</h2>
          </div>
          <div className="section-body">
            <p>
              When you log in, you will end up in the home page. The home page is the main part of the
              website and is where you can find all sorts of sales and deals around the MIT campus!
              Here, feel free to browse the numerous items currently being sold and add appropriate
              filters on the left-hand side to better fit your needs. Applying filters will
              automatically update the feed so that you can easily see what available items there are
              that fit your criteria. If you see an item you like, click on the card, which will take
              you to a new page with more details on the item. The home page is accessible through
              clicking the "DormDeals" icon on the left side of the navigation bar.
            </p>
            <div className="video-container">
              <div className="video-placeholder">
                <span>
                  <video controls>
                    <source src="/videos/vid2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="section-header">
            <span className="section-number">03</span>
            <h2>Item Details & Cart</h2>
          </div>
          <div className="section-body">
            <p>
              Once you click on an item, you will be taken to a page with more details about that
              product. If you are interested in purchasing this item, feel free to click the "Add to
              Cart" or "Purchase Now" button.
            </p>
            <p>
              The cart page displays all the items you have previously added. Here, you can remove items,
              save items for later, or checkout items you will buy. You can access this page any time by
              clicking the shopping cart icon in the navigation bar.
            </p>
            <div className="video-container">
              <div className="video-placeholder">
                <span>
                  <video controls>
                    <source src="/videos/vid1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="section-header">
            <span className="section-number">04</span>
            <h2>Checkout & Buying Process</h2>
          </div>
          <div className="section-body">
            <p>
              See something you want to buy? Select all the items you want to checkout and by clicking
              the "Proceed to Checkout" button, it will redirect you to the purchase page, where you
              can confirm your orders. It is now up to you to contact the seller about your purchase
              and agree on a place and time to exchange. You have access to their emails and phone 
              numbers after clicking on their profile. After confirming your purchase, you will be
              taken to your "My Purchases" page, where you can track the status of all your sales.
            </p>
            <div className="video-container">
              <div className="video-placeholder">
                <span>
                  <video controls>
                    <source src="/videos/vid3.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="section-header">
            <span className="section-number">05</span>
            <h2>Profile & Reviews</h2>
          </div>
          <div className="section-body">
            <p>
              The profile page can be accessed by clicking the person icon in the navigation bar.
              Here, you are able to edit your own profile to include a description and email so others
              know how to contact you if they have any questions. Clicking the email will open a new
              window to send an email with the user as the recipient. You can customize your picture
              as well to give your profile more personality! Also included in the profile page are all
              the items that person is selling, making it easier for you to access a favorite person's
              items. The item icons are clickable, meaning you can easily check out whatever seems
              interesting to you. You can also click on "My Items" for a full showcase of their selling items.
              Finally, there is a rating of the user below their picture, which takes you to a page that
              takes you to a page that shows all reviews of that person when clicked. Your reviews can
              be easily accessed by clicking the star icon in the navigation bar.
            </p>
            <p>
              When you checkout an item and the seller has marked it as "Sold", you will have the
              option to leave a review and rating for the seller. To do that, go to "My Purchases" by
              clicking the shopping bag icon in the navigation bar. There, you will find a list of all
              items you have bought and an option to leave a review and rating by clicking on the corresponding
              order and then clicking "Leave a Review". You can also view all your reviews by clicking on the star icon.
              You might also modify your reviews by clicking on the "Edit Reviews" button, which is 
              visible after you have left a review.
            </p>
            <div className="video-container">
              <div className="video-placeholder">
                <span>
                  <video controls>
                    <source src="/videos/vid4.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="section-header">
            <span className="section-number">07</span>
            <h2>Future Improvements</h2>
          </div>
          <div className="section-body">
            <p>
              As always, there is room for improvement. There still exists several unadded features we
              hope to later implement. This includes a built-in communication feature between buyers
              and sellers for questions or coming to an agreement on the exchanging process instead of
              relying on email. Another feature is sending a notification to the seller when an item
              has been brought, to prevent the buyer from manually doing this. Finally, an auction
              feature to fit certain seller's needs is yet to be implemented.
            </p>
            <div className="section-image">
              <img src={fireworks} alt="Celebration" className="section-gif" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Instructions;
