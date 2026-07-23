import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion';

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="hero min-h-[80dvh]">
      <Slider {...settings}>
        <div className="hero-slide" style={{ backgroundImage: 'url(/images/hero-banner.jpg)' }}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <motion.div
              className="max-w-md"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="mb-5 text-5xl font-bold">Empowering Africa's Future</h1>
              <p className="mb-5">Join us in our mission to create sustainable development and innovative solutions that improve the quality of life in African communities.</p>
              <Link to="/get-involved">
                <motion.button
                  className="btn btn-primary"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Get Involved
                </motion.button>
              </Link>
              <Link to="/get-involved#donate">
                <motion.button
                  className="btn btn-secondary ml-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Donate Now
                </motion.button>
              </Link>
              <Link to="/blog">
                <motion.button
                  className="btn btn-accent ml-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Read Our Blog
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="hero-slide" style={{ backgroundImage: 'url(/images/another-banner.jpg)' }}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <motion.div
              className="max-w-md"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="mb-5 text-5xl font-bold">Innovative Solutions</h1>
              <p className="mb-5">Creating sustainable solutions for African communities.</p>
              <Link to="/projects">
                <motion.button
                  className="btn btn-primary"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default HeroSection;
