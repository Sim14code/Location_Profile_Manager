import ProfileList from "../components/ProfileList";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Profile Explorer</h1>
      <ProfileList />
    </div>
  );
};

export default Home;
