import React, { useEffect } from "react"
import "./about.css"
import { scrollToTop } from "../../helpers/scrollToTop";

function About() {
  useEffect(() => {
    scrollToTop()
  }, [])

  return (
    <>
      <div className="about-container">
        <div className="about-textbox">
          <h1 className="about-header">About Us</h1>
          <div className="about-body">
            <p>
              Welcome to Bully Barn, your go-to destination for bulldog
              adoptions! Our mission is to find loving and forever homes for
              these adorable bulldogs, ensuring they receive the care and
              attention they deserve.
            </p>
          </div>
        </div>
        <img
          src="https://images.pexels.com/photos/4984837/pexels-photo-4984837.jpeg?auto=compress&cs=tinysrgb&w=1600"
          className="about-img"
        />
      </div>

      <div className="about-container">
        <img
          src="https://images.pexels.com/photos/16721289/pexels-photo-16721289/free-photo-of-wally-chillin-on-beautiful-sunday-morning-70-f-and-breezy-may-7-2023-darien-ct.jpeg?auto=compress&cs=tinysrgb&w=1600"
          className="about-img"
        />
        <div className="about-textbox">
          <h1 className="about-header">Our Passion for Bulldogs</h1>
          <div className="about-body">
            <p>
              At Bully Barn, we have a deep passion for bulldogs and believe
              that every dog deserves a safe and loving home. Our team is made
              up of dedicated individuals who share a common love for these
              gentle and loyal companions. We work tirelessly to provide a
              nurturing environment for bulldogs in need and match them with
              loving families.
            </p>
          </div>
        </div>
      </div>

      <div className="about-container">
        <div className="about-textbox">
          <h1 className="about-header">Finding Forever Homes</h1>
          <div className="about-body last-one">
            <p>
              We take great pride in our adoption process, ensuring that each
              bulldog finds the perfect forever home. Our team carefully screens
              potential adopters to ensure they are ready for the
              responsibilities of dog ownership and have the time and dedication
              to care for their new furry friend.
            </p>
          </div>
          <img
            src="https://images.pexels.com/photos/2449533/pexels-photo-2449533.jpeg?auto=compress&cs=tinysrgb&w=1600"
            className="about-img last-img"
          />
        </div>
      </div>
    </>
  )
}

export default About
