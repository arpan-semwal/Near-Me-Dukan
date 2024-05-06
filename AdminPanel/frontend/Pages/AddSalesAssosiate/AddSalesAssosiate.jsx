/* eslint-disable no-mixed-spaces-and-tabs */
import Navbar from "../../components/Navbar/Navbar";
import "./AddSakesAssosiate.css";
export default function AddSalesAssociate() {
  return (
	<div>
		<Navbar/>
		 <div className="sales-associate-form">
		<h2 style={{ color: 'green' }}>Sales Associates - Add a Sales Associate</h2>
		<form>
		  <div className="form-group">
			<label htmlFor="mobileNo">Mobile No:</label>
			<input type="text" id="mobileNo" name="mobileNo" />
		  </div>
		  <div className="form-group">
			<label htmlFor="firstName">First Name:</label>
			<input type="text" id="firstName" name="firstName" />
		  </div>
		  <div className="form-group">
			<label htmlFor="lastName">Last Name:</label>
			<input type="text" id="lastName" name="lastName" />
		  </div>
		  <div className="form-group">
			<label htmlFor="pincode">Pincode:</label>
			<input type="text" id="pincode" name="pincode" />
		  </div>
		  <div className="form-group">
			<label htmlFor="upi">UPID:</label>
			<input type="text" id="upi" name="upi" />
		  </div>
		  <div className="form-group">
			<label htmlFor="pancard">Pancard:</label>
			<input type="text" id="pancard" name="pancard" />
		  </div>
		  <div className="form-group">
			<label htmlFor="aadhar">Aadhar Card:</label>
			<input type="text" id="aadhar" name="aadhar" />
		  </div>
		  <button className="add-button">Add</button>
		</form>
	  </div>
		
	</div>
   
  );
}
