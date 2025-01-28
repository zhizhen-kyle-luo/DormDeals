import React, { useEffect } from "react";
import "./Instructions.css";
import dancingBeaver from "../../assets/dancingBeaver.gif";
import fireworks from "../../assets/fireworks.gif";
import wavingBag from "../../assets/wavingBag.gif";

const Instructions = () => {
  useEffect(() => {
    // Add random directions to fireworks
    const fireworks = document.querySelectorAll(".firework");
    fireworks.forEach((firework) => {
      setInterval(() => {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        firework.style.setProperty("--x", `${x}px`);
        firework.style.setProperty("--y", `${y}px`);
      }, 1500);
    });
  }, []);

  return (
    <div className="Instructions-container">
      <h1 className="Instructions-title">Instructions Page & About Us</h1>
      <div className="Instructions-sectionContainer">
        <div className="Instructions-textContainer">
          <h3 className="Instructions-subtitle">An Introduction</h3>
          <div className="Instructions-text">
            Welcome to DormDeals! Thank you for taking the time to check out our wonderful website!
            If you are unsure where to start, do not worry! We are excited to guide you through all
            our amazing features!
          </div>
        </div>
        <div className="Instructions-videoContainer">
          <img src={wavingBag} alt="Waving Bag" className="instruction-gif" />
        </div>
      </div>
      <div className="Instructions-sectionContainer">
        <div className="Instructions-textContainer">
          <h3 className="Instructions-subtitle">About Us</h3>
          <div className="Instructions-text">
            We are a team of 3 MIT students from the Class of 2028—Zhizhen (Kyle) Luo, Fatima
            Danishyar, Anthony Zheng—who created DormDeals to make buying and selling items on
            campus easier and more efficient. We believe that the current method of advertising
            items through Dormspam and Dormsoup lacks organization and convenience. For DormSpam,
            students are forced to browse through many slideshows to see if there is anything of
            interest to them. For DormSoup, it miscategories events as sales and does not include
            any email sales from individual senders. To address this demand, we created DormDeals to
            centralize all the sales and deals around MIT, along with compelling features such as
            rating and review system, filtering sales, streamlined communication between buyers and
            sellers, and more!
          </div>
        </div>
        <div className="Instructions-videoContainer">
          <img src={dancingBeaver} alt="Dancing Beaver" className="instruction-gif" />
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
            clicking the "DormDeals" icon on the left side of the navigation bar.
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
            Cart" or "Purchase Now" button.
          </div>
        </div>
        <div className="Instructions-videoContainer">Video Here</div>
      </div>
      <div className="Instructions-sectionContainer">
        <div className="Instructions-textContainer">
          <h3 className="Instructions-subtitle">Cart</h3>
          <div className="Instructions-text">
            The cart page displays all the items you have previously added. Here, you can remove
            items, save items for later, or checkout items you will buy. You can access this page
            any time by clicking the shopping cart icon in the navigation bar. Items that have been
            added to the cart but have been bought by another user will appear in the "Expired
            Items" section.
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
            and agree on a place and time to exchange. You have access to their emails and phone
            numbers after clicking on their profile. After confirming your purchase, you will be
            taken to your "My Purchases" page, where you can track the status of all your sales.
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
            interesting to you. You can also click on "My Items" for a full showcase of their
            selling items. Finally, there is a rating of the user below their picture, which takes
            you to a page that takes you to a page that shows all reviews of that person when
            clicked. Your reviews can be easily accessed by clicking the star icon in the navigation
            bar.
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
            items you have bought and an option to leave a review and rating by clicking on the
            correspodning order and then clicking "Leave a Review". You can also view all your
            reviews by clicking on the star icon You might also modify your reviews by clicking on
            the "Edit Reviews" button, which is visible after you have left a review.
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
      <div className="Instructions-sectionContainer">
        <div className="Instructions-textContainer">
          <h3 className="Instructions-subtitle">What Next?</h3>
          <div className="Instructions-text">
            As always, there is room for improvement. There still exists several unadded features we
            hope to later implement. This includes a built-in communication feature between buyers
            and sellers for questions or coming to an agreement on the exchanging process instead of
            relying on email. Another feature is sending a notification to the seller when an item
            has been brought, to prevent the buyer from manually doing this. Finally, an auction
            feature to fit certain seller's needs is yet to be implemented.
          </div>
        </div>
        <div className="Instructions-videoContainer">
          <img src={fireworks} alt="Fireworks" className="instruction-gif" />
        </div>
      </div>
    </div>
  );
};

export default Instructions;
