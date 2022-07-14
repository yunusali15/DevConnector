import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
   alerts !== null &&
   alerts.length > 0 &&
   alerts.map((alert) => (
      <div
         style={{
            margin: "auto",
            padding: "0 2rem",
            marginTop: "6rem",
            marginBottom: "0rem",
            maxWidth: "1100px",
         }}>
         <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
         </div>
      </div>
   ));

Alert.propTypes = {
   alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
   alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
