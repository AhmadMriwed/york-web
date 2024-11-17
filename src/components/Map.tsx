const Map = () => {
  return (
    <div className="maps">
      <div className="google-maps">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.590809758164!2d-0.12423168422954696!3d51.52072267963724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b24566fa4cf%3A0x3757e97498c2e58d!2sYork%20British%20Academy!5e0!3m2!1sen!2s!4v1644092675551!5m2!1sen!2s"
          allowFullScreen
          loading="lazy"
          title="Google Maps"
          style={{ width: "100%", height: "500px", border: "none" }}
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
