import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE = "http://localhost:3000";

function App() {
  const [summary, setSummary] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [partnerId, setPartnerId] = useState("");
  const [seats, setSeats] = useState("");
  const [reservationId, setReservationId] = useState("");
  const [message, setMessage] = useState("");

  const fetchSummary = async () => {
    try {
      const res = await axios.get(`${API_BASE}/reservations`);
      setSummary(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load summary.");
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await axios.get(`${API_BASE}/reservations/all`);
      setReservations(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load reservations.");
    }
  };

  const handleReserve = async () => {
    try {
      const res = await axios.post(`${API_BASE}/reservations`, {
        partnerId,
        seats: parseInt(seats),
      });
      setMessage(`Done !! Reserved ${res.data.seats} seats (ID: ${res.data.reservationId})`);
      fetchSummary();
      fetchReservations();
    } catch (err) {
      setMessage(err.response?.data?.error || "Reservation failed");
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.delete(`${API_BASE}/reservations/${id}`);
      setMessage("Reservation cancelled.");
      fetchSummary();
      fetchReservations();
    } catch (err) {
      setMessage(err.response?.data?.error || "Cancellation failed");
    }
  };

  useEffect(() => {
    fetchSummary();
    fetchReservations();
  }, []);

  return (
    <div className="container">
      {/* LEFT PANEL */}
      <div className="left-panel">
        <h1>TicketBoss Dashboard</h1>

        {summary ? (
          <div className="summary-card">
            <h2>{summary.name}</h2>
            <p><b>Total Seats:</b> {summary.totalSeats}</p>
            <p><b>Available:</b> {summary.availableSeats}</p>
            <p><b>Reservations:</b> {summary.reservationCount}</p>
            <p><b>Version:</b> {summary.version}</p>
          </div>
        ) : (
          <p>Loading event summary...</p>
        )}

        <div className="form-section">
          <h3>Reserve Seats</h3>
          <input
            placeholder="Partner ID"
            value={partnerId}
            onChange={(e) => setPartnerId(e.target.value)}
          />
          <input
            placeholder="Seats"
            value={seats}
            type="number"
            onChange={(e) => setSeats(e.target.value)}
          />
          <button onClick={handleReserve}>Reserve</button>
        </div>

        {/* <div className="form-section">
          <h3>Cancel Reservation</h3>
          <input
            placeholder="Reservation ID"
            value={reservationId}
            onChange={(e) => setReservationId(e.target.value)}
          />
          <button onClick={() => handleCancel(reservationId)}>Cancel</button>
        </div> */}

        {message && <p className="message">{message}</p>}
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <h2>Current Reservations</h2>

        {reservations.length === 0 ? (
          <p>No reservations yet.</p>
        ) : (
          <div className="reservation-list">
            {reservations.map((r) => (
              <div key={r._id} className="reservation-card">
                <div>
                  <b>{r.partnerId}</b> — {r.seats} seats
                </div>
                <button className="cancel-btn" onClick={() => handleCancel(r._id)}>
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
