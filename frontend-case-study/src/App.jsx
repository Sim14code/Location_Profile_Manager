import ProfileProvider from "./components/ProfileContext";
import AddProfileForm from "./components/AddProfileForm";
import ProfileList from "./components/ProfileList";
import "./App.css";

function App() {
  return (
    <ProfileProvider>
      <div className="app-container">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <h1>Explorer</h1>
            <p className="tagline">Meet People Near You</p>
          </div>
        </header>

        {/* Main content area */}
        <main className="main-content">
          {/* Left/Center: Profile listings */}
          <section className="profiles-section">
            <h2>Nearby Profiles</h2>
            <ProfileList />
          </section>

          {/* Right: Add profile form */}
          <section className="form-section">
            <h2>Add New Profile</h2>
            <AddProfileForm />
          </section>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>
            &copy; {new Date().getFullYear()} Explorer - Connect with people
            based on location
          </p>
        </footer>
      </div>
    </ProfileProvider>
  );
}

export default App;
