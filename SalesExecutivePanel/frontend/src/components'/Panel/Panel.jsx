 
import { useNavigate } from 'react-router-dom';

export default function Panel() {
  const navigate = useNavigate();

  const handleAddTeamMemberClick = () => {
    // Navigate to the desired page when clicking "Add a Team Member"
    navigate('/add-team-member');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card} onClick={handleAddTeamMemberClick}>Card 1</div>
      <div style={styles.card}>Card 2</div>
      <div style={styles.card} onClick={handleAddTeamMemberClick}>Add a Team Member</div>
      <div style={styles.card}>Card 4</div>
      <div style={styles.card}>Card 5</div>
      <div style={styles.card}>Card 6</div>
      <div style={styles.card}>Card 7</div>
      <div style={styles.card}>Card 8</div>
      <div style={styles.card}>Card 9</div>
      <div style={styles.card}>Card 10</div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
  },
  card: {
    width: '200px',
    height: '200px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};
