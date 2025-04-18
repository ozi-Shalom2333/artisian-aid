import React from "react";
import ReportedUserCard from "../../../components/ReportedUserCard";
import UserReportCard from "../../../components/UserReportCard";

const GetOneReported = () => {
  const handleViewDetails = () => {
    // navigate("/admindashboard/getOneReported");
  };
  return (
    <div className="pending-users-wrapper">
      <h2 className="title">Reported Details</h2>
      <div className="users-container">
        <ReportedUserCard
          // key={user.id}
          name="Victoria Trust"
          email="Text@gmail.com"
          image=""
          onViewDetails={handleViewDetails}
          status={"Declined"}
          verified={'Status: Verified'}
        />

        <h3>User Card</h3>
        <UserReportCard
          name="Victoria Trust"
          purpose="The Worker came to me house and slapped my wife"
          image=""
        />
        <UserReportCard
          name="Victoria Trust"
          purpose="The Worker came to me house and slapped my wife"
          image=""
        />

<div className="button-group">
          <button
            className="approve-btn"
            // onClick={handleApprove}
            // disabled={loadingAction}
          >
            Restrict User
          </button>
          <button
            className="decline-btn"
            // onClick={handleDecline}
            // disabled={loadingAction}
          >
           Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetOneReported;
