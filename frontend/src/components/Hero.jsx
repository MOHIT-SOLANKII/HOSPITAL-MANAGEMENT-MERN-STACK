

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
          At MSCARE, we are committed to providing state-of-the-art healthcare services with compassion and expertise. Our team of skilled professionals is dedicated to delivering personalized care tailored to your unique needs. Your well-being is our top priority, and it is our mission to ensure you experience a harmonious journey towards optimal health and wellness. With cutting-edge facilities and a patient-centered approach, MSCARE Medical Institute is here to support you every step of the way.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
