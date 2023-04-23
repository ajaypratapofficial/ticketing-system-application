import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - E COMMERCE APP"}>
      <div className="container main" style={{ minHeight: "50vh" }}>
        <div className="row contactus ">
          <div className="col-md-6 ">
            <img
              src="/images/privacypolicy.png" // avoid space in name
              alt="privacy policy"
              style={{ width: "30vw" }}
            />
          </div>
          <div className="col-md-4">
            <p>
              This policy applies only to the information Food365 collects
              through its Services, in email, text and other electronic
              communications sent through or in connection with its Services.
              This policy DOES NOT apply to information that you provide to, or
              that is collected by, any third-party, such as restaurants at
              which you make reservations and/or pay through Food365's Services
              and social networks that you use in connection with its Services.
              Food365 encourages you to consult directly with such third-parties
              about their privacy practices.
            </p>
            {/* <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
